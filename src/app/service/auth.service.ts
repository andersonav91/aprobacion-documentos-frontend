import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from "../model/user";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { SidebarService } from "./sidebar.service";
import { User365 } from '../model/user365';
import { MsalService } from '@azure/msal-angular';
import { OAuthSettings } from '../model/oauth';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentService {

  public currentUser: BehaviorSubject<UserModel>;
  public graphClient?: Client;

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private sidebarService: SidebarService,
    private msalService: MsalService
  ) {
    super(httpClient, noticeService);
    this.currentUser = new BehaviorSubject(new UserModel());
    this.authenticated = false;
    this.user = undefined;

    const accounts = this.msalService.instance.getAllAccounts();
    this.authenticated = accounts.length > 0;
    if (this.authenticated) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  /**
   * Constructs a `POST` request that consumes the login API.
   */
   async login(data: object) {
    this.postMethod('auth', data, {}).subscribe((data: any) => {
      var user: UserModel = Object.assign(new UserModel(), data);
      user.userRoles = user.usersRoles;
      //this.ls.set('token', 'qweqweqwewq');
      this.ls.set('userData', JSON.stringify(user));
      this.setCurrentUser(Object.assign(user));
      this.router.navigate(['']);
      this.sidebarService.show();
    });
  }

  /**
   * Validates if exists data associated with the user session.
   */
  public isAuthenticated(): boolean {
    /*const token = this.ls.get('token');
    return token ? true : false;*/
    return this.authenticated;
  }

  /**
   * Set the current user
   */
  setCurrentUser(currentUser: UserModel) {
    this.currentUser.next(currentUser);
  }

  /**
   * Get the current user from local storage
   */
  getCurrentUserFromStorage() {
    return this.ls.get("userData") != '' ? JSON.parse(this.ls.get("userData")) : null;
  }

  /**
   * Logout the user from the app
   */
   async logout() {
    await this.msalService.logout().toPromise();
    this.ls.remove("userData");
    this.setCurrentUser(new UserModel());
    this.user = undefined;
    this.authenticated = false;
    this.router.navigate(['/login'])
  }

  public authenticated: boolean;
  public user?: User365;

  async signIn(): Promise<void> {
    const result = await this.msalService
      .loginPopup(OAuthSettings)
      .toPromise()
      .catch((reason) => {
        console.log('login Failed',reason);
      });

    if (result) {
      this.msalService.instance.setActiveAccount(result.account);
      this.authenticated = true;
      // Temporary placeholder
      this.user = await this.getUser();
      await this.login({username:this.user.userPrincipalName, isAuthWeb:true});
      // Temporary to display token in an error box
      console.log('Token acquired',result.accessToken);
    }
  }

  async signOut(): Promise<void> {
    await this.msalService.logout().toPromise();
    this.user = undefined;
    this.authenticated = false;
  }

  private async getUser(): Promise<User365 | undefined> {
    if (!this.authenticated) return undefined;
  
    // Create an authentication provider for the current user
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
      this.msalService.instance as PublicClientApplication,
      {
        account: this.msalService.instance.getActiveAccount()!,
        scopes: OAuthSettings.scopes,
        interactionType: InteractionType.Popup
      }
    );
  
    // Initialize the Graph client
    this.graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  
    // Get the user from Graph (GET /me)
    const graphUser: MicrosoftGraph.User = await this.graphClient
      .api('/me')
      .select('displayName,mail,userPrincipalName')
      .get();
  
    const user = new User365();
    user.displayName = graphUser.displayName ?? '';
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail ?? graphUser.userPrincipalName ?? '';
    user.timeZone = graphUser.mailboxSettings?.timeZone ?? 'UTC';
    user.userPrincipalName = graphUser.userPrincipalName ?? '';
  
    return user;
  }

  async getUsers(): Promise<MicrosoftGraph.Event[] | undefined> {
    if (!this.graphClient) {
      console.log('Graph client is not initialized.');
      return undefined;
    }

    try {
      // GET /me/calendarview?startDateTime=''&endDateTime=''
      // &$select=subject,organizer,start,end
      // &$orderby=start/dateTime
      // &$top=50
      const result =  await this.graphClient
        .api('/users')
        .get();

      return result.value;
    } catch (error) {
      console.log('Could not get events', JSON.stringify(error, null, 2));
    }
    return undefined;
  }
}
