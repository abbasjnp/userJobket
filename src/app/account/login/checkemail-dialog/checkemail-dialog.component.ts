import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AlertDialogComponent} from './../../../shared/alert-dialog/alert-dialog.component';
import {FormControl, Validators} from '@angular/forms'
import { SignupdoneDialogComponent } from '../../signupdone-dialog/signupdone-dialog.component';
import { OtherService } from '../../other.service';



@Component({
  selector: 'app-checkemail-dialog',
  templateUrl: './checkemail-dialog.component.html',
  styleUrls: ['./checkemail-dialog.component.scss'],
})
export class CheckemailDialogComponent implements OnInit {
  constructor(public dialogRefs: MatDialogRef<AlertDialogComponent>,
    public dialogRef: MatDialogRef<SignupdoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private otherService:OtherService,
  ) { 
     
    }
  re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  email = new FormControl('',[Validators.required,Validators.email,Validators.pattern(this.re)])
  resMessage;
  ngOnInit() {
    
  }

  closeDialog() {
    // this. alertDialog();
    this.dialogRefs.close();
  }

  // alertDialog(){
    
  //   const dialogRefs = this.dialog.open(AlertDialogComponent, {
  //     width: '0px',
  //     height: '0px', 
  //     position: {
  //       top: '0px'   
  //     },
  //     data: { type: 'alertdialog' }   
  //   });
  //   dialogRefs.afterClosed().subscribe(result => {
  //     if(result=='confirm')
  //     this.dialogRefs.close();
  //   });
  // }

  closeDialog1(){
    this.dialogRefs.close();
  }

  confirm(){
    
  }
  signupdone(){
    this.otherService.sendEmail(
      {'email':this.email.value},
      (res:any)=>{
         if(res.success){
           this.dialogRef.close(this.email.value);
         }  
         else{
      //  this.commonService.showError(res.message);
       this.resMessage = res.message;
      //  console.log(this.resMessage,"resMessage")
         } 
      },
      err=>{
        console.log(err.message);
      }
    )
  }

}
