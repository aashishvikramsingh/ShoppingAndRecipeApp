import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import {ShoppingListService} from './shoppingList.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[];

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {

  }
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingrdientAddedEvent
      .subscribe((ingredientsAfterAddingNewItem: Ingredients[]) => {
        this.ingredients = ingredientsAfterAddingNewItem;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }





}
