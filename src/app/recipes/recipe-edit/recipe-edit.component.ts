import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor( private activatedRoute: ActivatedRoute,
               private recipeService: RecipeService,
               private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.initializeForm();
      });
  }

  private initializeForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
        const recipe = this.recipeService.getRecipeById(this.id);
        name = recipe.name;
        description = recipe.description;
        imagePath = recipe.imagePath;
        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            ingredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients

    });
  }

  private addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  private removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSave() {

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.route.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
