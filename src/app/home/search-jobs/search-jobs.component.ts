import { Component, OnInit, Inject, OnDestroy, OnChanges } from '@angular/core';
import { environment } from './../../../environments/environment';
import { CommonService } from './../../shared/services/common.service';
import { EllipsisPipe } from './../../shared/pipes/ellipsis.pipe';
import { Router, ActivatedRoute, } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApplyJobComponent } from '../apply-job/job/apply-job.component';
import { AccountService } from './../../account/account.service';
import { HomeService } from './../home.service';
import { ReferNowComponent } from '../refer-now/refer-now.component';
import { Meta, Title } from '@angular/platform-browser';
import { FilterComponent } from '../filter/filter.component';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss'],
  providers: [EllipsisPipe]
})
export class SearchJobsComponent implements OnInit, OnChanges {
  public navs: any;
  public subcatoryNavs: any;
  carouselOptions = {
    margin: 0,
    nav: true,
    center: false,
    loop: false,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    slideBy: 3,
    responsive: {
      0: {
        items: 3,
        nav: true,
        margin: 0,
        loop: false
      },
      600: {
        items: 6,
        nav: true,
        margin: 0,
        loop: false
      },
      1000: {
        items: 6,
        nav: true,
        margin: 0,
        loop: false
      },
      1500: {
        items: 6,
        nav: true,
        margin: 0,
        loop: false,
        touchDrag: false,
        freeDrag: false
      }
    }
  }
  $: any;
  jobs = [];
  jobsList = [];
  jobsLoaded = false;
  baseUrl = environment.baseUrl;
  serviceUrl = environment.baseUrl + 'authentication/';
  searchedLocation
  searchLocation: string = '';
  searchLocationChanged = new Subject<string>();
  locationSubscription;
  designation;
  location = [];
  searchDesignation: string = '';
  searchDesignationChanged = new Subject<string>();
  designationSubscription;
  searchedDesignation;
  salary = "";
  jobsLength;
  jobsCount = 1;
  jobsFound = 0;
  count = 1;
  page = 5;
  number_of_jobs;
  total_pages;
  status;
  experience = "";
  Index;
  category = {
    name: '',
    id: null
  };
  subcategory = {
    name: '',
    id: null
  };
  showSubcategory: boolean = false;
  showCategory: boolean = false;
  categoryIdLocal;
  subCategoryIdLocal;
  catIdFromHome;
  ischecked: boolean = false;
  activeClass: boolean = false;
  filteredData;
  searchItem;
  minExp = [];
  maxExp = [];
  datah;
  jobTitle;
  subCategoryTitle;
  subCategoryTitle2;
  minSalary;
  maxSalary;
  locations;
  subcategoryTitle;
  exp = [];
  demo;
  catId = null;
  subId = null;
  filterData;
  index;
  state;
  searchWords;
  // locationsInCategory;
  // locationsInSubCategory;
  categoryName;
  searchKeyWords;
  salarys = ['100000', '200000', '300000', '400000', '500000', '600000', '700000',
    '800000', '900000', '1000000', '1100000', '1200000', '1300000', '1400000',
    '1500000', '1600000', '1700000', '1800000', '1900000', '2000000', '2200000',
    '2400000', '2600000', '2800000', '3000000', '3200000', '3400000', '3600000',
    '3800000', '4000000', '4200000', '4400000', '4500000', '4500001'];
  experiences = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20'];
  searchResult;
  url_experience = [
    { expName: 'Fresher', minExp: 0, maxExp: 1, isClicked: false, count: 0 },
    { expName: 'Junior', minExp: 1, maxExp: 3, isClicked: false, count: 0 },
    { expName: 'Mid', minExp: 3, maxExp: 5, isClicked: false, count: 0 },
    { expName: 'Senior', minExp: 5, maxExp: 8, isClicked: false, count: 0 },
    { expName: 'Director', minExp: 8, maxExp: 100, isClicked: false, count: 0 },
  ]
  getExperience = ['Fresher', 'Junior', 'Mid', 'Senior', 'Director'];
  url_locations = [
    { location: 'International', isClicked: false },
    { location: 'Delhi', isClicked: false },
    { location: 'Gurgaon', isClicked: false },
    { location: 'Noida', isClicked: false },
    { location: 'Bangalore', isClicked: false },
    { location: 'Mumbai', isClicked: false },
  ]
  constructor(
    private commonService: CommonService,
    public accountService: AccountService,
    public dialog: MatDialog,
    private homeService: HomeService,
    private rout: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private dom) {
    const navigation = this.rout.getCurrentNavigation();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.state = navigation.extras.state as {
      id: any;
      name: string;
    };

    // this.getSearchResult();  
    //--------------------------------------------------------------
  }
  ngOnChanges() {
  }
  getSearchResult(searchKey) {
    this.homeService.searchResult(
      searchKey,
      (res: any) => {
        console.log(res, "searchRsusls");
        this.searchResult = res.result;
        if (this.searchResult == undefined || this.searchResult == 'undefined') {
          this.searchResult = Math.floor(Math.random() * 50);
        }
        if (this.searchResult == 0 || this.searchResult == '0')
          this.searchResult = '';

      },
      err => { }
    )
  }

