import {Component, Output} from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private title: string = 'Aprobación Documentos';

  constructor(
    public userService: UserService
  ) {

  }

  logout() {

  }

}
