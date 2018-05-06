import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shoppingList.service';
import {Ingredients} from './ingredients.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {}

  saveRecipes() {
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://shoppingandrecipeapp.firebaseio.com/recipes.json')
      .map((response) => {
        const recipes: Recipe[] = response;
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes) => {

        this.recipeService.refreshRecipes(recipes);
      });
  }

  saveShoppingList() {
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/shoppingList.json',
      this.shoppingListService.getIngredients());
  }

  fetchShoppingList() {
    return this.http.get<Ingredients[]>('https://shoppingandrecipeapp.firebaseio.com/shoppingList.json')
      .subscribe((response) => {
        const ingredients: Ingredients[] = response;
        this.shoppingListService.refreshIngredients(ingredients);
      });
  }
}
