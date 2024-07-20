import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { HttpClient } from '@angular/common/http';
import { ITodoModel } from '../models/ITodoModel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    constructor(private http: HttpClient) { }

    getTodos(userId: number): Observable<ITodoModel[]> {
        return this.http.get<ITodoModel[]>(`${environment.baseUrl}${environment.apis.users}/${userId}/${environment.apis.todos}`);
    }

    create(model: ITodoModel): Observable<ITodoModel> {
        return this.http.post<ITodoModel>(`${environment.baseUrl}${environment.apis.todos}`, model);
    }

    update(model: ITodoModel): Observable<ITodoModel> {
        return this.http.put<ITodoModel>(`${environment.baseUrl}${environment.apis.todos}/${model.id}`, model);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.baseUrl}${environment.apis.todos}/${id}`);
    }
}
