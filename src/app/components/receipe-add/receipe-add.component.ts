import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeModel, RecipeTypeArray } from 'src/app/core/dbo/Recipe';
import { ErrorDialogData } from 'src/app/core/dbo/error-dialog-data';
import { AppWriteService } from 'src/app/services/app-write.service';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-receipe-add',
  templateUrl: './receipe-add.component.html',
  styleUrls: ['./receipe-add.component.scss']
})
export class ReceipeAddComponent {
  recipeForm: FormGroup;
  recipeOptions: string[] = RecipeTypeArray

  constructor(private appWriteService: AppWriteService, private dialogRef: MatDialogRef<ReceipeAddComponent>, private dialog: MatDialog) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nonVeg: new FormControl(false, [Validators.required]),
      type: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      steps: new FormControl('', [Validators.required])
    });
  }

  getControl(controlName: string) {
    return this.recipeForm.controls[controlName];
  }

  addRecipe() {
    if (this.recipeForm.invalid) { return }

    const recipeModel: RecipeModel = {
      name: this.getControl('name').value,
      nonVeg: this.getControl('nonVeg').value,
      type: this.getControl('type').value,
      ingredients: this.getControl('ingredients').value,
      steps: this.getControl('steps').value,
    }

    const response = this.appWriteService.createRecipe(recipeModel);
    if (response != null) {
      const dialogData: ErrorDialogData = {
        message: 'Recipe Added Successfully.'
      }
      this.dialog.open(MessageDialogComponent, {
        data: dialogData
      });
    }
    this.dialogRef.close();

  }
}
