import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./component/login/login.component";
import { HomeComponent } from "./component/home/home.component";
import { AuthGuard } from "./guard/auth.guard";
import {DocumentTypeListComponent} from "./component/document-type/document-type-list/document-type-list.component";
import {DocumentTypeNewComponent} from "./component/document-type/document-type-new/document-type-new.component";
import {DocumentTypeEditComponent} from "./component/document-type/document-type-edit/document-type-edit.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document-type',
    component: DocumentTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document-type/:id/edit',
    component: DocumentTypeEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document-type/new',
    component: DocumentTypeNewComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
