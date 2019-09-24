import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public endpoint = 'https://cors-anywhere.herokuapp.com/http://veerp.dev:8080';
  public apicmd = '/api/matches';

  constructor(public http: HttpClient) {
  }

  setEndpoint(ep) {
    this.endpoint = ep;
  }

  deleteMatch(ID) {
    return this.http.get(`${this.endpoint}${this.apicmd}/delete?matchID=${ID}`, httpOptions);
  }

  putMatch( matchID, team1, team2, team1score, team2score) {
    return this.http.get(`${this.endpoint}${this.apicmd}/update?` +
      `matchID=${matchID}&team1=${team1}&team2=${team2}&team1score=${team1score}&team2score=${team2score}`,
      httpOptions);
  }

  postMatch( team1, team2, team1score, team2score) {
    return this.http.get(`${this.endpoint}${this.apicmd}/new?` +
      `team1=${team1}&team2=${team2}&team1score=${team1score}&team2score=${team2score}`,
      httpOptions);
  }

  getMatches() {
    return this.http.get(`${this.endpoint}${this.apicmd}`, httpOptions);
  }

  getMatch(ID) {
    return this.http.get(`${this.endpoint}${this.apicmd}/match?matchID=${ID}`, httpOptions);
  }
}
