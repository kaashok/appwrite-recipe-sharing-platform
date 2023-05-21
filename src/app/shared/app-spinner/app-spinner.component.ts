import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent {
  @Input() loading = true;


  hideSpinner() {
    this.loading = false;
  }
}
