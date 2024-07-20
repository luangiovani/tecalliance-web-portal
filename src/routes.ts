import { Routes } from "@angular/router";
import { HomeComponent } from "./app/pages/home/home.component";
import { AboutComponent } from "./app/pages/about/about.component";
import { LandingComponent } from "./app/pages/landing/landing.component";
import { AuthComponent } from "./app/pages/auth/auth.component";
import { AuthGuard } from "./app/_helpers/auth.guard";

const routeConfig: Routes = [
    {
      path: '',
      component: LandingComponent,
      title: 'Welcome',
    },
    {
      path: 'auth',
      component: AuthComponent,
      title: 'Auth',
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home',
      canActivate: [AuthGuard], 
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'about',
      component: AboutComponent,
      title: 'About',
      canActivate: [AuthGuard], 
      runGuardsAndResolvers: 'always'
    },
  ];
  export default routeConfig;