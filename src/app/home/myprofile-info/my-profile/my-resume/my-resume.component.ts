import { Component, OnInit } from '@angular/core';
import { HomeService } from './../../../home.service'
import { CommonService } from './../../../../shared/services/common.service';
import { AuthServices } from './../../../../core/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService} from './../../../../core/http/data.service';
import { environment} from './../../../../../environments/environment';
import { Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss']
})
export class MyResumeComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private homeService: HomeService,
    private commonService: CommonService,
    private authService: AuthServices,
    private dataService: DataService
    ) {
  }
  searchSkillChanged = new Subject<string>();
  skillSubscription;
  skillList;
  getSkill;
  currentCompanyIndex: number;
  hideCurrentCompany: boolean;
  hideAllCurrCompanyQues = true;
  companyCheckBox;
  markCurrentCompany: boolean;
  addNewBlock: boolean;
  flagToNewBlock:boolean=false;

  hideRole:boolean=true;
  hideAchievement:boolean = true;
  ShowRole : boolean = false;
  show = true;

  private serviceUrl= environment.baseUrl+ 'authentication/';
  userResume = {
    skill: [],
    experience: [],
    education: [    ],
    certification: [
     
    ],
    award: [ ]
  };
 
  searchSkill = new FormControl();
  panelOpenState = false;


  ngOnInit() {
    this.fetchResumeData();

    this.searchSkill.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),

      ).subscribe(searchSkill => this.getLookups('skill', searchSkill));

  }
  ind;
  openToggle(index){
     this.ind = index;
  }

  onAchievement(){
    this.show = false;
  }
  getLookups(type, searchedString) {
    let options = {};
    options[type] = searchedString;
    let partialUrl = '';
    let lookupResponseType = '';

    if (type === 'skill') {
      partialUrl = 'skills';
      lookupResponseType = 'skills';

      this.homeService.fetchLookupList(
        partialUrl,
        { params: options },
        res => {
          // console.log(res[lookupResponseType],"userService fetchLookupList");
          this.skillList = res.skills;


        },
        err => {
          this.commonService.showError(err);
        }
      );
    }
  }
  fetchResumeData() {
    this.homeService.fetchResumeData(
      (res: any) => {
        this.userResume.experience = res.resume.experience;
        this.userResume.education = res.resume.education;
        this.userResume.skill = res.resume.skill;
        this.userResume.award = res.resume.award;
        this.userResume.certification = res.resume.certification;
        this.checkCurrentCompany();
      },
      err => {
        console.log(err, "error in getting Resume Data");
      }
    )
  }
  checkCurrentCompany() {
    this.userResume.experience.forEach(element => {
      if (element.is_current_company) {
        this.markCurrentCompany = true;
      }
      if(element.roles_and_responsibilities!=null){
        this.hideRole = false;
      }
    });
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  setIndex(index, event, value, id,name) {
    if(name=='experience'){
      this.userResume.experience[index].leave_month='';
      this.userResume.experience[index].leave_year = '';
    }
    if(name=='education'){
       this.userResume.education[index].end_month;
       this.userResume.education[index].end_year;
    }
    this.postResumeData();
  }
  addSkill() {
    if(this.userResume.skill==null){
      this.userResume.skill =[];
    }
    this.userResume.skill.push(this.getSkill);
    this.getSkill = '';
    this.postResumeData();
  }
  removeSkill(index) {
    this.userResume.skill.splice(index, 1);
    this.postResumeData();
  }

  getNewBlock(partialUrl) {
   
    this.homeService.getBlock(
      partialUrl,
      res => {
        this.fetchResumeData();
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteBlock(partialUrl, id) {
    this.homeService.deleteBlock(
      partialUrl,
      id,
      res => {
        this.fetchResumeData();
      },
      err => {
        console.log(err);
      }
    )
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

  postResumeData(){
        // console.log(JSON.stringify(this.userResume));
        if(this.userResume.skill==null){
          this.userResume.skill =[];
        }
        // console.log(JSON.stringify(this.userResume.award))
        let resumeObject ={
          resume:this.userResume
        }
        this.homeService.postResumeData(
          resumeObject,
          res=>{
          },
        err=>{
          console.log(err);
        }
        )
  }

  hidePanel(panel){
    if(panel=='hideRole')
    this.hideRole=false;
    this.ShowRole = true;
    if(panel=='hideAchievement'){
      this.hideAchievement = false;
    }
  }
  onKey(event){
    this.hideRole = true;
  }
  saveMessage(){
    this.commonService.showMessage('Resume updated Successfully')
  }
}
