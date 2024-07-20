import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserModel } from '../models/IUserModel';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    getprofile(id: number): Observable<IUserModel> {
        return this.http.get<IUserModel>(`${environment.baseUrl}${environment.apis.users}/${id}`);
    }
}
