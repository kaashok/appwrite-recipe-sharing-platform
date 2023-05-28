import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppWriteService } from 'src/app/services/app-write.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';
import { RecipeModel, RecipeTypeArray } from 'src/app/core/dbo/Recipe';
import { AppInfoComponent } from '../app-info/app-info.component';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent {
  loading: boolean = false;
  recipeList: RecipeModel[] = [];
  filteredRecipeList: RecipeModel[] = [];
  selectedRecipe: RecipeModel | null = null;
  recipeOptions: string[] = ['All'].concat(RecipeTypeArray);
  filterRecipe: string = this.recipeOptions[0];
  isMobile: boolean = false;
  createdOn: Date = new Date();

  constructor(private router: Router, private appWriteService: AppWriteService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getRecipe();
  }

  async getRecipe() {
    this.loading = true;
    const response = await this.appWriteService.getRecipeList();
    this.recipeList = response.documents;
    this.filteredRecipeList = this.recipeList;
    this.selectedRecipe = this.filteredRecipeList[0];
    this.createdOn = this.getCreatedOnDate(this.selectedRecipe);
    this.loading = false;
  }


  addRecipe() {
    const dialogRef = this.dialog.open(RecipeAddComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getRecipe();
    })

  }

  searchRecipe(searchValue: any) {
    searchValue = searchValue.target.value.trim().toLowerCase();
    this.searchApplyFilter(searchValue)
  }

  filterRecipes(filterValue: string) {
    this.searchApplyFilter(undefined, filterValue);
  }

  searchApplyFilter(searchValue?: string, filterValue?: string) {

    // apply filter
    if (filterValue !== undefined)
      if (filterValue === 'All') {
        this.filteredRecipeList = this.recipeList;
      } else {
        this.filteredRecipeList = this.recipeList.filter(x => x.type === filterValue);
      }

    //apply search
    if (searchValue !== undefined)
      this.filteredRecipeList = this.recipeList.filter(item => item.name.toLowerCase().includes(searchValue));

  }

  selectRecipe(item: RecipeModel) {
    this.selectedRecipe = item;
    this.createdOn = this.getCreatedOnDate(this.selectedRecipe);
    this.makeResponsiveLayout();
  }

  logout() {
    this.appWriteService.updateCurrentUser('')
    this.router.navigate(['/login']);
  }

  makeResponsiveLayout() {
    if (window.innerWidth <= 480) { // Mobile
      this.isMobile = true;
      this.scrollToView("recipe-details-scroll-to-bottom")
    }
  }

  scrollToView(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth <= 480) { // Mobile
      this.isMobile = true;
    }
  }

  getCreatedOnDate(item: any): Date {
    return new Date(item['$createdAt']);
  }

  showInfo() {
    this.dialog.open(AppInfoComponent, {      
      width: '500px'
    });
  }
}
