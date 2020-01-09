import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HomeService } from './../../home.service';
import { CommonService } from './../../../shared/services/common.service';
import { DatePipe } from '@angular/common'
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from './../../../../environments/environment';
import { DataService } from './../../../core/http/data.service';
import { AuthServices } from './../../../core/auth/auth.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],

})
export class MyProfileComponent implements OnInit {

    constructor(private homeService: HomeService,
        private commonService: CommonService, private dataService: DataService, public authService: AuthServices) { }
    userProfileData;
    baseUrl = environment.baseUrl;
    serviceUrl = environment.baseUrl + 'authentication/';
    public profile_pic: any = {
        file: '',
        url: ''
    };
    // color = 'ThemePalette';
    mode = 'determinate';
    value = '';
    bufferValue = 100;
    userRefferalCode;
    ngOnInit() {
        this.fetchProfileData();
        this.userRefferalCode = localStorage.getItem('my_referral_code')

    }

    fetchProfileData() {
        this.homeService.getUserProfileData(
            (res: any) => {
                this.userProfileData = res.user_data;
                this.value = res.user_data.resume_strength;
                // console.log(this.userProfileData, "userData");
            },
            err => {
                console.log(err, "error")
            }
        )
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

    uploadProfilePic() {
        const formData: FormData = new FormData();
        formData.append('image', this.profile_pic.file);
        this.homeService.uploadProfilePic(
            formData,
            res => {
                this.commonService.showMessage(res.message);
            },
            err => {
              console.log(err,"error");
            }
        );
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

    getWidth() {
        return this.userProfileData.resume_strength;
    }
    copyLinkToClipboard() {
        // this.countHits('copylink');
          var copyText = (document.getElementById('myInput') as HTMLInputElement).select();
          document.execCommand("copy");
          this.commonService.showMessage("Referral Code Copied to Clipboard");
      
       
      }
}