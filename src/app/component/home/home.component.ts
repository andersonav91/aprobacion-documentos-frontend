import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../model/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public currentUser: UserModel;

  constructor(
    public authService: AuthService
  ) {
    this.authService.currentUser.subscribe((user: UserModel) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

}
