import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as SecureLS from 'secure-ls';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { MatDialogModule } from "@angular/material/dialog";

import { MatNativeDateModule } from '@angular/material/core';

// Components
import { AppComponent } from "./component/app/app.component";
import { LoginComponent } from "./component/login/login.component";
import { NoticeComponent } from './component/notice/notice.component';
import { LoadingComponent } from './component/loading/loading.component';
import { HomeComponent } from './component/home/home.component';
import { DocumentTypeListComponent } from './component/document-type/document-type-list/document-type-list.component';
import { DocumentTypeFormComponent } from './component/document-type/document-type-form/document-type-form.component';
import { DocumentTypeNewComponent } from './component/document-type/document-type-new/document-type-new.component';
import { DocumentTypeEditComponent } from './component/document-type/document-type-edit/document-type-edit.component';
import { StatusListComponent } from './component/status/status-list/status-list.component';
import { StatusFormComponent } from './component/status/status-form/status-form.component';
import { StatusNewComponent } from './component/status/status-new/status-new.component';
import { StatusEditComponent } from './component/status/status-edit/status-edit.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserFormComponent } from './component/user/user-form/user-form.component';
import { UserNewComponent } from './component/user/user-new/user-new.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { DocumentListComponent } from './component/document/document-list/document-list.component';
import { DocumentShowComponent } from './component/document/document-show/document-show.component';
import { FlowCreateComponent } from './component/status-flow/flow-create/flow-create.component';
import { DocumentChangeFlowComponent } from './component/document/document-change-flow/document-change-flow.component';
import { StatusDeleteDialogComponent } from './component/status/status-delete-dialog/status-delete-dialog.component';

// Interceptors
import { CustomHttpInterceptor } from "./interceptor/custom.http.interceptor";
import { TokenHttpInterceptor } from "./interceptor/token.http.interceptor";

// Guards
import { AuthGuard } from "./guard/auth.guard";
import { DocumentTypeDeleteDialogComponent } from './component/document-type/document-type-delete-dialog/document-type-delete-dialog.component';

//Office 365 Graph
import { IPublicClientApplication,
         PublicClientApplication,
         BrowserCacheLocation } from '@azure/msal-browser';
import { MsalModule,
         MsalService,
         MSAL_INSTANCE } from '@azure/msal-angular';
import { OAuthSettings } from '../app/model/oauth';

let msalInstance: IPublicClientApplication | undefined = undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalInstance = msalInstance ?? new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });

  return msalInstance;
}

let ls = new SecureLS({});

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  DragDropModule,
  MatDialogModule,
  MatNativeDateModule
];

export function tokenGetter() {
  return ls.get('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoticeComponent,
    LoadingComponent,
    HomeComponent,
    DocumentTypeListComponent,
    DocumentTypeFormComponent,
    DocumentTypeNewComponent,
    DocumentTypeEditComponent,
    StatusListComponent,
    StatusFormComponent,
    StatusNewComponent,
    StatusEditComponent,
    UserListComponent,
    UserFormComponent,
    UserNewComponent,
    UserEditComponent,
    DocumentListComponent,
    DocumentShowComponent,
    FlowCreateComponent,
    DocumentChangeFlowComponent,
    StatusDeleteDialogComponent,
    DocumentTypeDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    PdfJsViewerModule,
    ...materialModules,
    MsalModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenHttpInterceptor,
    multi: true
  }, AuthGuard,
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService],
  bootstrap: [AppComponent],
  exports: [
    ...materialModules
  ]
})
export class AppModule { }
