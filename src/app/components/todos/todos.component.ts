import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TodosService } from '../../services/todos.service';
import { TableModule } from 'primeng/table';
import { ITodoModel } from '../../models/ITodoModel';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { IUserModel } from '../../models/IUserModel';

@Component({
    selector: 'app-todos',
    standalone: true,
    imports: [
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        CommonModule
    ],
    templateUrl: './todos.component.html'
})
export class TodosComponent {
    newTodo: ITodoModel = { id: 0, userId: 0, title: '', completed: false };
    todoList: ITodoModel[] = [];
    selectedTodos: ITodoModel[] = [];
    clonedTodos: { [i: number]: ITodoModel } = {};
    todosService: TodosService = inject(TodosService);
    authService: AuthService = inject(AuthService);
    userLoggedIn!: IUserModel;
    isLoading: boolean = true;

    constructor() {
        this.authService.currentUser.subscribe(usr => {
            if (usr) {
                this.userLoggedIn = usr;
                this.newTodo.userId = usr.id;
                this.todosService.getTodos(usr.id).subscribe(list => {
                    this.todoList = list;
                    this.isLoading = false;
                });
            } else if (!this.userLoggedIn) {
                this.isLoading = false;
                Swal.fire("Could not load user profile.");
            }
        });
    }

    create() {
        if (!this.newTodo.title) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must provide a title for a TO DO task!"
            });
            return;
        }

        if (this.newTodo.title.length > 250) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Title for a TO DO task must have a maximum of 250 chars!"
            });
            return;
        }

        this.todosService.create(this.newTodo).subscribe({
            next: (data: ITodoModel) => {
                let cloneTodos = [...this.todoList];
                const todoExists = cloneTodos.some(todo => todo.id === data.id);
                if (todoExists)
                    data.id++;
                cloneTodos.push(data);
                this.todoList = cloneTodos;
                this.newTodo = { id: 0, userId: this.userLoggedIn.id, title: '', completed: false };
            },
            error: (error) => console.error('Error creating todo', error),
            complete: () => {
                Swal.fire({
                    icon: "success",
                    title: "TO DO task has been added!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }

    onRowEditInit(todo: ITodoModel) {
        this.clonedTodos[todo.id] = { ...todo };
    }

    onRowEditSave(todo: ITodoModel) {

        if (todo.title.length > 250) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Title for a TO DO task must have a maximum of 250 chars!"
            });
            return;
        }

        this.todosService.update(todo).subscribe({
            next: (data: ITodoModel) => {
                let cloneTodos = [...this.todoList];
                const todoExists = cloneTodos.some(todo => todo.id === data.id);
                if (todoExists) {
                    cloneTodos.push(data);
                    this.todoList = cloneTodos;
                }
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating todo!"
                });
                console.error('Error updating todo', error);
            },
            complete: () => {
                delete this.clonedTodos[todo.id];
                Swal.fire({
                    icon: "success",
                    title: "TO DO task has been updated!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }

    onRowEditCancel(todo: ITodoModel, idx: number) {
        this.todoList[idx] = this.clonedTodos[todo.id];
        delete this.clonedTodos[todo.id];
    }

    onRowDelete(todo: ITodoModel) {
        this.todosService.delete(todo.id).subscribe({
            next: () => this.todoList = this.todoList.filter(t => t.id !== todo.id),
            error: error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error deleting todo!"
                });
                console.error('Error deleting todo', error);
            },
            complete: () => {
                Swal.fire({
                    icon: "success",
                    title: "TO DO task has been deleted!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    }
}
