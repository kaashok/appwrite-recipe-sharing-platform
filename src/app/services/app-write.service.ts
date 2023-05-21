import { Injectable } from '@angular/core';
import { Client, Account, ID, Databases } from "appwrite";
import { environment } from 'src/environments/environment';
import { AccountModel } from '../core/dbo/Account';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ErrorDialogData } from '../core/dbo/error-dialog-data';
import { BehaviorSubject } from 'rxjs';
import { RecipeModel } from '../core/dbo/Recipe';

@Injectable({
  providedIn: 'root'
})
export class AppWriteService {
  client: Client;
  account: Account;
  databases: Databases;
  currentUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentUser$ = this.currentUser.asObservable();

  constructor(private dialog: MatDialog) {
    const userId = sessionStorage.getItem('currentUser');
    if (userId)
      this.currentUser = new BehaviorSubject<string>(userId);

    this.client = new Client();
    this.client.setEndpoint(environment.appWrite.apiEndPoint).setProject(environment.appWrite.projectID);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }


  createAccount(account: AccountModel) {
    const self = this;
    return new Promise((resolve, reject) => {
      const promise = this.account.create(ID.unique(), account.emailId, account.password);
      promise.then(function (response) {
        resolve(response);
      }, function (error) {
        self.errorhandler(error);
      });
    })


  }

  login(account: AccountModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const promise = this.account.createEmailSession(account.emailId, account.password);
      promise.then(function (response) {
        resolve(response);
      }, function (error) {
        resolve(error);
      });
    })
  }


  getRecipeList(): Promise<any> {
    const self = this;
    return new Promise((resolve, reject) => {
      const promise = this.databases.listDocuments(environment.appWrite.databaseID, environment.appWrite.collectionID);
      promise.then(function (response) {
        resolve(response);
      }, function (error) {
        self.errorhandler(error);
      });
    })
  }

  createRecipe(recipe: RecipeModel) {
    const self = this;
    return new Promise((resolve, reject) => {
      const promise = this.databases.createDocument(environment.appWrite.databaseID, environment.appWrite.collectionID, ID.unique(), recipe);
      promise.then(function (response) {
        resolve(response);
      }, function (error) {
        self.errorhandler(error);
      });
    })
  }


  updateCurrentUser(userId: string) {
    this.currentUser.next(userId);
    sessionStorage.setItem('currentUser', userId);
  }


  errorhandler(error: any) {
    const dialogData: ErrorDialogData = {
      message: error?.message
    }
    this.dialog.open(ErrorDialogComponent, {
      data: dialogData
    });
  }
}
