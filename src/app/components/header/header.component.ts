import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUserModel } from '../../models/IUserModel';
import { UsersService } from '../../services/users.service';
import { UserComponent } from '../user/user.component';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	standalone: true,
	imports: [
		ToolbarModule,
		AvatarModule,
		ButtonModule,
		UserComponent
	]
})
export class HeaderComponent implements OnInit {
	@ViewChild(UserComponent)
	private userDetailsComponent: UserComponent | undefined
	
	authService: AuthService = inject(AuthService);
	userService: UsersService = inject(UsersService);
	username: string = '';
	userModel!: IUserModel;
	router: Router = inject(Router);

	ngOnInit(): void {
		this.authService.getCurrentUser().subscribe(usr => {
			this.username = usr?.name ?? 'Unauthenticated User';
			if(usr)
				this.userModel = usr;
		});
	}

	signout() {
		try {
			this.authService.logout();
		} catch (error) {
			console.log(error);
		}
		this.router.navigate(['/']);
	}

	gotohome() {
		this.router.navigate(['/home']);
	}

	gotoabout() {
		this.router.navigate(['/about']);
	}

	seeprofile() {
		if(this.userDetailsComponent)
			this.userDetailsComponent.show();
	}
}
