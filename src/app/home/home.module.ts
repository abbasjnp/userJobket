import { NgModule } from '@angular/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './home-page/home-page.component';
import {Routes, RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';
import { ApplyJobComponent } from './apply-job/job/apply-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { ReferNowComponent } from './refer-now/refer-now.component';
import { MyStatusComponent } from './myprofile-info/my-status/my-status.component';
import { MyPointComponent } from './myprofile-info/my-point/my-point.component';
import { MyProfileComponent } from './myprofile-info/my-profile/my-profile.component';
import { MyprofileInfoComponent } from './myprofile-info/myprofile-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyPersonalInfoComponent } from './myprofile-info/my-profile/my-personal-info/my-personal-info.component';
import { MyResumeComponent } from './myprofile-info/my-profile/my-resume/my-resume.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ReferralComponent } from './referral/referral.component';
import { FaqComponent } from './faq/faq.component';
import { ApplyStatusComponent } from './myprofile-info/my-status/apply-status/apply-status.component';
import { ReferalStatusComponent } from './myprofile-info/my-status/referal-status/referal-status.component';
import { ErrorComponent } from './error/error.component';
import { AdditionalInformationComponent } from './apply-job/additional-information/additional-information.component';
import { JobComponent } from './apply-job/job.component';
import {AccountModule} from './../account/account.module';
import { FilterComponent } from './filter/filter.component';
import { Ng5SliderModule } from 'ng5-slider';
import { OwlModule } from 'ngx-owl-carousel';
import { JobApplySuccessComponent } from './apply-job/job-apply-success/job-apply-success.component';
import {MatButtonModule,MatTooltipModule} from '@angular/material';
import { InternationalJobsComponent } from './international-jobs/international-jobs.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxJsonLdModule } from 'ngx-json-ld';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:   [
      { path: '', component: HomePageComponent },
      { path: 'home-page', component: HomePageComponent },
      // { path: 'search-jobs', component:SearchJobsComponent },

     
      { path: 'filter', component:FilterComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'International-Jobs', component:InternationalJobsComponent },
     
      // { path: 'job-detail/:id/:referral_code/:title',component:JobDetailComponent},
      { path: 'job-detail/:id/:title/',component:JobDetailComponent},

      { path: 'apply-job', component: ApplyJobComponent },
      { path: 'refer-now', component:ReferNowComponent },
      { path: 'myprofile-info', component:MyprofileInfoComponent,
        children:[
          {path:'profile',component:MyProfileComponent,
            children:[              
              {path:'resume',component:MyResumeComponent},
              {path:'',redirectTo:'personal',pathMatch:'full'},
              {path:'personal',component:MyPersonalInfoComponent},
        ]},
        {path:'',redirectTo:'profile',pathMatch:'full'},
        {path:'my-status',component:MyStatusComponent,
            children:[              
              {path:'apply-status',component:ApplyStatusComponent},
              {path:'',redirectTo:'apply-status',pathMatch:'full'},
              {path:'referal-status',component:ReferalStatusComponent},
        ]},
        {path:'my-point',component:MyPointComponent}
        ]
       },
      { path: 'about-us', component:AboutUsComponent },
      { path: 'withdraw', component:WithdrawComponent },
      { path: 'change-password', component:ChangePasswordComponent },
      // { path: 'view-job', component:ViewMyProfileComponent },
      // { path: 'view-job/:id', component:ViewMyProfileComponent },
      // { path: 'view-job/:id/:referral_code', component:ViewMyProfileComponent },
      // { path: 'my-status', component:MyStatusComponent },
      { path: 'faq', component:FaqComponent },
      { path: 'referral', component:ReferralComponent },
      {path:'terms-conditions',component:TermsConditionsComponent},
       {path:'privacy-policy',component:PrivacyPolicyComponent},
      {path:'disclaimer',component:DisclaimerComponent},
      { path: 'search', component:SearchJobsComponent },

      { path: ':categorytitle/:title/:location/:id', component: JobDetailComponent },

      { path: ':categorytitle/:subcategorytitle/:title/:location/:id', component: JobDetailComponent },

      { path: ':categorytitle', component:SearchJobsComponent },
      { path: ':categorytitle/:subcategorytitle', component:SearchJobsComponent },

      // {path:'**',component:ErrorComponent},
      {path:'404',component:ErrorComponent},
      {path: '**', redirectTo: '/404'},
     

    ]
  },
];

@NgModule({
  declarations: [
       HomeComponent, 
       HomePageComponent, 
       SearchJobsComponent,
       ContactUsComponent,
       ApplyJobComponent, 
       JobDetailComponent,
       ReferNowComponent,
       MyprofileInfoComponent,
       WithdrawComponent,
       ChangePasswordComponent,
       MyStatusComponent,
       MyPointComponent,
       MyProfileComponent,
       MyPersonalInfoComponent,
       MyResumeComponent,
       AboutUsComponent,
       DisclaimerComponent,
       PrivacyPolicyComponent,
       TermsConditionsComponent,
       ReferralComponent,
       FaqComponent,
       ApplyStatusComponent,
       ReferalStatusComponent,
       ErrorComponent,
       AdditionalInformationComponent,
       JobComponent,
       FilterComponent,
       JobApplySuccessComponent,
       InternationalJobsComponent
       ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AccountModule,
    AppMaterialModule,
    DeviceDetectorModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaLbF_O16W2P8MU_8njS0YYFyitcOcjIw'
    }),
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    Ng5SliderModule,
    OwlModule,
    MatButtonModule,MatTooltipModule,
    NgxJsonLdModule
    // CarouselModule
   
  ],
  // exports:[ReferNowComponent],
  entryComponents:[AdditionalInformationComponent, JobApplySuccessComponent]
})
export class HomeModule { }
