import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartupComponent} from './recipes/recipe-startup/recipe-startup.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {SigninComponent} from './authentication/signin/signin.component';
import {AuthenticationGuardService} from './authentication/authentication-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthenticationGuardService], children : [
    { path: '', component: RecipeStartupComponent},
    { path: 'new', component: RecipeEditComponent, },
    { path: ':id', component: RecipesDetailComponent},
    { path: ':id/edit', component: RecipeEditComponent}]},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthenticationGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
