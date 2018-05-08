import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import {ShoppingListService} from './shoppingList.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[];

  private subscription: Subscription;

  notificationBannerFlag = false;

  constructor(private shoppingListService: ShoppingListService,
              private authenticationService: AuthenticationService) {

  }
  ngOnInit() {

      this.ingredients = this.shoppingListService.getIngredients();
      this.subscription = this.shoppingListService.ingredientsChanged
        .subscribe((ingredientsAfterAddingNewItem: Ingredients[]) => {
          this.ingredients = ingredientsAfterAddingNewItem;
        });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.editingItem.next(index);
  }


  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  displayBanner() {
    this.notificationBannerFlag = true;
    setTimeout(() => this.notificationBannerFlag = false, 3000);
  }

}
