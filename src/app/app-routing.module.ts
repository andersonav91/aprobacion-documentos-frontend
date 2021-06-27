import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./component/login/login.component";
import { HomeComponent } from "./component/home/home.component";
import { AuthGuard } from "./guard/auth.guard";
import { DocumentTypeListComponent } from "./component/document-type/document-type-list/document-type-list.component";
import { DocumentTypeNewComponent } from "./component/document-type/document-type-new/document-type-new.component";
import { DocumentTypeEditComponent } from "./component/document-type/document-type-edit/document-type-edit.component";
import { StatusListComponent } from "./component/status/status-list/status-list.component";
import { StatusEditComponent } from "./component/status/status-edit/status-edit.component";
import { StatusNewComponent } from "./component/status/status-new/status-new.component";
import { UserListComponent } from "./component/user/user-list/user-list.component";
import { UserEditComponent } from "./component/user/user-edit/user-edit.component";
import { UserNewComponent } from "./component/user/user-new/user-new.component";
import {DocumentListComponent} from "./component/document/document-list/document-list.component";
import {DocumentShowComponent} from "./component/document/document-show/document-show.component";
import {FlowCreateComponent} from "./component/status-flow/flow-create/flow-create.component";
import {DocumentChangeFlowComponent} from "./component/document/document-change-flow/document-change-flow.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DocumentListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['all'] }
  },
  {
    path: 'document-type',
    component: DocumentTypeListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'document-type/:id/edit',
    component: DocumentTypeEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'document-type/new',
    component: DocumentTypeNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'status',
    component: StatusListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'status/:id/edit',
    component: StatusEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'status/new',
    component: StatusNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user/:id/edit',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['all'] }
  },
  {
    path: 'user/new',
    component: UserNewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'document',
    component: DocumentListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['all'] }
  },
  {
    path: 'document/:id/show',
    component: DocumentShowComponent,
    canActivate: [AuthGuard],
    data: { roles: ['all'] }
  },
  {
    path: 'flow',
    component: FlowCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'document/:id/change-flow',
    component: DocumentChangeFlowComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
