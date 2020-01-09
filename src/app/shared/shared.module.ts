import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './../account/login/login.component';
import {SignUpComponent} from './../account/sign-up/sign-up.component'
import { AppMaterialModule } from '../app-material/app-material.module';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
//import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    declarations: [HeaderComponent, FooterComponent,EllipsisPipe, AlertDialogComponent],
  imports: [
    RouterModule,
    CommonModule,
    AppMaterialModule
    //MatExpansionModule
  ],
  exports:[
    HeaderComponent,FooterComponent,EllipsisPipe
  ],
  entryComponents: [
    LoginComponent,
    SignUpComponent,
    AlertDialogComponent
  ],
})
export class SharedModule { }
