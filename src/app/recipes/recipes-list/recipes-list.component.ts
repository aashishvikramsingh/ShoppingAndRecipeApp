import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../authentication/authentication.service';
import {DataStorageService} from '../../shared/data-storage.service';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})

export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  cleanupSubscription: Subscription;
  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {

    this.dataStorageService.fetchRecipes();
    this.subscription = this.recipeService.recipeListUpdated
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    this.cleanupSubscription = this.authenticationService.cleanupRequired
      .subscribe(() => {
        this.recipeService.cleanupRecipes();
      });

  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cleanupSubscription.unsubscribe();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }


}
