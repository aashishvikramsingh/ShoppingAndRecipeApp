import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shoppingList.service';
import {Ingredients} from './ingredients.model';
import 'rxjs/add/operator/map';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authenticationService: AuthenticationService) {}

  saveRecipes() {
    const token = this.authenticationService.getToken();
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/recipes.json?auth=' + token.tok,
      this.recipeService.getRecipes());

  }

  fetchRecipes() {
    const token = this.authenticationService.getToken();
    return this.http.get<Recipe[]>('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/recipes.json?auth=' + token.tok)
      .map((response) => {
        if (!response) {
          throw new Error('No recipe data to fetch');
        }
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
    const token = this.authenticationService.getToken();
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok,
      this.shoppingListService.getIngredients());
  }

  fetchShoppingList() {
    const token = this.authenticationService.getToken();
    return this.http.get<Ingredients[]>('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok)
      .subscribe((response) => {
        if (!response) {
          throw new Error('No shopping data to fetch');
        }
        const ingredients: Ingredients[] = response;
        this.shoppingListService.refreshIngredients(ingredients);
      });
  }

}
