import {Component, HostListener, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-appdemo',
  templateUrl: './appdemo.component.html',
  styleUrls: ['./appdemo.component.css']
})
export class AppDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(window).load(function (e) {
      e.preventDefault();
      if (window.location.hash) {
        let hash = window.location.hash;
        $("html, body").animate({ scrollTop: $(hash).offset().top - 80 });
      }
    });

    $('a.page-scroll').on('click', function (event) {
      // On-page links
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash),
          speed = $(this).data("speed") || 800;
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 90
          }, speed);
        }
      }
    });
  }

  @HostListener('scroll', ['$event'])
  scroll(e) {
    //  this.aPService.setActionPanel(this.aPData);
  }
}
