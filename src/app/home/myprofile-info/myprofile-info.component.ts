import { Component, OnInit } from '@angular/core';
import { WithdrawComponent } from '../withdraw/withdraw.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyStatusComponent } from './my-status/my-status.component';
import { MyPointComponent } from './my-point/my-point.component';

export interface DialogData {
  // animal: string;
  // name: string;
}

@Component({
  selector: 'app-myprofile-info',
  templateUrl: './myprofile-info.component.html',
  styleUrls: ['./myprofile-info.component.scss']
})
export class MyprofileInfoComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  withDialog(){
    const dialogRef = this.dialog.open(WithdrawComponent, {
      width: '600px',
      height:'430px',      
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });

  }

  ngOnInit() {
    
  }

}
