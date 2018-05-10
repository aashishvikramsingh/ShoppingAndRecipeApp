import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private authenticationService: AuthenticationService) {}

  username = '';



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

  isAuthenticate() {
    this.username = this.authenticationService.getUsername();
    return this.authenticationService.isAuthenticated();
  }

  logout() {
    this.authenticationService.logout();
  }

}