  putFilteredDataOnReload(filteredReloadData) {
    // console.log(filteredReloadData.minSalary, "fil minSalary")
    // console.log(filteredReloadData.maxSalary, "fil maxSalary")
    if (isNaN(filteredReloadData.minSalary) && isNaN(filteredReloadData.maxSalary)) {
      filteredReloadData.maxSalary = null;
      filteredReloadData.minSalary = null;
    }
    //  console.log(filteredReloadData.categoryId,filteredReloadData.subCategoryId,filteredReloadData.locations.length,filteredReloadData.maxSalary,filteredReloadData.minSalary,filteredReloadData.maxExp.length,filteredReloadData.minExp.length)
    if (filteredReloadData.categoryId != undefined || filteredReloadData.subCategoryId != undefined || filteredReloadData.locations.length != 0 || filteredReloadData.maxSalary != null || filteredReloadData.minSalary != null || filteredReloadData.maxExp.length != 0 || filteredReloadData.minExp.length != 0) {
      this.filterJobs(filteredReloadData);
      return true;
    }
  }
  getCategorySubcategoryId(catName, subCatName) {
    if (subCatName && (subCatName.includes('Server-Back-end') || subCatName.includes('QA-Testing'))) {
      var subCatName = subCatName.replace(/-/, "/");
    }
    this.homeService.getCatorSubcatId(                 //Getting category or/and subcategory id on behalf of...
      catName,                                             //...category or/and subcategory name in the URL 
      subCatName,
      res => {
        console.log(res, "ressssssssssssssssss");
        this.catId = res.category_id;
        this.subId = res.sub_category_id;
        this.searchResult = res.total_category_jobs;
        this.categoryNavigation();

        this.category = {
          name: this.getCategoryOrSubCategoryNameFromUrl(this.jobTitle),
          id: this.catId
        };
        console.log(this.category.name, "category Name");

        this.subcategory = {
          name: this.getCategoryOrSubCategoryNameFromUrl(this.subCategoryTitle),
          id: this.subId
        };
        console.log(this.subcategory.name, "subCatgegory name");
        console.log(this.catId, "catIdd");
        console.log(this.subId, "subId");

        if (this.catId == undefined && this.subId == undefined) {
          this.catId = null;
          this.subId = null;
        } else if (this.subId == undefined) {
          this.subId = null;
        }
        foo: if (this.catId && this.subId) {
          if (this.putFilteredDataOnReload(this.filteredData)) {
            this.getSubCategory(this.catId);
            this.showCategory = true;
            break foo;
          }
          this.getSubCategory(this.catId);
          this.getAllJobs(this.catId, this.subId);
          this.showCategory = true;
        }
        else foo1: {
          if (this.catId) {
            if (this.putFilteredDataOnReload(this.filteredData)) {
              this.getSubCategory(this.catId);
              this.showCategory = true;
              break foo1;
            }
            this.getSubCategory(this.catId);
            this.showCategory = true;
            this.getAllJobs(this.catId)
          }
          else foo3: {
            if (this.putFilteredDataOnReload(this.filteredData)) {
              break foo3;
            }
            this.getAllJobs();
          }
        }
      },
      err => { }
    )
  }
  locationsFromUrl(urlLocations) {        //Fetching the locations from the Category 
    //section in URL if User Copy and Pasted it or 
    console.log("url Locationss");
    var str = urlLocations.split('-in-');
    if (str[1]) {
      this.locations = str[1].split('-');
      console.log(this.locations, "locationnn");
    }
  }
  ngOnInit() {
    // this.catId = this.activatedRoute.snapshot.params['catId'];
    // this.subId = this.activatedRoute.snapshot.params['subId'];
    let skills;
    let locationForMeta;
    let skillsForMeta;
    let pageUrl;
    this.jobTitle = this.activatedRoute.snapshot.paramMap.get('categorytitle');
    this.subCategoryTitle = this.activatedRoute.snapshot.paramMap.get('subcategorytitle');
    console.log(this.subCategoryTitle, "SubCategory title");
    console.log(this.jobTitle, "Cat title");
    this.activatedRoute.queryParams.subscribe((params) => {
      // this.locations = params['location'];
      this.exp = params['exp'];
      this.minSalary = params['minSalary'];
      this.maxSalary = params['maxSalary'];
    });
    console.log(this.exp, "url exp");
    // if (this.exp) {
    //   if (typeof this.exp === 'string') {
    //     for (let j = 0; j < this.url_experience.length; j++) {
    //       if (this.exp == this.url_experience[j].expName) {
    //         this.minExp.push(this.url_experience[j].minExp);
    //         this.maxExp.push(this.url_experience[j].maxExp);
    //       }
    //     }
    //   }
    //   else {
    //     for (let i = 0; i < this.exp.length; i++) {
    //       for (let j = 0; j < this.url_experience.length; j++) {
    //         if (this.exp[i] == this.url_experience[j].expName) {
    //           this.minExp.push(this.url_experience[j].minExp);
    //           this.maxExp.push(this.url_experience[j].maxExp);
    //         }
    //       }
    //     }
    //   }
    // }
    if (this.jobTitle != null || this.subCategoryTitle != null) {
      if (!this.jobTitle.includes('search')) {
        var catName = this.getCategoryOrSubCategoryNameFromUrl(this.jobTitle);
        this.categoryName = catName;
        var subCatName = this.getCategoryOrSubCategoryNameFromUrl(this.subCategoryTitle);
        // console.log(catName, "catName ", subCatName, "subcatname");
      }
      //Getting experience names from the Url
      let getExp;
      if (this.jobTitle != null) {
        getExp = this.jobTitle.split('-');
        if (this.subCategoryTitle != null)
          getExp = this.subCategoryTitle.split('-');
      }
      let expList = [];
      if (getExp) {
        for (var value of getExp) {
          for (let i = 0; i < this.url_experience.length; i++) {
            if (value == this.url_experience[i].expName) {
              expList.push(value);
            }
          }
        }
      }
      console.log(expList, "getExp");
      this.exp = expList;
      //--   End  --
      if (this.jobTitle.includes('-in-') || (this.subCategoryTitle && this.subCategoryTitle.includes('-in'))) {
        let urlLocations;
        if (this.jobTitle && this.subCategoryTitle)
          urlLocations = this.subCategoryTitle;
        else
          urlLocations = this.jobTitle;
        this.locationsFromUrl(urlLocations);
      }

      //------Skills from search keywords 
      if (this.jobTitle.includes('search') && (this.jobTitle.indexOf('jobs')) > 7) {
        console.log("jjjjjjjjjjjjjjjjjj");
        let str1 = this.jobTitle.split('search-');
        console.log(str1, "str1")
        str1 = str1[1].split('-jobs');
        console.log(str1, "jobs");
        locationForMeta = str1[1];      //save locations to update meta tag url
        skills = str1[0];
        console.log(skills, "skills");
        skillsForMeta = skills;
        this.searchKeyWords = skills;
        this.searchWords = skills;

        // if (skills.includes('--')) {
        //   skills = skills.split('--');
        //   console.log(skills, "split");
        //   skills = skills.join(' ');
        // }      //save skills to update meta tag url
        // else
        if (skills.includes('-')) {
          let str;
          str = skills.split('-');
          console.log(skills, "split");
          str = str.join(' ');
          this.searchKeyWords = str;
        }
        this.getSearchResult(skills);
        setTimeout(() => {
          this.searchFileredJobs(skills);

        }, 1000);
        this.categoryNavigation();
      }
      //-------------------------
    }
    if (this.exp) {
      if (typeof this.exp === 'string') {
        for (let j = 0; j < this.url_experience.length; j++) {
          if (this.exp == this.url_experience[j].expName) {
            this.minExp.push(this.url_experience[j].minExp);
            this.maxExp.push(this.url_experience[j].maxExp);
          }
        }
      }
      else {
        for (let i = 0; i < this.exp.length; i++) {
          for (let j = 0; j < this.url_experience.length; j++) {
            if (this.exp[i] == this.url_experience[j].expName) {
              this.minExp.push(this.url_experience[j].minExp);
              this.maxExp.push(this.url_experience[j].maxExp);
            }
          }
        }
      }
    }
    if (this.locations) {
      if (typeof this.locations === 'string') {
        for (let j = 0; j < this.url_locations.length; j++) {
          if (this.locations == this.url_locations[j].location) {
            this.location.push(this.url_locations[j].location);
          }
        }
      }
      else {
        for (let i = 0; i < this.locations.length; i++) {
          for (let j = 0; j < this.url_locations.length; j++) {
            if (this.locations[i] == this.url_locations[j].location) {
              this.location.push(this.url_locations[j].location);
            }
          }
        }
      }
    }
    let datah = {
      minSalary: this.minSalary,
      maxSalary: this.maxSalary,
      locations: this.location,
      minExp: this.minExp,
      maxExp: this.maxExp
    };
    this.filteredData = datah;
    // this.putFilteredDataOnReload(datah);
    if (!skills) {
      this.putFilteredDataOnReload(datah);
      console.log("put filtered data");
      this.getCategorySubcategoryId(catName, subCatName);
    }
    if (this.state != undefined) {
      this.catIdFromHome = this.state.id;
      if (this.catIdFromHome) {
        this.getAllJobs(this.catIdFromHome);
        localStorage.setItem('catIdFromHome', this.catIdFromHome);
        localStorage.setItem('catNameFromHome', this.state.name);
      }
    }
    const title = this.activatedRoute.snapshot.paramMap.get('categorytitle');
    this.subCategoryTitle2 = this.activatedRoute.snapshot.paramMap.get('subcategorytitle');
    // this.categoryNavigation();
    console.log(this.locations, "locationsss");
    //  this.createCanonicalURL("http.jobket.in")
    //-------------Update the Meta Tags ---------------------------------------------//
    setTimeout(() => {
      if (this.searchResult == undefined || this.searchResult == 'undefined') {
        // this.searchResult = Math.floor(Math.random() * 50);
        this.searchResult = '';
      }
      if (this.searchResult == 0 || this.searchResult == '0')
        this.searchResult = '';
      if (this.searchKeyWords && this.locations) {
        let searchItem = this.searchKeyWords;
        console.log(locationForMeta, "loc");
        console.log(skillsForMeta, "skills");
        console.log("meta searchhhh and locations");
        this.title.setTitle(`${searchItem} jobs in ${this.locations}- ${searchItem} opening in ${this.locations} on jobket.in.`);
        this.meta.updateTag({ property: 'og:title', content: `${searchItem} jobs in ${this.locations}- ${searchItem} opening in ${this.locations} on jobket.in.` });
        this.meta.updateTag({ property: 'og:description', content: `Apply To ${this.searchResult} ${searchItem} jobs in ${this.locations} On Jobket.in. India’s Most Trusted job portal. Explore ${searchItem} job opening in ${this.locations} Now!` });
        this.meta.updateTag({ name: 'description', content: `Apply To ${this.searchResult} ${searchItem} jobs in ${this.locations} On Jobket.in. India’s Most Trusted job portal. Explore  ${searchItem} job opening in ${this.locations} Now!` });
        this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/search-${skillsForMeta}-jobs${locationForMeta}` });
        pageUrl = `https://jobket.in/search-${skillsForMeta}-jobs${locationForMeta}`;
      }
      else if (this.searchKeyWords) {
        let searchItem = this.searchKeyWords;
        console.log("meta searchhhh");
        console.log(this.searchResult, "searchResult");
        this.title.setTitle(`${searchItem} jobs, Find ${this.searchResult} ${searchItem} openings on Jobket.in`);
        this.meta.updateTag({ property: 'og:title', content: `${searchItem} jobs, Find ${this.searchResult} ${searchItem} openings on Jobket.in` });
        this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult} ${searchItem} jobs on jobket.in,  India’s Most Trusted job portal. Explore ${searchItem} opening in your desired location Now!”` });
        this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} ${searchItem} jobs on jobket.in,  India’s Most Trusted job portal. Explore ${searchItem} opening in your desired location Now!”` });
        this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/search-${skillsForMeta}-jobs` });
        pageUrl = `https://jobket.in/search-${skillsForMeta}-jobs`;
      }
      else if (this.locations) {
        // console.log(this.locations, "meta locations")
        if (catName && subCatName) {
          console.log(this.locations, "meta locations Cat and SubCatname", catName, subCatName);

          this.title.setTitle(`${subCatName} jobs in ${this.locations} -Find ${subCatName} jobs on Jobket.in`);
          this.meta.updateTag({ property: 'og:title', content: `${subCatName} jobs in ${this.locations} -Find ${subCatName} jobs on Jobket.in` });
          this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult} ${subCatName} jobs in ${this.locations} on Jobket.in, India’s Most Trusted job portal. Explore ${subCatName} job opening in ${this.locations} Now!` });
          this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} ${subCatName} jobs in ${this.locations} on Jobket.in, India’s Most Trusted job portal. Explore ${subCatName} job opening in ${this.locations} Now!` });
          this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/${this.jobTitle}/${this.subCategoryTitle}` });
          pageUrl = `https://jobket.in/${this.jobTitle}/${this.subCategoryTitle}`;
        }
        else if (catName) {
          console.log(this.locations, "meta locations Cat Name ");
          console.log(catName, "cat Name");

          this.title.setTitle(`${catName} jobs in ${this.locations}- ${this.searchResult} ${catName} opening in ${this.locations} –Jobket.in`);
          this.meta.updateTag({ property: 'og:title', content: `${catName} jobs in ${this.locations}- ${this.searchResult} ${catName} opening in ${this.locations} –Jobket.in` });
          this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult} ${catName} jobs in ${this.locations} on Jobket.in, India’s Most Trusted job portal. Explore ${catName} job opening in ${this.locations} Now!` });
          this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} ${catName} jobs in ${this.locations} on Jobket.in, India’s Most Trusted job portal. Explore ${catName} job opening in ${this.locations} Now!` });
          this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/${this.jobTitle}` });
          pageUrl = `https://jobket.in/${this.jobTitle}`;
        }
        else {
          console.log(this.locations, "meta locations");
          this.title.setTitle(`Jobs in ${this.locations} Job Vacancies in ${this.locations}- jobket.in`);
          this.meta.updateTag({ property: 'og:title', content: `Jobs in ${this.locations} Job Vacancies in ${this.locations}- jobket.in` });
          this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult} job opening in ${this.locations} on Jobket.in. India’s Most Trusted job portal. Explore ${this.locations} jobs across Top companies Now !` });
          this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} job opening in ${this.locations} on Jobket.in. India’s Most Trusted job portal. Explore ${this.locations} jobs across Top companies Now !` });
          this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/${this.jobTitle}` });
          pageUrl = `https://jobket.in/${this.jobTitle}`;
        }

      }
      else if (catName && subCatName) {
        this.title.setTitle(`${subCatName} jobs, Find ${subCatName} Jobs on Jobket.in`);
        this.meta.updateTag({ property: 'og:title', content: `${subCatName}, Find ${subCatName} Jobs on Jobket.in` });
        this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult}  ${subCatName} jobs on Jobket.in. India’s most Trusted job portal. Explore ${subCatName} job opening across Top companies Now !` });
        this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} ${subCatName} jobs on Jobket.in. India’s most Trusted job portal. Explore ${subCatName} job opening across Top companies Now !` });
        this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/${this.jobTitle}/${this.subCategoryTitle}` });
        pageUrl = `https://jobket.in/${this.jobTitle}/${this.subCategoryTitle}`;
      }
      else if (catName) {
        this.title.setTitle(`${catName} jobs, Find ${catName} Jobs on Jobket.in`);
        this.meta.updateTag({ property: 'og:title', content: `${catName}, Find ${catName} Jobs on Jobket.in` });
        this.meta.updateTag({ property: 'og:description', content: `Apply to ${this.searchResult} ${catName} jobs on Jobket.in. India’s most Trusted job portal. Explore ${catName} job opening across Top companies Now !` });
        this.meta.updateTag({ name: 'description', content: `Apply to ${this.searchResult} ${catName} jobs on Jobket.in. India’s most Trusted job portal. Explore ${catName} job opening across Top companies Now !` });
        this.meta.updateTag({ property: 'og:url', content: `https://jobket.in/${this.jobTitle}` });
        pageUrl = `https://jobket.in/${this.jobTitle}`;

      }
      else {
        this.title.setTitle('Search Jobs, Search Openings for Job seeker - Jobket');
        this.meta.updateTag({ property: 'og:title', content: 'Search Jobs, Search Openings for Job seeker - Jobket' });
        this.meta.updateTag({ property: 'og:description', content: 'Apply to Search Jobs on Jobket.in, A unique referral job platform. Explore Search Openings in your desired locations Now!' });
        this.meta.updateTag({ name: 'description', content: 'Apply to Search Jobs on Jobket.in, A unique referral job platform. Explore Search Openings in your desired locations Now!' });
        this.meta.updateTag({ property: 'og:url', content: 'https://jobket.in/search-jobs' });
        pageUrl = 'https://jobket.in/search-jobs';
      }
      this.createCanonicalURL(pageUrl);
    },
      1500)
    //-------------End of update the meta tags ---------------------------------------------//
    this.jobsLength = 1;
    //Condition to check availability of category id and subcategory id to get jobs
    if (this.jobTitle == null) {
      localStorage.removeItem('categoryId');
      localStorage.removeItem('subcategoryId');
      localStorage.removeItem('catIdFromHome');
      localStorage.removeItem('catNameFromHome');
      localStorage.removeItem("subCatIndex");
    }
    if (this.jobTitle != null && this.subCategoryTitle2 != null) {
      this.showSubcategory = true;
    }
    this.catIdFromHome = localStorage.getItem('catIdFromHome');
    if (this.catIdFromHome) {
      localStorage.removeItem('categoryId');
      localStorage.removeItem('subcategoryId');
    }
    this.homeService.status.subscribe(status => {
      this.status = status;
      if (this.status == true) {
        for (let i = 0; i < this.jobsList.length; i++) {
          this.jobsList[this.Index].applied_status = this.status;
        }
      }
    });
  }
  createCanonicalURL(url?: string) {
    console.log(url, "can Url");
    let canURL = url == undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
  searchFileredJobs(skills) {
    console.log(this.minSalary, "minsal")
    console.log(this.maxSalary, "maxsal");
    let data = {
      skills: skills,
      minSalary: this.minSalary,
      maxSalary: this.maxSalary,
      locations: this.locations,
      minExp: this.minExp,
      maxExp: this.maxExp
    };
    if (data.minSalary == undefined && data.maxSalary == undefined) {
      data.minSalary = 0;
      data.maxSalary = 4500000;
    }
    if (data.locations == undefined)
      data.locations = '';
    if (data.minExp == undefined && data.maxExp == undefined) {
      data.minExp = null;
      data.maxExp = null;
    }
    console.log(data, "skill data");
    this.homeService.searchJobDesignation(
      this.count,
      data,
      (res: any) => {
        if (res.total_pages >= this.count && this.count == 1) {
          this.total_pages = res.total_pages;
          this.jobsList = res.jobs;
        }
        if (this.total_pages >= this.count && this.count != 1) {

          let result = res.jobs;
          for (let i in result) {
            let len = this.jobsList.length;
            this.jobsList[len] = result[i];
          }
          this.jobsLength = this.jobsList.length;
        }
      },
      err => {
        console.log(err);
      }
    )
    // this.categoryNavigation();
  }
  // Get the cat/subcat name from URL 
  getCategoryOrSubCategoryNameFromUrl(categoryName) {
    if (categoryName) {
      var str = categoryName.split('-jobs');
      if (str[0] == 'search')              //In case of when it returns "search" from search page
        return null;                    //----------------------------------------------------
      return str[0];

    }
  }
  // Set the category names 
  categoryNavigation() {
    this.homeService.categoryNavigation(
      (res: any) => {
        if (res.success == true) {
          this.navs = res.categories;

          this.navs.forEach(element => {    //highlight the single category if selected
            if (element.id == this.catId)
              element.ischecked = true;
          });
          this.activeClass = true;
        }
      },
      err => {
        this.commonService.showError(err.message);
      });
  }
  // Search the job or designation from the search box
  searchJobDesignation(searchItem, itemFromSearchPage?) {
    console.log(searchItem, "sitem");
    searchItem = searchItem.trim();
    if (searchItem == '') {
      return;
    }
    var str;
    if (searchItem.includes(' jobs')) {
      searchItem = searchItem.replace(" jobs", "");
    }
    if (searchItem.includes(' job')) {
      searchItem = searchItem.replace(" job", "");
    }
    if (searchItem.includes('jobs')) {
      searchItem = searchItem.replace("jobs", "");
    }
    if (searchItem.includes('job')) {
      searchItem = searchItem.replace("job", "");
    }

    if (searchItem.includes(' job ')) {
      searchItem = searchItem.replace(" job ", "");
    }
    console.log(str, "strrrrrrrr");

    if (searchItem.includes(' ')) {
      str = searchItem.replace(/ +(?= )/g, '');  //Remove more than one space in single spance

      str = str.split(' ');
      searchItem = str.join('-');
    }
    // else{
    //   str = searchItem.split(',');
    //   searchItem = str.join('-');
    // }
    // this.searchKeyWords = searchItem;
    this.redirectTo(`search-${searchItem}-jobs`);
    if (searchItem) {
      var item = searchItem.split(' ').join('');
    }
    if (item == undefined)
      return ''
    else
      return item;
  }

  getSubCategoryData(catSubNav, index) {
    console.log(catSubNav, "cat sub nav")
    this.activeClass = true;
    catSubNav.name = this.removePercentage(catSubNav);
    this.jobTitle = catSubNav.name;
    if (catSubNav) {
      this.navs.forEach(element => {
        element.ischecked = false;
      });
    }
    this.navs[index].ischecked = true;
    // var str = catSubNav.name;
    // var dstr = str.replace(/[{()}]/g, ' ');
    // var str1 = dstr.replace(/\//g, ' ');
    // catSubNav.name = str1.replace(/ /g, "-");
    // const url = this.activatedRoute.snapshot.paramMap.get('categorytitle');
    this.category = catSubNav;
    localStorage.setItem('categoryId', catSubNav.id);
    this.catId = catSubNav.id;
    this.rout.navigate(["/" + catSubNav.name + '-jobs']);

    // let url = this.rout.createUrlTree(["/" + catSubNav.name + '-jobs']);
    // window.open(url.toString(), '_blank')


    // this.getSubCategory(catSubNav.id);
    // this.jobsList.length = 0;
    // this.count = 1;
    // this.getAllJobs(this.category.id);
    // this.showCategory = true;
    // localStorage.removeItem('catIdFromHome');
    // localStorage.removeItem('catNameFromHome')
  }

  removePercentage(catSubNav) {
    console.log(catSubNav, "cat sub nave");
    if (catSubNav) {
      var str = catSubNav.name;
      var dstr = str.replace(/[{()}]/g, ' ');
      var str1 = dstr.replace(/\//g, ' ');
      return (str1.replace(/ /g, "-"));
    }

  }
  getSubCategory(categoryId) {
    this.homeService.subCategory(
      categoryId,
      (res: any) => {
        if (res.success == true) {
          if (res.sub_categories.length == 0) {
            return;
          }
          this.subcatoryNavs = res.sub_categories;
          if (this.subId) {
            for (let i = 0; i < this.subcatoryNavs.length; i++) {
              if (this.subcatoryNavs[i].id == this.subId) {
                this.subcatoryNavs[i].ischecked = true;
              }
            }
          }
          // if (localStorage.getItem("subCatIndex"))
          //   this.subcatoryNavs[localStorage.getItem("subCatIndex")].ischecked = true;
        }
      },
      err => {
        this.commonService.showError(err.message);
      });
  }
  getSubCategoryList(subCatNav, index) {
    console.log(subCatNav, "subCatNavvv");
    this.index = index;
    this.subcategoryTitle = subCatNav.name;
    this.subCategoryTitle2 = this.removePercentage(subCatNav);
    if (this.subcatoryNavs) {
      this.subcatoryNavs.forEach(element => {
        element.ischecked = false;
      });
    }
    this.subcatoryNavs[index].ischecked = true;
    localStorage.setItem("subCatIndex", index);
    // var str = subCatNav.name;
    // var dstr = str.replace(/[{()}]/g, ' ');
    // var str1 = dstr.replace(/\//g, ' ');
    // subCatNav.name = str1.replace(/ /g, "-");
    this.subcategory = subCatNav;
    this.subId = subCatNav.id;
    localStorage.setItem('subcategoryId', subCatNav.id);

    let url = this.rout.createUrlTree(['/' + this.categoryName + '-jobs' + '/' + this.subCategoryTitle2 + '-jobs' + '/']);
    window.open(url.toString(), '_blank')
    // this.jobsList.length = 0;
    // this.count = 1;
    // this.getAllJobs(this.catId, subCatNav.id);
    // this.showSubcategory = true;
  }

  breadCrumbAll() {
    this.redirectTo(`search-jobs`);
  }

  breadCrumbCategory(categary) {
    localStorage.removeItem('subcategoryId');
    localStorage.removeItem('subCatIndex');
    // this.rout.navigate(['/' + categary.name + '-jobs']);
    this.redirectTo(`/${categary.name}-jobs`);      //for reloading the same page 
    this.showSubcategory = false;
    this.getAllJobs(categary.id);
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  filterDialog() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '600px',
      height: 'auto',
      data: {
        filteredData: this.filteredData, categoryTitle: this.jobTitle, subcategoryTitle: this.subCategoryTitle2
        , catId: this.catId, subId: this.subId, skills: this.searchKeyWords
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterJobs(result);
        this.filteredData = result;
        this.minExp = [];
        this.maxExp = [];
      }
    });
    this.count = 1;
  }

  filterLocation() {
    this.searchLocationChanged.next(this.searchedLocation);
  }

  filterDesignation() {
    this.searchDesignationChanged.next(this.searchedDesignation);
  }

  showMoreJobs() {
    this.jobsCount++;
    this.count++;
    if (this.searchWords) {
      this.searchFileredJobs(this.searchWords);
      return;
    }
    if (this.total_pages >= this.count) {

      if (isNaN(this.filteredData.minSalary) && isNaN(this.filteredData.maxSalary)) {
        this.filteredData.maxSalary = null;
        this.filteredData.minSalary = null;
      }
      console.log(this.filteredData.categoryId, this.filteredData.subCategoryId, this.filteredData.locations, this.filteredData.maxSalary, this.filteredData.minSalary, this.filteredData.maxExp.length, this.filteredData.minExp.length)
      if (this.filteredData.categoryId != undefined || this.filteredData.subCategoryId != undefined || this.filteredData.locations != undefined || this.filteredData.maxSalary != null || this.filteredData.minSalary != null || this.filteredData.maxExp.length != 0 || this.filteredData.minExp.length != 0) {
        this.filterJobs(this.filteredData);
        console.log("ffffffffff");

      }

      else if (this.catId && this.subId) {
        this.getAllJobs(this.catId, this.subId);
      }
      else if (this.catId) {
        this.getAllJobs(this.catId);
      }
      else if (this.catIdFromHome) {
        this.getAllJobs(this.catIdFromHome);
        console.log("llllllllllllllllllll");
      }

      else {
        this.getAllJobs();
        console.log("llllllllllllllllllll");

      }
      let jobsListLength = this.jobsList.length;
    }
  }
  getAllJobs(catId?, subCatId?) {
    this.homeService.getTotalJobs(
      (res: any) => {
        if (res.success) {
          if (this.jobsList.length == 0) {
            this.jobsList = res.jobs;
            this.total_pages = res.total_pages;

            this.jobsLength = this.jobsList.length;
            if (this.total_pages >= this.count && this.count != 1) {

              let result = res.jobs;
              for (let i in result) {
                let len = this.jobsList.length;
                this.jobsList[len] = result[i];
              }
              this.jobsLength = this.jobsList.length;
            }
          } else {

            if (this.total_pages >= this.count && this.count != 1) {
              let result = res.jobs;
              for (let i in result) {
                let len = this.jobsList.length;
                this.jobsList[len] = result[i];
              }
            }
          }
          this.jobsLoaded = true;
        } else {
          this.jobsLoaded = false;
          this.jobs = [];
        }
      },
      err => {
        this.jobsLoaded = false;
        this.commonService.showMessage(err.message);
      },
      this.count,
      catId,
      subCatId,
    );
  }
  updateLocation(item) {
    this.searchLocation = item.location;
  }
  updateDesignation(item) {
    this.searchDesignation = item.designation;
  }
  filterJobs(data?) {
    this.filterData = {
      categoryId: this.catId,
      subCategoryId: this.subId,
      locations: data.locations,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      minExp: data.minExp,
      maxExp: data.maxExp
    }
    this.homeService.filterJobs(
      this.count,
      this.filterData,
      (res: any) => {
        this.getFilteredTotalJobsResult(this.count, this.filterData)

        if (res.total_pages >= this.count && this.count == 1) {
          this.total_pages = res.total_pages;
          this.jobsList = res.jobs;
        }
        if (this.total_pages >= this.count && this.count != 1) {

          let result = res.jobs;
          for (let i in result) {
            let len = this.jobsList.length;
            this.jobsList[len] = result[i];
          }
          this.jobsLength = this.jobsList.length;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getFilteredTotalJobsResult(page, data) {
    this.homeService.getFilteredNumberOfJobs(
      page,
      data,
      (res: any) => {
        console.log(res, "searchReeeeeeeeee");
        this.searchResult = res.result;
        if (this.searchResult == undefined || this.searchResult == 'undefined') {
          this.searchResult = Math.floor(Math.random() * 50);
        }
        console.log(this.searchResult);
      },
      err => { }
    )
  }
  applyDialog(jobID, index) {
    this.Index = index;
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      localStorage.setItem('jobId', jobID);
      this.accountService.openLoginDialog();
      return;
    }
    const dialogRef = this.dialog.open(ApplyJobComponent, {
      width: '600px',
      height: '430px',
      data: { id: jobID }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  referDialog(jobData) {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
      this.accountService.openLoginDialog();
      return;
    }
    const dialogRef = this.dialog.open(ReferNowComponent, {
      width: '600px',
      height: '430px',
      data: { data: jobData }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  job_Designation_router(jobId: any, jobDesignation: any, imgSrc: any, job) {
    localStorage.setItem('imgSrc', imgSrc);
    this.homeService.routeJobDetailPage(job);
    // let CatName =this.removeSpaceWithDash( job.cat_subcat_id.cat_name);
    // let subCatName =this.removeSpaceWithDash( job.cat_subcat_id.sub_cat_name);

    // var str = jobDesignation;
    // var dstr = str.replace(/[{()}]/g, ' ');
    // var str1 = dstr.replace(/\//g, ' ');
    // jobDesignation = str1.replace(/ /g, "-");
    //   if (CatName && subCatName) {
    //     console.log(CatName,subCatName,"cat subcat");
    //     this.rout.navigate(['/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + jobDesignation + '/' + job.location + '/' + jobId]);
    //     // console.log('/' + CatName + '-jobs' + '/' + subCatName + '-jobs' + '/' + jobDesignation + '/' + job.location + '/' + jobId,"subCat");

    //   }
    //   else if (CatName){
    //     console.log(CatName,subCatName,"cat");

    //     this.rout.navigate(['/' + CatName + '-jobs' + '/' + jobDesignation + '/' + job.location + '/' + jobId]);
    //     // console.log('/' + CatName + '-jobs' +  '/' + jobDesignation + '/' + job.location + '/' + jobId,"cat");

    //  }
    // }
    // removeSpaceWithDash(str){
    //   if(str){
    //     var str1 = str.replace(/\//g, ' ');
    //     return (str1.replace(/ /g, "-"));
    //   }

    // }
  }
}