import {Ingredients} from '../shared/ingredients.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredients[]>();
  editingItem = new Subject<number>();

  private ingredients: Ingredients[] = [];
  //   [
  //   new Ingredients('Apple', 10),
  //   new Ingredients('Orange', 5)
  // ];
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(ing: number) {
    return this.ingredients.slice()[ing];
  }

  addNewItem(ing: Ingredients) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(index: number, ing: Ingredients) {
    this.ingredients[index] = ing;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  refreshIngredients(ingredients: Ingredients[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }



}
