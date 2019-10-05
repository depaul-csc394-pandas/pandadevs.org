import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiService} from '../../../services/api.service';
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

  public blocks: any = [];
  team_1; team_2; team_1_score; team_2_score; error = '';
  matches = null;
  response = JSON.parse('{ "matchID": "", "team1": "", "team2": "", "team1Score": "", "team2Score": "" }');

  public apiEndPoint = 'http://localhost:8080/api/matches';

  constructor(public http: HttpClient, public api: ApiService) {}


  ngOnInit() {
    this.refeshTable();
  }

  async submit() {
    this.error = '';
    await this.api.postMatch(this.team_1, this.team_2, this.team_1_score, this.team_2_score).toPromise().then((response: any) => {
      this.response = JSON.parse(JSON.stringify(response));
      this.refeshTable();
      return response;
    }, error => {
      this.error = 'Sorry, an error occurred.';
    });
  }

  async removeSelected(matchID) {
    this.error = '';
    await this.api.deleteMatch(matchID).toPromise().then((response: any) => {
      this.response = JSON.parse(JSON.stringify(response));
      this.refeshTable();
      return response;
    }, error => {
      this.error = 'Sorry, an error occurred.';
    });
  }

  async refeshTable() {
    this.error = '';
    await this.api.getMatches().toPromise().then((response: Response) => {
      this.matches = [];
      const resp: JSON[] = JSON.parse(JSON.stringify(response));
      console.log(resp);
      let i = resp.length - 1;
      while (i >= 0) {
        console.log(resp[i]);
        this.matches.push(resp[i]);
        i--;
      }
      return this.matches;
    }, error => {
      this.error = 'Sorry, an error occurred.';
    });
  }
}
