import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  myFile:File;
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
    private httpService:HttpService,
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  onSubmit(event){
    this.submited=true;
    // console.log(this.profileForm)
    // console.log('ev',event)
    let formData:FormData = new FormData();
    formData.append('id', '96');
    formData.append('token', 'CIH79cNya8t1dQeZheBDTSHGanjXUlnW');
    // formData.append('sampleFile', this.myFile);
    formData.append('productName', 'banana5');
    formData.append('categery_id', '1');
    formData.append('price', '5');
    
    this.httpService.uploudProduct(formData).subscribe(data=>{
      console.log(data)
    })
        // formData.append('uploadFile', file, file.name);
  }
  fileChange(event){
    this.myFile=event.target.files[0];
    console.log(this.myFile)
  }

  
  onAdd(){
    this.dataService.productChoice={"id":null,"name":null,"categery_id":null,"price":null,"picture":null};
  }

}
