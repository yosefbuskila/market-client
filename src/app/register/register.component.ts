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
  firstSwitch=true;
  hideSities=true;
  passNoMach=false;
  sities=[ "Jerusalem","Tiberias","Dimona","Afula","Beit Shemesh","Bnei Brak","Ashkelon","Hatzor","Arad","London"]
  filterSities=[ "Jerusalem","Tiberias","Dimona","Afula","Beit Shemesh","Bnei Brak","Ashkelon","Hatzor","Arad","London"];
  profileForm = this.fb.group({
    firstForm: this.fb.group({
      id: ['21512'],
      email: ['wdw1qaxbdc@gmail.com'],
      password: ['111'],
      confirmPassword: ['111']
    }),
    secForm: this.fb.group({
      city: ['jer'],
      street: ['brz'],
      firstName: ['yos'],
      lastName: ['bus']
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
  }
  onClickPassword(){
    if(this.firstForm.password.value!==this.firstForm.confirmPassword.value)
    this.passNoMach=true;
    else this.passNoMach=false;
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
  onSubmit(){
    this.triedsec=true;
    if(this.profileForm.controls.secForm.valid){
      // console.log(this.profileForm.value)
      let vals=this.profileForm.value;
      let deatailsReg={"regDeatails":[vals.firstForm.email,vals.firstForm.password,vals.secForm.firstName,vals.secForm.lastName,'null','null',vals.secForm.street,'null',vals.secForm.city,'null',vals.firstForm.id]}
      // let deatailsReg=JSON.parse(` {"abc":5  }`)
      // console.log(deatailsReg)
      this.httpService.register(deatailsReg).subscribe(data=>{
        if(data.success)
        console.log('aaa',data)
      })
    }
  }
}
