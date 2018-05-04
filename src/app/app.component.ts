import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isShoppingVisible = true;
  onSectionClick(section: string) {
    this.isShoppingVisible = section === 'Shopping';
    console.log(section);
  }
}
