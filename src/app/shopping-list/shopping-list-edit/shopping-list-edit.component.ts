import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredients} from '../../shared/ingredients.model';
import {ShoppingListService} from '../shoppingList.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  edittedIngredient: Ingredients;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editingItem
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.edittedItemIndex = index;
          this.edittedIngredient = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name : this.edittedIngredient.name,
            amount : this.edittedIngredient.amount
          });
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitContent(form: NgForm) {
    const value = form.value;
    const ingredients  = new Ingredients(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addNewItem(ingredients);
    } else {
      this.shoppingListService.editIngredient(this.edittedItemIndex, ingredients);
      this.editMode = false;
      this.edittedItemIndex = -1;
    }

    form.reset();


  }

  clearFields() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.edittedItemIndex = -1;
  }

  deleteItem() {
    if (this.edittedItemIndex !== -1) {
      this.shoppingListService.deleteItem(this.edittedItemIndex);
      this.clearFields();
    }
  }

}
