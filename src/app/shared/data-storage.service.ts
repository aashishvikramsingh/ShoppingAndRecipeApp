import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }

  saveRecipes() {
    return this.http.put('https://shoppingandrecipeapp.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());

  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://shoppingandrecipeapp.firebaseio.com/recipes.json')
      .map((response) => {
        const recipes: Recipe[] = response;
        for (let recipe of recipes) {
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
}
