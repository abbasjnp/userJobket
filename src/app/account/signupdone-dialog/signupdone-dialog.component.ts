import { Component, OnInit,Inject,OnDestroy } from '@angular/core';
import {AccountService} from './../account.service';
import { DataService } from './../../core/http/data.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-signupdone-dialog',
  templateUrl: './signupdone-dialog.component.html',
  styleUrls: ['./signupdone-dialog.component.scss']
})
export class SignupdoneDialogComponent implements OnInit,OnDestroy {
  job_id;
  constructor(private http:HttpClient,
   // private accountService:AccountService,
    private dataService: DataService,
    private activateRout: ActivatedRoute,
    public dialogRef: MatDialogRef<SignupdoneDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data) { 
        //  this.job_id = this.activateRout.snapshot.paramMap.get('id');
         console.log("job id-->",data.job_id);

    }

  url = environment.baseUrl+'user/user-preference/';
  checked: boolean = true;
  uniqueLocations = [];
  // selectedPreferences = [];
  selectedPreferrece;
  isClicked: boolean;
  funtionalPreferrecne = [
    { name: 'Software Engineering', isClicked: false },
    { name: 'Marketing', isClicked: false },
    { name: 'Sales', isClicked: false },
    { name: 'Creative', isClicked: false },
    { name: ' Business', isClicked: false },
    { name: 'Finance & Administration', isClicked: false },
    { name: 'HR', isClicked: false },
    { name: 'Others', isClicked: false },
  ]
  locations = [
    { location: 'International', isClicked: false },
    { location: 'Delhi', isClicked: false },
    { location: 'Gurgaon', isClicked: false },
    { location: 'Noida', isClicked: false },
    { location: 'Bangalore', isClicked: false },
    { location: 'Mumbai', isClicked: false },
  ]

  // /user/user-preference/?job_id=JOB5329324

  ngOnInit() {
    // console.log("job id [[[[[[[",localStorage.getItem('jobId'));
    this.dataService.get(this.url+'?job_id='+localStorage.getItem('jobId')).subscribe(
      (res:any)=>{
        let cat=res.category;
       
        if(cat!=null){
        //  if(this.funtionalPreferrecne.indexOf(cat)!=-1){
          this.funtionalPreferrecne.forEach(element => {
             if(element.name==cat)
            element.isClicked = true;
            this.selectedPreferrece = cat;
          });
        //  }
        }
      })
  }


  getLocation(location, index) {
   
    if (this.uniqueLocations.indexOf(this.locations[index].location) === -1) {
      if (this.uniqueLocations.length != 3) {
        this.uniqueLocations.push(location);
        this.locations.forEach(element => {
          if (location == element.location)
            element.isClicked = true;
        });
      }

    } else {
      this.uniqueLocations.splice(this.uniqueLocations.indexOf(this.locations[index].location), 1);
      this.locations[index].isClicked = false;
    }
    console.log(this.uniqueLocations);
  }
  
  ngOnDestroy(){
    this.dialogRef.close();
    this.submit();
    console.log("ngOndestroy");
  }

  selectPreferrences(preferrence, index) {
    if(preferrence==this.selectedPreferrece){
      this.selectedPreferrece ='';
    this.funtionalPreferrecne[index].isClicked = false;
    console.log(this.selectedPreferrece,"seleced preferrence");

    return;
    }
    this.selectedPreferrece = preferrence;
    console.log(this.selectedPreferrece,"seleced preferrence");

    this.funtionalPreferrecne.forEach(element => {
      element.isClicked = false;
    });
    this.funtionalPreferrecne[index].isClicked = true;
  }

  submit() {
    // console.log(localStorage.getItem('jobId'), " job id submit");
    let data ={
      "category":this.selectedPreferrece,
	    "location":this.uniqueLocations.toString(),
    	"promotional_mail":this.checked
    }
    console.log("signup done data-->",data);
    console.log("signup url-->",this.url);
    if(this.job_id)
    var jobId = this.data.jobId;
    this.dataService.post(`${this.url}?job_id=${localStorage.getItem('jobId')}`,data).subscribe(
      (res:any)=>{
        console.log("response",res);
        if(res.success){
          this.dialogRef.close();
        }
      },
      (err)=>{
        console.log("error",err);
      }
    )
  }

}
