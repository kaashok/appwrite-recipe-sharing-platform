import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/core/dbo/Account';
import { AppWriteService } from 'src/app/services/app-write.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogData } from 'src/app/core/dbo/error-dialog-data';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private appWriteService: AppWriteService, private router: Router, private dialog: MatDialog) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordValidator);

  }

  getControl(controlName: string) {
    return this.signUpForm.controls[controlName];
  }

  passwordValidator(control: AbstractControl) {
    const group = control as FormGroup;
    if (control && control instanceof (FormGroup)) {
      const password = group.controls['password'];
      const confirmPassword = group.controls['confirmPassword'];

      if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ misMatch: true });
        return { misMatch: true }
      }

      return null;
    }
    return null;
  }

  async signUp() {

    if (!this.signUpForm.valid) { return; }

    const account: AccountModel = {
      name: this.getControl('name')?.value,
      emailId: this.getControl('emailId')?.value,
      password: this.getControl('password')?.value
    }

    const response = await this.appWriteService.createAccount(account);
    if (response !== null) {
      const dialogData: ErrorDialogData = {
        message: 'Account Registered Successfully.'
      }
      this.dialog.open(MessageDialogComponent, {
        data: dialogData
      });

      this.router.navigateByUrl('/login');
    }
  }
}
