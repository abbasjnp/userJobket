import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,  
  FacebookLoginProvider,
  LinkedInLoginProvider
} from "angularx-social-login";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LinkdinLoginComponent } from './linkdin-login/linkdin-login.component';
import {ErrorComponent} from './../home/error/error.component';
import { CheckemailDialogComponent } from './login/checkemail-dialog/checkemail-dialog.component';
import { SignupdoneDialogComponent } from './signupdone-dialog/signupdone-dialog.component';
import { HomeModule } from '../home/home.module';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [ 
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("855959408118366")  // Created using emialId for running Online 
          // provider: new FacebookLoginProvider("411809446314279")  //Created using emialId for Development
          // provider: new FacebookLoginProvider("446008542699223")  // Created using mobile number for Development
          // provider: new FacebookLoginProvider("574193883328093")  // Created using innotical@247 for Development

        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          
          //  provider: new GoogleLoginProvider("19961344904-juuho0u3rnmadmibbf7na8bvg8pke2rf.apps.googleusercontent.com")    //Local Google Id
          provider: new GoogleLoginProvider("362844642967-8g5cqrta8hrbfrrq5n063a62tm5mu7t0.apps.googleusercontent.com")   

        },
        {
          id: LinkedInLoginProvider.PROVIDER_ID,
          provider: new LinkedInLoginProvider("81afxvmmxkjynz")
        },
      ]
  );
  return config;
}

const routerAccount:Routes=[
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {path:'email-verification',component:EmailVerificationComponent},
      {path:'email-verification/:key',component:EmailVerificationComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'reset-password',component:ResetPasswordComponent},
      { path: 'login/auth/linkedin', component:LinkdinLoginComponent},
      // {path:'**',component:ErrorComponent},
      {path:'404',component:ErrorComponent},
      {path: '**', redirectTo: '/404'}
    ] 
  },
];

@NgModule({
  declarations: [AccountComponent, LoginComponent, SignUpComponent, EmailVerificationComponent, ForgotPasswordComponent, ResetPasswordComponent, LinkdinLoginComponent, CheckemailDialogComponent, SignupdoneDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routerAccount),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    
  ],
  entryComponents: [
    CheckemailDialogComponent,
    SignupdoneDialogComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }]
})
export class AccountModule { }
