import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredients} from '../../shared/ingredients.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param: Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      });
  }

  transferToShoppingList(recipeIngredients: Ingredients[]) {
    this.recipeService.addRecipeIngredientsToShoppingList(recipeIngredients);
  }

  editRecipe() {
    this.route.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(['/recipes']);
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

}
