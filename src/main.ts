import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './routes';
import { provideHttpClient } from '@angular/common/http';

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(), 
      provideProtractorTestingSupport(), 
      provideAnimations(),
      provideRouter(routeConfig)],
  }).catch((err) => console.error(err));