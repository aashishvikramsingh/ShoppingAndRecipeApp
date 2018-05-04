import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredients} from '../../shared/ingredients.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
              private router: Router) { }

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
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

}
