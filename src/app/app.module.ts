import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {InViewportModule} from 'ng-in-viewport';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { PersistanceService } from './services/persistant-service';
import { ApiService } from './services/api.service';
import { CookieService } from 'ngx-cookie-service';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { LightComponent } from './components/light/light.component';
import { HeaderLightComponent } from './components/light/header-light/header-light.component';

import { HomeComponent } from './components/light/home/home.component';
import { DemoComponent } from './components/appdemo/demo/demo.component';
import { TeamComponent } from './components/light/team/team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppDemoComponent } from './components/appdemo/appdemo.component';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './components/appdemo/login/login.component';
import { SubmitMatchComponent } from './components/appdemo/submit-match/submit-match.component';
import { CreateTeamComponent } from './components/appdemo/create-team/create-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,

    SafeHtmlPipe,

    HeaderLightComponent,

    HomeComponent,
    DemoComponent,
    TeamComponent,
    AppDemoComponent,
    LoginComponent,
    SubmitMatchComponent,
    CreateTeamComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatNativeDateModule,
    MaterialModule,
    AppRoutingModule,
    InViewportModule,
  ],
  providers: [PersistanceService, ApiService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [CreateTeamComponent, SubmitMatchComponent]
})
export class AppModule {
}
