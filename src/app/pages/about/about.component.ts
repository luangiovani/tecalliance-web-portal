import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        HeaderComponent,
        CardModule
    ],
    templateUrl: './about.component.html'
})
export class AboutComponent {

}
