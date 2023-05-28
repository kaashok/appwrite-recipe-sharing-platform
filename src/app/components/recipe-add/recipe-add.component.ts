import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeModel, RecipeTypeArray } from 'src/app/core/dbo/Recipe';
import { ErrorDialogData } from 'src/app/core/dbo/error-dialog-data';
import { AppWriteService } from 'src/app/services/app-write.service';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss']
})
export class RecipeAddComponent {
  recipeForm: FormGroup;
  recipeOptions: string[] = RecipeTypeArray
  Editor = ClassicEditor;
  editorConfig: any;

  constructor(private appWriteService: AppWriteService, private addRecipeDialogRef: MatDialogRef<RecipeAddComponent>, private messageDialog: MatDialog) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nonVeg: new FormControl(false, [Validators.required]),
      type: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      steps: new FormControl('', [Validators.required])
    });
    this.createCKEditorClassicConfig();
  }

  getControl(controlName: string) {
    return this.recipeForm.controls[controlName];
  }

  async addRecipe() {
    if (this.recipeForm.invalid) { return }

    const recipeModel: RecipeModel = {
      name: this.getControl('name').value,
      nonVeg: this.getControl('nonVeg').value,
      type: this.getControl('type').value,
      ingredients: this.getControl('ingredients').value,
      steps: this.getControl('steps').value,
      CreatedBy: this.appWriteService.currentUser.value
    }

    const response = await this.appWriteService.createRecipe(recipeModel);
    if (response != null) {
      const dialogData: ErrorDialogData = {
        message: 'Recipe Added Successfully.'
      }
      const messageDialogRef = this.messageDialog.open(MessageDialogComponent, {
        data: dialogData
      });

      messageDialogRef.afterClosed().subscribe(() => {
        this.addRecipeDialogRef.close();
      });
    }

  }

  createCKEditorClassicConfig() {
    this.editorConfig = {
      placeholder: 'Type the content here!',
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'bulletedList',
          'numberedList',
          'alignment',
          'blockQuote',
          'undo',
          'redo'
        ]
      },
      alignment: {
        options: ['left', 'right', 'center', 'justify']
      }
    };
  }
}
