import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestOptions} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';

const httpOptions = new HttpHeaders()
  .append('Access-Control-Allow-Origin', '*')
  .append('Content-Type', 'application/json')
  .append('Accept', '*/*')
  .append('Cache-Control', 'no-cache')
  .append('cache-control', 'no-cache');

// const options = withCredentials: true });

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public endpoint = 'http://csc394.c-obrien.org:8080';

  public apicmd = '/api';

  constructor(public http: HttpClient, public commonService: CookieService) {
  }

  dataStore = null;
  matches = null;
  teams = null;
  auth = null;


  sports = [
    {id: 1, value: 'baseball'},
    {id: 2, value: 'basketball'},
    {id: 3, value: 'football'},
    {id: 4, value: 'hockey'},
    {id: 5, value: 'soccer'},
    {id: 6, value: 'volleyball'},
  ];

  matchForm: FormGroup = new FormGroup({
    start_time: new FormControl(null),
    duration_seconds: new FormControl(null),
    location: new FormControl(null),
    team_1_id: new FormControl(null, Validators.required),
    team_2_id: new FormControl(null, Validators.required),
    team_1_score: new FormControl(null, Validators.required),
    team_2_score: new FormControl(null, Validators.required),
    sport: new FormControl(null, Validators.required)
  });

  teamForm: FormGroup = new FormGroup({
    team_name: new FormControl(null, Validators.required)
  });

  loginForm: FormGroup = new FormGroup({
    user: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required)
  });

  logout() {
    const body = {};
    return this.http.post(`${this.endpoint}${this.apicmd}/logout`, body, {headers: httpOptions}).subscribe();
  }

  login(auth) {
    const body = {
      'username': auth.user,
      'password': auth.pass
    };
    console.log("trying");
    return this.http.post(`${this.endpoint}${this.apicmd}/login`, body, {withCredentials: true, headers: httpOptions}).subscribe((response: any) => {
      console.log(response);
      if (response.code === 200) {
        this.commonService.set('userAuthData', response.data);
        location.reload();
      } else {
        // Redirect to login page
      }
    });
  }

  register(auth) {
    const body = {
      'username': auth.user,
      'password': auth.pass
    };
    return this.http.post(`${this.endpoint}${this.apicmd}/register`, body, {headers: httpOptions}).subscribe();
  }

  deleteMatch(ID) {
    return this.http.delete(`${this.endpoint}${this.apicmd}/matches/${ID}`, {headers: httpOptions}).subscribe();
  }

  putMatch(ID, match) {
    this.deleteMatch(ID);
    return this.postMatch(match);
  }

  postTeam(team) {
    const body = {
      'team': {
        'team_name': team.team_name
      }
    };
    return this.http.post(`${this.endpoint}${this.apicmd}/teams`, body, {withCredentials: true, headers: httpOptions}).subscribe();
  }

  postMatch(match) {
    const body = {
      'match': {
        'team_1_id': +match.team_1_id,
        'team_2_id': +match.team_2_id,
        'team_1_score': +match.team_1_score,
        'team_2_score': +match.team_2_score,
        'details': {
          'sport': this.sports[match.sport - 1].value,
          'team_1': {},
          'team_2': {}
        }
      }
    };
    return this.http.post(`${this.endpoint}${this.apicmd}/matches`, body, {headers: httpOptions}).subscribe();
  }

  getMatches() {
    return this.http.get(`${this.endpoint}${this.apicmd}/matches`, {headers: httpOptions});
  }

  getMatch(ID) {
    return this.http.get(`${this.endpoint}${this.apicmd}/matches/{ID}`, {headers: httpOptions});
  }

  getTeams() {
    return this.http.get(`${this.endpoint}${this.apicmd}/teams`, {headers: httpOptions});
  }

  getTeam(ID) {
    return this.http.get(`${this.endpoint}${this.apicmd}/teams/{ID}`, {headers: httpOptions});
  }

  async updateDataStore() {
    await this.getTeams().toPromise().then((response: any) => {
      this.teams = JSON.parse(JSON.stringify(response)).teams;
    });
    await this.getMatches().toPromise().then((response: Response) => {
      this.matches = [];
      const resp: JSON[] = JSON.parse(JSON.stringify(response)).matches;
      let temp: JSON[];
      let details: JSON[];
      let i = resp.length - 1;
      while (i >= 0) {
        temp = JSON.parse(JSON.stringify(resp[i]));
        details = JSON.parse(JSON.stringify(resp[i])).details;
        for (let det in details) {
          const str = JSON.parse(JSON.stringify(det));
          let obj = '{' + det + ' : ' + details[det] + '}';
          temp[det] = JSON.parse(JSON.stringify(details[det]));
        }
        const team1ID = JSON.parse(JSON.stringify(temp)).team_1_id;
        const team2ID = JSON.parse(JSON.stringify(temp)).team_2_id;
        temp['team_1_name'] = this.teams[team1ID-1].team_name;
        temp['team_2_name'] = this.teams[team2ID-1].team_name;
        this.matches.push(temp);
        i--;
      }
    });
    this.dataStore = this.matches;
  }

  fillMatchForm(match) {
    this.matchForm.setValue({start_time: match.start_time,
      duration_seconds: match.duration_seconds,
      location: match.location,
      team_1_id: match.team_1_id,
      team_2_id: match.team_2_id,
      team_1_score: match.team_1_score,
      team_2_score: match.team_2_score,
      sport: match.sport});
  }
}
