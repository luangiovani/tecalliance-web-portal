import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor called!!!");
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                Swal.fire("Cannot access the application.").then((r) => {
                    try {
                        this.authService.logout();
                    } catch (error) {
                        console.log(error);
                    }
                    this.router.navigate(['/auth']);
                  });
            } else if (err.status !== 200) {
                Swal.fire("Cannot complete the operation.");
            }
            return throwError(() => {
                return new Error(
                    (err.error !== undefined && err.error !== null ? 
                        err.error.message : err.message) 
                    || err.statusText);
            });
        }));
    }
}
