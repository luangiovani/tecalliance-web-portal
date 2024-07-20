import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.css'
})
export class LandingComponent {
	title = 'web-portal';
	authService: AuthService = inject(AuthService);
	constructor() {
		try {
			this.authService.logout();
		} catch (error) {
			console.log(error);
		}
	}
}
