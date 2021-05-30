import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { NoticeService } from "../../service/notice.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private noticeService: NoticeService
  ) {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
    this.noticeService.hide();
  }

  createLoginForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  sendLoginForm() {
    this.authService.login({
      email: this.f.email.value,
      password: this.f.password.value,
    });
  }

  get f(){
    return this.loginForm.controls;
  }

}
