import { Component } from '@angular/core';
import { Router} from '@angular/router';
// import { SearchJobsComponent} from './home/search-jobs/search-jobs.component';

@Component({
  selector: 'div',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userjobket';
  constructor(){
  // var  url=  localStorage.getItem('url');
  //   router.config.unshift(
  //     { path: url, component: SearchJobsComponent },
  //   );
  }
}
