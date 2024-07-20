import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.getCurrentUser().pipe(
            map(usr => {
                if (!usr) {
                    this.router.navigate(['/auth']);
                    return false;
                }
                return true;
            })
        );
    }
}
