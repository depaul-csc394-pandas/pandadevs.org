import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LightComponent} from './components/light/light.component';
import {AppDemoComponent} from './components/appdemo/appdemo.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: LightComponent
  },
  {
    path: 'app',
    component: AppDemoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about-us'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
