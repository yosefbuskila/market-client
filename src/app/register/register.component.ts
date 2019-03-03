import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  triedFirst=false;
  triedsec=false;
  firstSwitch=false;
  profileForm = this.fb.group({
    firstForm: this.fb.group({
      id: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    }),
    secForm: this.fb.group({
      city: [''],
      street: [''],
      firstName: [''],
      lastName: ['']
    }),
  });
  firstForm=this.profileForm.controls.firstForm['controls'];
  secForm=this.profileForm.controls.secForm['controls'];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  next() {
    console.log(this.firstForm)
    this.triedFirst=true
  }
  onSubmit(){
    this.triedsec=true;
  }
}
