import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from '../../appdemo/login/login.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
declare var $: any;

@Component({
  selector: 'app-header-home',
  templateUrl: './header-light.component.html',
  styleUrls: ['./header-light.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HeaderLightComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.setMenuOverlay();
  }

  onLogIn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  setMenuOverlay() {
    const btMenu = '.bt-menu';
    const open = 'open';
    const menuBar = '.menu_bar';
    const menuMobile = '#menu_mobile';
    const overlay = '#overlay';
    const navLink = '.nav-link';
    const navbarCollapse = '.navbar-collapse';

     $(menuBar).on('click', (event) => {
      event.stopPropagation();
      $(btMenu).toggleClass(open);
      $(menuMobile).toggleClass('active');
      $(overlay).toggleClass('overlay');

      const activeState = $(menuMobile).hasClass('active');

      $(menuMobile).animate({ left: activeState ? '0%' : '-100%'}, 400);

      });

    $('.dropdown-toggle').click( () => {
      $('.dropdown-menu').slideToggle();
    });

     $(navLink).click( () => {
      const target = $(navbarCollapse);

        if ( target.hasClass('active') ) {
            target.removeClass('active');
            target.animate({left: '-100%'});
            $(btMenu).removeClass(open);
            $(overlay).removeClass('overlay');
          }
      });
  }

}
