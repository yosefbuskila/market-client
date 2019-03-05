import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('streetInput') streetInput: ElementRef;
  triedFirst=false;
  triedsec=false;
  firstSwitch=false;
  hideSities=true;
  passNoMach=false;
  sities=[ "Jerusalem","Tiberias","Dimona","Afula","Beit Shemesh","Bnei Brak","Ashkelon","Hatzor","Arad","London"]
  filterSities=[ "Jerusalem","Tiberias","Dimona","Afula","Beit Shemesh","Bnei Brak","Ashkelon","Hatzor","Arad","London"];
  profileForm = this.fb.group({
    firstForm: this.fb.group({
      id: ['1'],
      email: ['abc@gmail.com'],
      password: ['111'],
      confirmPassword: ['111']
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
  constructor(
    private httpService:HttpService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }
  next() {
    // this.onClickPassword();
    this.triedFirst=true;
    if(this.profileForm.controls.firstForm.invalid || this.passNoMach){
      alert("Fill all the fields as required" )
      return
    }
    this.httpService.chacIdEmail(this.firstForm.id.value,this.firstForm.email.value).subscribe(data=>{
      console.log('id',data)
      let msg='';
      if(data[0][0]==true) msg+='this ID is exists \n';
      if(data[1][0]==true) msg+='this email is exists \n';
      if(data[0][0]==true||data[1][0]==true)
        alert( msg+ 'plese log in or register at another details')
        else this.firstSwitch=false;
    })
    // this.httpService.chackId(this.firstForm.id.value).subscribe(data=>console.log('id',data))
    // this.httpService.chackEmail(this.firstForm.email.value).subscribe(data=>console.log('email',data))
    // this.firstSwitch=false;
    // console.log('ok')
  }
  onClickPassword(){
    if(this.firstForm.password.value!==this.firstForm.confirmPassword.value)
    this.passNoMach=true;
    else this.passNoMach=false;
  }
  onSubmit(){
    this.triedsec=true;
  }
  onCoice(event){
    console.log(this.streetInput)
    this.secForm.city.setValue(event.target.innerText)
    setTimeout(_=>{this.streetInput.nativeElement.focus();this.filterSities=this.sities},200)
    this.streetInput.nativeElement.focus();
  }
  onFocus(){
    this.hideSities=false;
    console.log('in')
  }
  onFocusOut(event){
    setTimeout(_=>this.hideSities=true,100)
    console.log('out')
  }
  onClickCity(event){
    console.log(event.target.value)
    this.filterSities= this.sities.filter(word => word.toLowerCase().includes (event.target.value.toLowerCase()));
  }
}
