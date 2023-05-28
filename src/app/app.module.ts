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
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';
import { RecipeAddComponent } from './components/recipe-add/recipe-add.component';
import { AppSpinnerComponent } from './shared/app-spinner/app-spinner.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ErrorDialogComponent,
    MessageDialogComponent,
    RecipeViewComponent,
    RecipeAddComponent,
    AppSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...AngularMaterialModules,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
