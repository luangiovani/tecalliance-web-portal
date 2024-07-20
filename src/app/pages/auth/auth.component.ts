import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		CardModule,
		CommonModule,
		InputGroupModule,
		InputGroupAddonModule
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {

	email: string = '';
	authMessage = '';
	authService: AuthService = inject(AuthService);

	constructor(private router: Router) {
		this.authService.getCurrentUser().pipe(
			map(usr => {
				if (usr)
					this.router.navigate(['/home']);
			})
		);
	}

	authenticate() {
		if (this.email) {
			this.authService.authenticate(this.email).subscribe(isAuthenticated => {
				if (isAuthenticated)
					this.router.navigate(['/home']);
				else
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "You are not authorized to see this resource!"
					});
			});
		}
	}

	cancel() {
		this.email = '';
		this.router.navigate(['/']);
	}

	clear() {
		this.email = '';
	}
}
