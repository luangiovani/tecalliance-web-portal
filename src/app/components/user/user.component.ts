import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IUserModel } from '../../models/IUserModel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        CardModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        FormsModule
    ],
    templateUrl: './user.component.html'
})

export class UserComponent {
    @Input() userModel: IUserModel;

    visible: boolean = false;
    
    constructor() {
        this.userModel = {
            id: 0,
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: '',
                    lng: ''
                }
            },
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        };
    }

    show() {
        this.visible = true;
    }
}
