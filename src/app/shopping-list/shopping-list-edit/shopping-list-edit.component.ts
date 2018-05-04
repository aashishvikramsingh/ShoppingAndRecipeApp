import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Ingredients} from '../../shared/ingredients.model';
import {ShoppingListService} from '../shoppingList.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputContent: ElementRef;
  @ViewChild('amountInput') amountInputContent: ElementRef;

  ingredient: Ingredients;

  // @Output() newItemEvent = new EventEmitter<Ingredients>();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  submitContent() {
    this.ingredient = new Ingredients(this.nameInputContent.nativeElement.value,
    this.amountInputContent.nativeElement.value);
    this.shoppingListService.addNewItem(this.ingredient);
  }

  clearFields() {
    this.nameInputContent.nativeElement.value = '';
    this.amountInputContent.nativeElement.value = '';
  }

}
