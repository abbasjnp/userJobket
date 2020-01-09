import { Component, OnInit,Inject } from '@angular/core';
import {HomeService} from './../../home.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReferNowComponent} from './../../refer-now/refer-now.component'


@Component({
  selector: 'app-job-apply-success',
  templateUrl: './job-apply-success.component.html',
  styleUrls: ['./job-apply-success.component.scss']
})
export class JobApplySuccessComponent implements OnInit {
  public jobList;
  constructor(private homeService:HomeService,
    public dialogRefApplyJobSuccess: MatDialogRef<JobApplySuccessComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any,
             public dialog:MatDialog) { 
              //  console.log(data.id,"data id")
             }

  ngOnInit() {
    this.getPreferAbleJobs();
  }
  getPreferAbleJobs(){
    // console.log(this.data,"id data")
    this.homeService.getPreferableJobs(
      this.data.id,
      res=>{
       this.jobList = res.jobs;
      //  console.log( this.jobList,"get preferable jobs");
      },
      err=>{
         
      }
    )
  }
  referJob(job){
       //---------------- Go for the preferred job
       const dialogRef = this.dialog.open(ReferNowComponent, {
        width: '600px',
        height: '430px',
        data: { data: job}
      });
      this.dialogRefApplyJobSuccess.close();
  }
}
