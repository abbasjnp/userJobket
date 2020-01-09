import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../shared/services/common.service';
import { DataService } from './../../../core/http/data.service';
import { environment } from './../../../../environments/environment';
import { WithdrawComponent } from './../../withdraw/withdraw.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServices } from './../../../core/auth/auth.service';
@Component({
  selector: 'app-my-point',
  templateUrl: './my-point.component.html',
  styleUrls: ['./my-point.component.scss']
})
export class MyPointComponent implements OnInit {
  private serviceUrl= environment.baseUrl+ 'authentication/';
  rewardsStatusData;
  total_gained_points;
  wallet_balance;
  totalPages;
  filterByStatus = ['All','pending','ongoing','selected','rejected'];
  status = '';
  page=1;
  baseUrl = environment.baseUrl + 'user/';
  constructor( private commonService: CommonService,
               private dataService: DataService,
               private authService: AuthServices,
               private dialog:MatDialog) { }

  ngOnInit() {
    this.getRewardsStatus();
  }

  openWithdrawDialog(){
  	   const dialogRef = this.dialog.open(WithdrawComponent,{
  	    	width: '500px',
  	    	data: {}
  	    });
  	    dialogRef.afterClosed().subscribe(res=>{
  	    });
  }

  logout() {
    this.dataService.get(this.serviceUrl + 'logout/').subscribe(
        (res: any) => {
            this.commonService.showMessage('You have successfully logged out.');
            this.authService.logout();
        },
        err => {
            this.commonService.showMessage(err.message);
            this.authService.logout();
        }
    );
}
  getRewardsStatus(){
    this.dataService.get(this.baseUrl + 'user-rewards/?page='+this.page+'&filter='+this.status).subscribe(
      (res: any) => {
        if(res.success){
        this.rewardsStatusData= res.user_rewards;
        this.total_gained_points = res.total_gained_points;
        this.wallet_balance = res.wallet_balance;
        this.totalPages = res.total_pages
        }
        else{
          this.rewardsStatusData=[];
          this.totalPages = 1;
        }
      },
      err => {
        this.commonService.showMessage(err.message);
      }
    );
  }
  pageChange(event){
    this.page = event;  
    this.getRewardsStatus();
  }
}
