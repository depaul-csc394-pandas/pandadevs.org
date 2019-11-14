import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource, MatPaginator, MatDialogRef} from '@angular/material';
import {DemoComponent} from '../demo/demo.component';
declare var $: any;

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CreateTeamComponent implements OnInit {

  sports = [
    {id: 1, value: 'Baseball'},
    {id: 2, value: 'Basketball'},
    {id: 3, value: 'Football'},
    {id: 4, value: 'Hockey'},
    {id: 5, value: 'Soccer'},
    {id: 6, value: 'Volleyball'},
  ];

  constructor(public api: ApiService, public dialogRef: MatDialogRef<DemoComponent>) { }

  ngOnInit() {
  }

  async submit() {
    if (this.api.teamForm.valid) {
      console.log(this.api.postTeam(this.api.teamForm.value));
      this.clear();
    }
  }

  clear() {
    this.api.teamForm.reset();
    this.dialogRef.close();
  }

}
