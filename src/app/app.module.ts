import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModules } from './angular-material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { ReceipeViewComponent } from './components/receipe-view/receipe-view.component';
import { ReceipeAddComponent } from './components/receipe-add/receipe-add.component';
import { AppSpinnerComponent } from './shared/app-spinner/app-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ErrorDialogComponent,
    MessageDialogComponent,
    ReceipeViewComponent,
    ReceipeAddComponent,
    AppSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...AngularMaterialModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
