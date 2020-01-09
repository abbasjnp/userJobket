import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HomeService } from './../../../home.service'
import { CommonService } from './../.../../../../../shared/services/common.service'
import { DatePipe } from '@angular/common'
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from './../../../../../environments/environment'
import { DataService} from './../../../../core/http/data.service';
import { AuthServices } from './../../../../core/auth/auth.service';
// import * as moment from 'moment';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}; 

@Component({
  selector: 'app-my-personal-info',
  templateUrl: './my-personal-info.component.html',
  styleUrls: ['./my-personal-info.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MyPersonalInfoComponent implements OnInit {
  referalcode = 'JIAE001';
  userProfileForm: FormGroup;
  constructor(private fb: FormBuilder,
    private homeService: HomeService,
    private commonService: CommonService,
    private authService: AuthServices,
    private dataService: DataService,
    ) { }
  gender: Array<Object>
  userProfileData = {
    // image:'',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    firstContact: '',
    secondContact: '',
    location: '',
    profile_pic:'',
    resume_strength:''
  };
  selectedGender: Object;
  locationLookup = [];
  locationText;
  locations;
  location = new FormControl([Validators.required]);
  // ---------- Declared Variables for Profile Pic upload

  public profile_pic: any = {
    file: '',
    url: ''
  };
  baseUrl = environment.baseUrl;
  serviceUrl = environment.baseUrl + 'authentication/';
  // ---------- Declared Variables for Profile strength
  // color = 'ThemePalette';
  mode = 'determinate';
  value = '';
  bufferValue = 100;
  userRefferalCode

  ngOnInit() {
    this.userRefferalCode = localStorage.getItem('my_referral_code')
    // this._adapter.setLocale('fr');
    this.userProfileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstContact: ['', [Validators.required]],
      secondContact: [''],
      location: ['', [Validators.required]]
    })

    this.location.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        //  switchMap(query=>this.getDesignationList(query))
      )
      .subscribe(location => this.getLocation(location));
       this.fetchProfileData();
  }

  getLocation(location) {
    this.homeService.getLocationList(
      location,
      res => {
        this.locations = res.locations;
      },
      err => {

      }
    )
  }

  fetchProfileData() {
    this.homeService.getUserProfileData(
      (res: any) => {
        this.userProfileData = res.user_data;
        // this.profile_pic.url = res.user_data.profile_pic;
        this.value = res.user_data.resume_strength;
        
        setTimeout(() => {
          this.setValuesInForm(res.user_data);
        }, 100);

      },
      err => {
        console.log(err, "error")
      }
    )
  }

  setValuesInForm(userData: any) {
    this.userProfileForm.setValue({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      // date_of_birth: moment(userData.date_of_birth,this.dateFormatString).format(),
      date_of_birth: moment(this.getFormattedDate(userData.date_of_birth)),
      gender: userData.gender,
      location: userData.location,
      firstContact: userData.contact_number1,
      secondContact: userData.contact_number2
    })
    // console.log(userData.date_of_birth);
    if (userData.gender!=null) {

      if (userData.gender == 'MALE') {
        this.gender = [
          { name: 'SELECT GENDER', value: '' },
          { name: userData.gender, value: 'M' },
          { name: 'FEMALE', value: 'F' }
        ]
        this.selectedGender = this.gender[1];
      }
      if (userData.gender == 'FEMALE') {
        this.gender = [
          { name: 'SELECT GENDER', value: '' },
          { name: 'MALE', value: 'M' },
          { name: userData.gender, value: 'F' }
        ]
        this.selectedGender = this.gender[2];
      }


    }
    else if(userData.gender==null) {
      this.gender = [
        { name: 'SELECT GENDER', value: '' },
        { name: 'Male', value: 'M' },
        { name: 'Female', value: 'F' }
      ]
      this.selectedGender = this.gender[0];
    }
  }
  getFormattedDate(inputDate){
    if(inputDate==null){
      return;
    }
    var str = inputDate.split('-');
    var d = parseInt(str[0]); var m = parseInt(str[1]); var y = parseInt(str[2]);
    var dateStr = [y, m, d].join('-');
  //  console.log(dateStr.toString());
    return dateStr;
    // console.log(str,"Date String");
  }

  calcDate(input) {
    if (input == null) {
      return null;
    }
    var str = input.split('-');
    var d = parseInt(str[0]); var m = parseInt(str[1]); var y = parseInt(str[2]);
    var date1 = new Date(d,m-1,y);
    return date1;
  }

  submitProfile() {
    let dateInString = this.formatDate(this.userProfileForm.value.date_of_birth);
    const userProfile = {
      first_name: this.userProfileForm.value.first_name,
      middle_name: this.userProfileForm.value.middle_name,
      last_name: this.userProfileForm.value.last_name,
      dob: dateInString,
      gender: this.userProfileForm.value.gender.value,
      // email: this.userProfileForm.value.email,
      contact_number1: this.userProfileForm.value.firstContact,
      contact_number2: this.userProfileForm.value.secondContact,
      location: this.locationText
    };

    this.homeService.setUserProfileData(
      userProfile,
      res => {
        this.commonService.showMessage(res.message);
      },
      err => {

        this.commonService.showError(err.message);
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
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
  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const uploadedfile = event.target.files[0];
      this.profile_pic = {
        name: uploadedfile.name,
        size: uploadedfile.size,
        progress: 0,
        uploadedDate: new Date(),
        file: uploadedfile
      };
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.profile_pic.url = reader.result;
      };
      this.uploadProfilePic();
    }
  }
  copyLinkToClipboard() {
    // this.countHits('copylink');
      var copyText = (document.getElementById('myInput') as HTMLInputElement).select();
      document.execCommand("copy");
      this.commonService.showMessage("Referral Code Copied to Clipboard");
  }

  uploadProfilePic() {
    const formData: FormData = new FormData();
    formData.append('image', this.profile_pic.file);
    this.homeService.uploadProfilePic(
      formData,
      res => {
        this.commonService.showMessage(res.message);
      },
      err => {

      }
    );
  }
}
