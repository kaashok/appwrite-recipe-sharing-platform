import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/core/dbo/Account';
import { AppWriteService } from 'src/app/services/app-write.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  message: string = "";

  constructor(private appWriteService: AppWriteService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  getControl(controlName: string) {
    return this.loginForm.controls[controlName];
  }

  OnInputChange() {
    this.message = "";
  }

  async login() {

    if (!this.loginForm.valid) { return; }

    const account: AccountModel = {
      emailId: this.getControl('userName')?.value,
      password: this.getControl('password')?.value
    }
    const response = await this.appWriteService.login(account);
    if (response?.code == 401) {
      this.message = response?.message;
    } else {
      this.appWriteService.updateCurrentUser(response.userId);
      this.router.navigateByUrl('/recipe-view');
    }
  }
}
