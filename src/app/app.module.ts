import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {InViewportModule} from 'ng-in-viewport';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { PersistanceService } from './services/persistant-service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { LightComponent } from './components/light/light.component';
import { HeaderLightComponent } from './components/light/header-light/header-light.component';

import { HomeComponent } from './components/light/home/home.component';
import { DemoComponent } from './components/light/demo/demo.component';
import { TeamComponent } from './components/light/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,

    SafeHtmlPipe,

    HeaderLightComponent,

    HomeComponent,
    DemoComponent,
    TeamComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    InViewportModule,
  ],
  providers: [PersistanceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
