import {OnInit} from '@angular/core';
import {Router} from '@angular/router';

export class BaseComponent implements OnInit {

  constructor(protected router: Router) {

  }

  ngOnInit() {
  }

  getDateTime() {
    return new Date();
  }
}
