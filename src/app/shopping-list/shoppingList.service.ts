import {Ingredients} from '../shared/ingredients.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  ingrdientAddedEvent = new Subject<Ingredients[]>();

  private ingredients = [
    new Ingredients('Apple', 10),
    new Ingredients('Orange', 5)
  ];
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewItem(ing: Ingredients) {
    this.ingredients.push(ing);
    this.ingrdientAddedEvent.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.ingrdientAddedEvent.next(this.ingredients.slice());
  }

}
