import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import {ShoppingListService} from './shoppingList.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../authentication/authentication.service';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[];

  private subscription: Subscription;
  private recipeToShoppingTransfer: Subscription;
  private cleanupSubscription: Subscription;

  notificationBannerFlag = false;

  constructor(private shoppingListService: ShoppingListService,
              private authenticationService: AuthenticationService,
              private dataStorageService: DataStorageService) {

  }
  ngOnInit() {


      this.dataStorageService.fetchShoppingList();

      this.subscription = this.shoppingListService.ingredientsChanged
        .subscribe((ingredientsAfterAddingNewItem: Ingredients[]) => {
          this.ingredients = ingredientsAfterAddingNewItem;
        });

      this.recipeToShoppingTransfer = this.shoppingListService.ingredientsTransferred
      .subscribe((ingredientsAfterAddingNewItem: Ingredients[]) => {
        this.ingredients = ingredientsAfterAddingNewItem;
        this.dataStorageService.saveShoppingList()
          .subscribe();
      });

    this.cleanupSubscription = this.authenticationService.cleanupRequired
      .subscribe(() => {
        this.shoppingListService.cleanupShoppingList();
      });




  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cleanupSubscription.unsubscribe();
    this.recipeToShoppingTransfer.unsubscribe();
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
