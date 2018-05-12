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
      },
        (e) => console.log('error while fetching recipes : ' + e )
        );
  }

  addRecipe(recId, recipe) {
    const token = this.authenticationService.getToken();
    return this.http.post('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/recipes.json/' + recId + '.json?auth=' + token.tok,
      recipe);
  }

  deleteRecipe(recId) {
    const token = this.authenticationService.getToken();
    return this.http.delete('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/recipes.json/' + recId + '.json?auth=' + token.tok);
  }

  modifyRecipe(recId, recipe) {
    const token = this.authenticationService.getToken();
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/recipes.json/' + recId + '.json?auth=' + token.tok, recipe);
  }

//------------------------------------------------------------------------------------------------------------------------------

  saveShoppingList() {
    const token = this.authenticationService.getToken();
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok,
      this.shoppingListService.getIngredients());
  }

  fetchShoppingList() {
    const token = this.authenticationService.getToken();
    return this.http.get<Ingredients[]>('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok)
      .map((response) => {
        const ingredients: Ingredients[];
        for (const res of response) {
          ingredients.push(res.value);
        }
        return ingredients;
      })
      .subscribe((ingredients) => {
        if (!ingredients) {
          throw new Error('No shopping data to fetch');
        }
        console.log(ingredients);

        this.shoppingListService.refreshIngredients(ingredients);
      },
        (e) => console.log('error while fetching shopping list : ' + e ));
  }



  addIngredient(ingId, ingredient) {
    const token = this.authenticationService.getToken();
    console.log(ingId);
    console.log(ingredient);

    return this.http.post('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok,
      {key: ingId, value: ingredient});
  }



  deleteIngredient(ingId) {
    const token = this.authenticationService.getToken();
    return this.http.delete('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok,
      {key: ingId});
  }


  modifyIngredient(ingId, ingredient) {
    const token = this.authenticationService.getToken();
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList/key/' + ingId +'.json?auth=' + token.tok, ingredient);
  }

  transferIngredientsfromRecipeToShoppingList(ingredients: Ingredients[]) {
    const token = this.authenticationService.getToken();
    if (token) {
      let ingred: Ingredients [] = [];
      ingred = this.shoppingListService.getIngredients();
      ingred.push(... ingredients);
      this.http.put('https://shoppingandrecipeapp.firebaseio.com/' + token.uid + '/shoppingList.json?auth=' + token.tok,
        ingred).subscribe(() => {
          this.fetchShoppingList();
        },
        (e) => console.log('error in transferring Ingredients from Recipe to Shopping List : ' + e ));
    }


  }
}
