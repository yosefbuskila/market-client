import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../httpservice.service';
import { DinamicService } from '../dinamic.service';

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
    private fb: FormBuilder,
    private dinService:DinamicService
  ) { }

  ngOnInit() {
  }
  onSubmit(event){
    this.submited=true;
    if(this.profileForm.invalid){
      alert('all inputs is required!!!')
      return
    }
    // console.log(event)
    // console.log('ev',event)
    let formData:FormData = new FormData();
    formData.append('id', this.dataService.entryDetails.id);
    formData.append('token', this.dataService.entryDetails.token);
    formData.append('sampleFile', this.myFile);
    formData.append('productName', this.inputs.name.value);
    formData.append('categery_id',this.inputs.categery.value);
    formData.append('price', this.inputs.price.value);
    let subscriper;
    if(this.inputs.id.value ){
      console.log('true',this.inputs.id.value)
      formData.append('productID', this.inputs.id.value);
      subscriper=this.httpService.updateProduct(formData)
    }else subscriper=this.httpService.uploudProduct(formData)
    
    subscriper.subscribe(data=>{
      if(data.sucess){
        this.dinService.onChooseCat(this.inputs.categery.value)
        this.onAdd();
        alert('the data is uploud')
      }
      console.log(data)
    })
        // formData.append('uploadFile', file, file.name);
  }
  fileChange(event){
    console.log(this.profileForm)
    this.myFile=event.target.files[0];
    console.log(this.myFile)
  }

  
  onAdd(){
    this.dataService.productChoice={"id":null,"name":null,"categery_id":null,"price":null,"picture":null};
    this.profileForm.setValue({
      name: '',
      id: '',
      price: '',
      picture: '',
      categery: ''
    })
    this.submited=false;
  }

}
