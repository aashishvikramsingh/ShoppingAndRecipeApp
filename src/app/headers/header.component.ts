import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  saveRecipes() {
    this.dataStorageService.saveRecipes()
      .subscribe();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }

  saveShoppingList() {
    this.dataStorageService.saveShoppingList()
      .subscribe();
  }

  fetchShoppingList() {
    this.dataStorageService.fetchShoppingList();
  }
}
