import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import { ToastrService } from 'ngx-toastr';

// import {LoginComponent} from './../../account/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog:MatDialog,public snackBar:MatSnackBar,
     public toaster: ToastrService) { }

  public showMessage(msg) {
    //  this.snackBar.open(msg, '', {
    //    duration: 2000,
    //    verticalPosition: 'top',
    //    horizontalPosition: 'right',
    //    panelClass: 'back-green'
    //  });
    this.toaster.show(msg,'',{
      timeOut:3000,
      closeButton:false,
      messageClass:'back-green',
      onActivateTick:false

    })
   
 }

 public showError(error) {
  //  this.snackBar.open(error, '', {
  //    duration: 50000,
  //    verticalPosition: 'top',
  //    horizontalPosition: 'right',
  //    panelClass: 'back-red'
  //  });
  this.toaster.show(error,'',{
    timeOut:3000,
    closeButton:false,
    messageClass:'back-green',
    onActivateTick:false

  })
 }

  
}
