import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import {ApplyjobService} from './applyjob.service';
import {ApplyJobFormData} from './applyformdata';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  formData:any;
  
  constructor(private formDataService:ApplyjobService) {
  
   }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
  }
}
