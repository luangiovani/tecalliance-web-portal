import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodosComponent } from '../../components/todos/todos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TodosComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
