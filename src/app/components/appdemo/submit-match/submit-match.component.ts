import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource, MatPaginator, MatDialogRef} from '@angular/material';
import {DemoComponent} from '../demo/demo.component';

declare var $: any;

@Component({
  selector: 'app-submit-match',
  templateUrl: './submit-match.component.html',
  styleUrls: ['./submit-match.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubmitMatchComponent implements OnInit {
  public teams;

  constructor(public api: ApiService, public dialogRef: MatDialogRef<DemoComponent>) {
  }

  ngOnInit() {
    this.updateTeams();
  }

  async updateTeams() {
    await this.api.getTeams().toPromise().then((response: any) => {
      this.teams = JSON.parse(JSON.stringify(response)).teams;
      return response;
    });
  }

  async submit() {
    if (this.api.matchForm.valid) {
      console.log(this.api.postMatch(this.api.matchForm.value));
      this.clear();
    }
  }

  clear() {
    this.api.matchForm.reset();
    this.dialogRef.close();
  }
}
