import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LightComponent} from './components/light/light.component';

const routes: Routes = [
  {
    path: '',
    component: LightComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
