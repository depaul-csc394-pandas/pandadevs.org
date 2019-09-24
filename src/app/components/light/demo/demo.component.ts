import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
declare var $: any;

interface APIResponse {
  result: string;
  msg: string;
}


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  team_1; team_2; team_1_score; team_2_score; error = ''; response;

  public apiEndPoint = 'http://pandadevs.org:8080/api/matches?';

  constructor(public http: HttpClient) {}


  ngOnInit() {
  }

  submit() {
    this.error = '';
    const params = new HttpParams().set('team1', this.team_1).set('team2', this.team_2).set('team1score', this.team_1_score).set('team2score', this.team_2_score);
    const apiURL = this.apiEndPoint + params.toString();
    console.log(apiURL);
    this.http.post(apiURL, '').subscribe(response => {
      this.response = response;
      return response;
    }, error => {
      this.error = 'Sorry, an MailChimp error occurred.';
    });
  }
}
