import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NoticeService } from "../../../service/notice.service";
import { UserModel } from "../../../model/user";
import { UserService } from "../../../service/user.service";
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { OAuthSettings } from '../../../model/oauth';
import { Client } from '@microsoft/microsoft-graph-client';
import { User365 } from 'src/app/model/user365';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  public graphClient?: Client;

  constructor(
    private router: Router,
    private userService: UserService,
    private noticeService: NoticeService,
    private msalService: MsalService
  ) { }

  ngOnInit(): void {
  }

  async addUser(data: any) {
    let user: UserModel = Object.assign(new UserModel(), data);
    user.userRoles = [{id: data.role}];
    this.userService.saveUser(user)
      .subscribe((response: any) => {
        this.noticeService.show("Usuario creado correctamente.", "success");
        this.cancel();
      });
  }

  async validateExistUser(){
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
  
    var userGraph = await this.graphClient
              .api('/users/CristianCarmona@MoonCake940.onmicrosoft.com')
              .select('displayName,mail,userPrincipalName')
              .get();
    const user = new User365();
    user.displayName = userGraph.displayName ?? '';
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  changePassword(data: any) {
    console.log('changing password');
  }
}
