import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shoppingList.service';
import {Ingredients} from '../shared/ingredients.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export  class RecipeService {
  private recipes: Recipe[] = [];


  recipeListUpdated = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes () {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }

  addRecipeIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {

    this.recipes[index] = updatedRecipe;
    this.recipeListUpdated.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  refreshRecipes(recipes: Recipe []) {
    this.recipes = recipes;
    this.recipeListUpdated.next(this.recipes.slice());
  }
}
