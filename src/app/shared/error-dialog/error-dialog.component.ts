import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogData } from 'src/app/core/dbo/error-dialog-data';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})

export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {

  }
}
