import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartupComponent} from './recipes/recipe-startup/recipe-startup.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children : [
    { path: '', component: RecipeStartupComponent},
    { path: 'new', component: RecipeEditComponent},
    { path: ':id', component: RecipesDetailComponent},
    { path: ':id/edit', component: RecipeEditComponent}]},
  {path: 'shopping-list', component: ShoppingListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
