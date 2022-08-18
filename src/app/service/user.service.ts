import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ParentService } from "./parent.service";
import { NoticeService } from "./notice.service";
import { UserModel } from "../model/user";
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { OAuthSettings } from '../model/oauth';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Client } from '@microsoft/microsoft-graph-client';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ParentService {
  public graphClient?: Client;

  constructor(
    public httpClient: HttpClient,
    public noticeService: NoticeService,
    private msalService: MsalService
  ) {
    super(httpClient, noticeService);
  }

  /**
   * Constructs a `GET` request that obtains the full list of users.
   */
  listUsers(): any {
    return this.getMethod('users')
  }

  /**
   * Constructs a `POST` request that saves a user.
   */
  saveUser(data: UserModel): any {
    return this.postMethod('users', data);
  }

  /**
   * Constructs a `GET` request that obtain the data for a user.
   */
  getUser(id: number): any {
    return this.getMethod('users/' + id);
  }

  /**
   * Constructs a `PUT` request that edits a user.
   */
  editUser(data: UserModel): any {
    return this.putMethod('users/' + data.id, data);
  }

  /**
   * Constructs a `PUT` request that changes the user password.
   */
  changePassword(id: number, data: any): any {
    return this.putMethod('users/change-password/' + id, data);
  }

  /**
   * Constructs a `PUT` request that changes the user password as an admin user.
   */
  changePasswordAdmin(id: number, data: any): any {
    return this.putMethod('users/change-password-admin/' + id, data);
  }

  /**
   * Constructs a `GET` request that obtain the all the user tha could be assigned to a flow.
   */
  getAssignedUsersByDocument(idDocument: number): any {
    return this.getMethod('documents/' + idDocument.toString() + '/users');
  }

  async getUserOffice365(email:String):Promise<boolean>{
    // Create an authentication provider for the current user
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
      this.msalService.instance as PublicClientApplication,
      {
        account: this.msalService.instance.getActiveAccount()!,
        scopes: OAuthSettings.scopes,
        interactionType: InteractionType.Popup
      }
    );
  
    this.graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
    const graphUser: MicrosoftGraph.User = await this.graphClient
      .api('/users')
      .select('displayName,mail,userPrincipalName')
      .filter('endswith(mail,a@contoso.com)')
      .get(); 
    return graphUser ? true : false;
  }

  /**
   * Constructs a `GET` request that obtain the data for a user.
   */
   getUsersApprovers(): any {
    return this.getMethod('roles/APROBADOR/users');
  }
}
