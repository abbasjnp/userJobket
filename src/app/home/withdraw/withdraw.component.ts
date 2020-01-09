import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from './../myprofile-info/myprofile-info.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from './../../../environments/environment';
import {HomeService} from './../home.service';
import { CommonService } from './../../shared/services/common.service';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
   withdrawForm:FormGroup;
   withdraw_success:boolean = false;
   baseUrl = environment.baseUrl + 'user/';
  constructor(public dialogRef: MatDialogRef<WithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formBuilder: FormBuilder,
    private homeService: HomeService,
    private commonService: CommonService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(){
      // console.log("form value", this.withdrawForm.value.withdraw_amount);
      let withdrawData = {
           'amount': this.withdrawForm.value.withdraw_amount,
           'mobile': this.withdrawForm.value.paytm_number
      }
      // console.log("data",withdrawData);
      this.homeService.withdrawAmount(
         withdrawData,
         res =>{
            //  console.log("withdraw res", res);
              if (res.success) {
                this.withdraw_success = true;
               // this.commonService.showMessage(res.message);
               //
               setTimeout(()=>{
                  this.dialogRef.close();
               },2000);
               }
             else {
               this.commonService.showError(res.message);
               this.withdraw_success = false;
               this.dialogRef.close();
              }
         },
         err =>{
          this.commonService.showError(err.message);
          //this.dialogRef.close();
         }
        );
      /* console.log("withdraw amount", this.withdraw_amount);
       console.log("paytm number", this.paytm_number);*/
     }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
         withdraw_amount: ['',Validators.required],
         paytm_number: ['',Validators.required]
    });
  }
  get paytm_number() { 
    return this.withdrawForm.get('paytm_number'); 
  }
  get withdraw_amount() { 
    return this.withdrawForm.get('withdraw_amount'); 
  }
  dialogClose(){
    this.dialogRef.close();
  }

}
