import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import {SubmitMatchComponent} from '../submit-match/submit-match.component';
import {CreateTeamComponent} from '../create-team/create-team.component';

declare var $: any;

interface APIResponse {
  result: string;
  msg: string;
}


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DemoComponent implements OnInit {

  listData: MatTableDataSource<any>;
  matches = null;
  teams = null;
  searchKey: string;

  displayedColumns: string[] = ['sport', 'team_1', 'team_1_score', 'team_2', 'team_2_score', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public api: ApiService,
              public dialog: MatDialog) {}

  async ngOnInit() {
    await this.api.updateDataStore();
    console.log(this.api.dataStore);
    this.listData = new MatTableDataSource(this.api.dataStore);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }

  async updateTeams() {
    await this.api.getTeams().toPromise().then((response: any) => {
      this.teams = JSON.parse(JSON.stringify(response)).teams;
      return response;
    });
  }

  async removeSelected(matchID) {
    console.log(this.api.deleteMatch(matchID));
    await this.refeshTable();
  }

  async refeshTable() {
    await this.api.getMatches().toPromise().then((response: Response) => {
      this.matches = [];
      const resp: JSON[] = JSON.parse(JSON.stringify(response)).matches;
      let temp: JSON;
      let i = resp.length - 1;
      while (i >= 0) {
        temp = resp[i];
        this.matches.push(temp);
        i--;
      }
      this.api.updateDataStore();
      console.log(this.api.dataStore);
      return this.matches;
    });
    this.matches = this.api.dataStore;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateMatch() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(SubmitMatchComponent, dialogConfig);
  }
  onEditMatch(match) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(SubmitMatchComponent, dialogConfig);
    this.api.fillMatchForm(match);
  }
  onCreateTeam() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(CreateTeamComponent, dialogConfig);
  }
}
