import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { IUserModel } from '../models/IUserModel';
import { environment } from '../environments/env';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<IUserModel | null>;
	public currentUser: Observable<IUserModel | null>;

	constructor(private http: HttpClient) {
		const storedUser = JSON.parse(sessionStorage.getItem('currentUser') as string);
		this.currentUserSubject = new BehaviorSubject<IUserModel | null>(storedUser ? storedUser : null);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	authenticate(email: string): Observable<boolean> {
		return this.http.get<IUserModel[]>(`${environment.baseUrl}${environment.apis.users}?email=${email}`)
			.pipe(
				map(resp => {
					if (resp && resp.length > 0) {
						sessionStorage.setItem('currentUser', JSON.stringify(resp[0]));
						this.currentUserSubject.next(resp[0]);
						return true;
					}
					return false;
				}),
				catchError(error => {
					console.error('Authentication error', error);
					return of(false);
				})
			);
	}

	getCurrentUser(): Observable<IUserModel | null> {
		return this.currentUserSubject.asObservable();
	}

	logout() {
		sessionStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
