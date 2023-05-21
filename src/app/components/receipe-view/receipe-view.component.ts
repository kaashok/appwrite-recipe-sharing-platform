import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppWriteService } from 'src/app/services/app-write.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceipeAddComponent } from '../receipe-add/receipe-add.component';
import { RecipeModel, RecipeTypeArray } from 'src/app/core/dbo/Recipe';

@Component({
  selector: 'app-receipe-view',
  templateUrl: './receipe-view.component.html',
  styleUrls: ['./receipe-view.component.scss']
})
export class ReceipeViewComponent {
  loading: boolean = false;
  dataList: RecipeModel[] = [];
  filteredDataList: RecipeModel[] = [];
  selectedItem: RecipeModel | null = null;
  recipeOptions: string[] = ['All'].concat(RecipeTypeArray);
  filterRecipe: string = this.recipeOptions[0];
  constructor(private router: Router, private appWriteService: AppWriteService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getRecipe();
  }

  async getRecipe() {
    this.loading = true;
    const response = await this.appWriteService.getRecipeList();
    this.dataList = response.documents;
    this.filteredDataList = this.dataList;
    this.selectedItem = this.filteredDataList[0];
    this.loading = false;
  }


  addRecipe() {
    const dialogRef = this.dialog.open(ReceipeAddComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getRecipe();
    })

  }

  search(searchValue: any) {
    searchValue = searchValue.target.value.trim().toLowerCase();
    this.searchApplyFilter(searchValue)
  }

  applyFilter(filterValue: string) {
    this.searchApplyFilter(undefined, filterValue);
  }

  searchApplyFilter(searchValue?: string, filterValue?: string) {

    // apply filter
    if (filterValue)
      if (filterValue === 'All') {
        this.filteredDataList = this.dataList;
      } else {
        this.filteredDataList = this.dataList.filter(x => x.type === filterValue);
      }

    //apply search
    if (searchValue)
      this.filteredDataList = this.dataList.filter(item => item.name.toLowerCase().includes(searchValue));
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  logout() {
    this.appWriteService.currentUser.next('');
    this.router.navigate(['/login']);
  }
}
