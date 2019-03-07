import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submited=false
  profileForm = this.fb.group({
    name: [''],
    id: [''],
    price: [''],
    picture: [''],
    categery: ['']
  });
  inputs=this.profileForm.controls;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.submited=true;
    console.log(this.profileForm)
    // this.profileForm.reset(this.dataService.productChoice)
  }
  onAdd(){
    this.dataService.productChoice={"id":null,"name":null,"categery_id":null,"price":null,"picture":null};
  }

}
