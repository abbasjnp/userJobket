import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DialogData } from './../search-jobs/search-jobs.component';
import { Options, LabelType } from 'ng5-slider';
import { Location } from '@angular/common'
import { Router, Params, ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  data1;
  $: any;
  exp = [];
  minSalary: number;
  maxSalary: number;
  uniqueLocations = [];
  minValue: number = 0;
  maxValue: number = 45;
  jobTitle;
  subCategoryTitle;
  params;
  minExp = [];
  maxExp = [];
  options: Options = {
    floor: 0,
    ceil: 45,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minSalary = value;
        
        case LabelType.High:
          this.maxSalary = value;
       

        default:
          return '$' + value;
      }
    }
  }; 
  experience = [
    { expName: 'Fresher', minExp: 0, maxExp: 1, isClicked: false, count: 0 },
    { expName: 'Junior', minExp: 1, maxExp: 3, isClicked: false, count: 0 },
    { expName: 'Mid', minExp: 3, maxExp: 5, isClicked: false, count: 0 },
    { expName: 'Senior', minExp: 5, maxExp: 8, isClicked: false, count: 0 },
    { expName: 'Director', minExp: 8, maxExp: 100, isClicked: false, count: 0 },
  ]
  expArray =['Fresher','Junior','Mid','Senior','Director'];
  locations = [
    { location: 'International', isClicked: false },
    { location: 'Delhi', isClicked: false },
    { location: 'Gurgaon', isClicked: false },
    { location: 'Noida', isClicked: false },
    { location: 'Bangalore', isClicked: false },
    { location: 'Mumbai', isClicked: false },
  ]
  getLocations: Array<string> = [];
  activeButton: boolean;
  skills;
  constructor(public dialogRef: MatDialogRef<FilterComponent>,
    public locationRout: Location,
    public router: Router,
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    if (this.data.filteredData) {
       console.log(this.data,"filData");
      
      if (this.data.skills) {
        // let skill = this.data.skills.split(',').join('-');
        // console.log(skill);
        this.skills = this.data.skills.split(',').join('-');
        this.skills = this.data.skills.split(' ').join('--');
        this.skills =`${this.skills}-jobs`


      }
      // console.log(this.data.filteredData.minSalary,"min");
      // console.log(this.data.filteredData.maxSalary,"max");
      // console.log(this.data.filteredData.locations,"loc");      
      if (this.data.filteredData.locations) {
        this.locations.forEach(element => {
          this.data.filteredData.locations.forEach(filteredLocation => {
            if (element.location == filteredLocation) {
              element.isClicked = true;
              this.uniqueLocations.push(filteredLocation);
            }
          });
        });
      }
      this.experience.forEach(element => {
        this.data.filteredData.minExp.forEach(filteredMinExp => {
          if (element.minExp == filteredMinExp) {
            element.isClicked = true;
            this.minExp.push(filteredMinExp);

          }
        });
      });
      this.experience.forEach(element => {
        this.data.filteredData.maxExp.forEach(filteredMaxExp => {
          if (element.maxExp == filteredMaxExp) {
            this.maxExp.push(filteredMaxExp);

          }
        });
      });
      if (this.data.filteredData.minSalary != null && this.data.filteredData.maxSalary != null) {
        this.minValue = this.data.filteredData.minSalary / 100000;
        this.maxValue = this.data.filteredData.maxSalary / 100000;
      }
      // console.log(this.minValue,"min");
      // console.log(this.maxValue,"max");
    }

  }
  getLocation(location, index) {
    if (this.uniqueLocations.indexOf(this.locations[index].location) === -1) {
      this.uniqueLocations.push(location);
    } else {
      this.uniqueLocations.splice(this.uniqueLocations.indexOf(this.locations[index].location), 1);
    }
  }

  getExperince(experience, index) {
    if (this.minExp.indexOf(this.experience[index].minExp) === -1) {
      this.minExp.push(experience.minExp);
    } else {
      this.minExp.splice(this.minExp.indexOf(this.experience[index].minExp), 1);
    }

    if (this.maxExp.indexOf(this.experience[index].maxExp) === -1) {
      this.maxExp.push(experience.maxExp);
    } else {
      this.maxExp.splice(this.maxExp.indexOf(this.experience[index].maxExp), 1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyFilter() {
    let category;
    let subCategory;
    if (this.minSalary == this.maxSalary) {
      this.minSalary = this.minValue;
      this.maxSalary = this.maxValue;
    }

    let datah = {
      minSalary: this.minSalary * 100000,
      maxSalary: this.maxSalary * 100000,
      locations: this.uniqueLocations,
      minExp: this.minExp,
      maxExp: this.maxExp
    };

    let stringdemo = '';
    datah.locations.forEach(function (item) {             //Creating the string of locations to be filtered
      stringdemo = stringdemo + `${item}-`
    });
    stringdemo = stringdemo.replace(/-([^-]*)$/, '$1');   //For Removing the last Hiphen
    let inn = '';
    if (stringdemo) {
      inn = '-in-'
    }
    console.log(stringdemo,"stringdemo");
    let expName = [];
    let experienceList='';
    if (this.minExp)
      for (let i = 0; i < this.minExp.length; i++) {
        for (let j = 0; j < this.experience.length; j++) {
          if (this.minExp[i] == this.experience[j].minExp) {
            // expName = expName + `${this.experience[j].expName}&exp=`
            expName.push(this.experience[j].expName);
            console.log(this.experience[j].expName,"exper");
            experienceList = experienceList + `${this.experience[j].expName}-`

          }
        }
      }
      experienceList = experienceList.replace(/-([^-]*)$/, '$1');   //For Removing the last Hiphen
      if(experienceList)
         experienceList = `-${experienceList}-jobs`;
      console.log(experienceList,"explist");
      
    //-------------- creating queryParams for the filter
    let requestExp = {
      queryParams: {}
    }
    if (!(datah.minSalary == 0 && datah.maxSalary == 4500000)) {
      requestExp = {
        queryParams: {
          minSalary: datah.minSalary,
        }
      }
      requestExp.queryParams["maxSalary"] = datah.maxSalary;
      // if (expName.length > 0) {
      
      //   requestExp.queryParams["exp"] = expName;
      // }
    }
    // else {
    //   if (expName.length > 0) {
    //     requestExp.queryParams["exp"] = expName;

    //   }
    // }
    //-----------------------------------------------------
    if (this.data.categoryTitle) {
      // var str = this.data.categoryTitle;
      // var dstr = str.replace(/[{()}]/g, ' ');
      // var str1 = dstr.replace(/\//g, ' ');
      // this.data.categoryTitle = str1.replace(/ /g, "-")
      // category = this.data.categoryTitle.split('-in');  //To remove the locations coming in data.categorytitle
      // category = category[0];                           //------
      
      // for(var exp of this.expArray){
      //   if(category.includes(exp)){
      //     category = category.split(`-${exp}`);
      //     category = category[0];
      //   }
      // }
     category = this.getStringToRoute(this.data.categoryTitle);
     
    }
    if (this.data.subcategoryTitle) {
      var substr = this.data.subcategoryTitle;
      var subdstr = substr.replace(/[{()}]/g, ' ');
      var substr1 = subdstr.replace(/\//g, ' ');
      this.data.subcategoryTitle = substr1.replace(/ /g, "-");
      if(this.data.subcategoryTitle.includes('-in')){
        subCategory = this.data.subcategoryTitle.split('-in-');
        subCategory = subCategory[0];
      }
      else
      subCategory = this.data.subcategoryTitle;  
      
      for(var exp of this.expArray){
        if(subCategory.includes(exp)){
          subCategory = subCategory.split(`-${exp}`);
          subCategory = subCategory[0];
        }
      }
     
    }
    console.log(requestExp,"exp");
    if (this.data.catId && this.data.subId) {
      // this.locationRout.replaceState(`/${this.data.categoryTitle}/${this.data.catId}/${this.data.subcategoryTitle}-in-${stringdemo}/${this.data.subId}?minSalary=${datah.minSalary}&maxSalary=${datah.maxSalary}${expName}`);
      this.router.navigate([`/${category}/${subCategory}${experienceList}${inn}${stringdemo}`], requestExp)
    }
    else if (this.data.catId) {
      this.router.navigate([`/${category}${experienceList}${inn}${stringdemo}`], requestExp)
      // this.router.navigate([`/${this.data.categoryTitle}${inn}${stringdemo}?minSalary=${datah.minSalary}&maxSalary=${datah.maxSalary}${expName}`]);
    } else {
      // if ((datah.minSalary || datah.maxSalary) && expName) 
      if (this.skills)
        this.router.navigate([`/search-${this.skills}${experienceList}${inn}${stringdemo}`], requestExp);
      else
        this.router.navigate([`/search${experienceList}` + `${inn}${stringdemo}`], requestExp);
    }

    //===============================================//
    this.data = {
      locations: this.uniqueLocations,
      minExp: this.minExp,
      maxExp: this.maxExp,
      minSalary: this.minSalary * 100000,
      maxSalary: this.maxSalary * 100000,
    }

    this.dialogRef.close(this.data);
  }

  getStringToRoute(title){
    let category;
    var str = title;
    var dstr = str.replace(/[{()}]/g, ' ');
    var str1 = dstr.replace(/\//g, ' ');
    str1 = str1.replace(/ /g, "-")
    category = str1.split('-in');  //To remove the locations coming in data.categorytitle
    category = category[0];                           //------
    
    for(var exp of this.expArray){
      if(category.includes(exp)){
        category = category.split(`-${exp}`);
        category = category[0];
      }
    }
    return category;
  }

  refreshDialog() {
    this.uniqueLocations = [];
    this.minExp = [];
    this.maxExp = [];
    this.locations.forEach(element => {
      element.isClicked = false;
    });

    this.exp = [];
    this.experience.forEach(element => {
      element.isClicked = false;
    });
    this.minValue = 0;
    this.maxValue = 45;
  }


}

