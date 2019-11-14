import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialogRef} from '@angular/material';
import {HeaderLightComponent} from '../../light/header-light/header-light.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LoginComponent implements OnInit {

  async submit() {
    if (this.api.loginForm.valid) {
      console.log(this.api.login(this.api.loginForm.value));
      //this.clear();
    }
  }

  clear() {
    this.api.loginForm.reset();
    this.dialogRef.close();
  }

  constructor(public api: ApiService, public dialogRef: MatDialogRef<HeaderLightComponent>) { }

  ngOnInit() {
  }

}
