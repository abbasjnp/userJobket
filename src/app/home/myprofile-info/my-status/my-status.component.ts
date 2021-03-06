import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../shared/services/common.service';
import { DataService } from './../../../core/http/data.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-my-status',
  templateUrl: './my-status.component.html',
  styleUrls: ['./my-status.component.scss']
})
export class MyStatusComponent implements OnInit {

  applyStatusData;
  jobApplied;
  onGoingProcess;
  finalPass;
  totalPages;
  filterByStatus = ['All','pending','ongoing','selected','rejected'];
  status = '';
  page=1;
  noData = false;
  ref_noData = false;
  ref_applyStatusData;
  ref_jobApplied;
  ref_onGoingProcess;
  ref_finalPass;
  ref_totalPages;
  ref_status = '';
  ref_page=1;
  baseUrl = environment.baseUrl + 'user/';
  constructor( private commonService: CommonService,
    private dataService: DataService) { }

  ngOnInit() {
    this.getApplyStatus();
    this.getReferralStatus();
  }

  getApplyStatus(){
    this.dataService.get(this.baseUrl + 'user-applied-jobs/?page='+this.page+'&filter='+this.status).subscribe(
      (res: any) => {
        if(res.success){
        this.applyStatusData= res.jobs;
        this.jobApplied = res.total_applied_jobs;
        this.onGoingProcess = res.total_ongoing;
        this.finalPass = res.total_selected;
        this.totalPages = res.total_pages
        this.noData = false;
        }
        else{
          this.noData = true;
          this.applyStatusData=[];
          this.totalPages = 1;
        }
      },
      err => {
        this.commonService.showMessage(err.message);
      }
    );
  }
  getReferralStatus(){
    this.dataService.get(this.baseUrl + 'user-referral/?page='+this.ref_page+'&filter='+this.ref_status).subscribe(
      (res: any) => {
        if(res.success){
        this.ref_applyStatusData= res.jobs;
        this.ref_jobApplied = res.total_applied_jobs;
        this.ref_onGoingProcess = res.total_ongoing;
        this.ref_finalPass = res.total_selected;
        this.ref_totalPages = res.total_pages
        this.ref_noData = false;
        }
        else{
          this.ref_noData = true;
          this.ref_applyStatusData=[];
          this.ref_totalPages = 1;
        }
      },
      err => {
        this.commonService.showMessage(err.message);
      }
    );
  }

  pageChange(event){
    this.page = event;  
    this.getApplyStatus();
  }
  ref_pageChange(event){
    this.ref_page = event;
    this.getReferralStatus();
  }

  filterData(event){
    this.status = event.target.value;
     if(event.target.value == 'All'){
       this.status = '';
    }
    this.getApplyStatus();
  }
  ref_filterData(event){
    this.ref_status = event.target.value;
    if(event.target.value == 'All'){
       this.ref_status = '';
    }
    this.getReferralStatus();
  }
}
