import {ShoppingListService} from '../shopping-list/shoppingList.service';
import {RecipeService} from '../recipes/recipe.service';
import {Injectable} from '@angular/core';

@Injectable()
export default class CleanupService {
  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService) {

  }

  cleanupObjects() {
    this.shoppingListService.cleanupShoppingList();
    this.recipeService.cleanupRecipes();
  }

}
