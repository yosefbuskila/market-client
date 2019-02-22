import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  submited=false;
formLogIn=new FormGroup({
  "email": new FormControl(),
	"password": new FormControl()
})
inputs;
  constructor() {
    this.inputs=this.formLogIn.controls;
   }

  ngOnInit() {
  }
  onSubmit(){
    this.submited=true;
    console.log(this.formLogIn)
  }

}
