import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../httpservice.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  submited=false;
formLogIn=new FormGroup({
  "email": new FormControl('david@gmail.com'),
	"password": new FormControl('1234')
})
inputs;
  constructor(
    private httpService:HttpService,
    private router:Router,
    private dataService:DataService
  ) {
    this.inputs=this.formLogIn.controls;
   }

  ngOnInit() {
  }
  onSubmit(){
    // this.location.go('/home')
    
    this.submited=true;
    if(this.formLogIn.invalid){
      alert('data is not valid')
      return;
    }
    this.httpService.logIn(this.formLogIn.value).subscribe((data)=>{
      console.log('ans:',data)
      if(!data.success){
        alert('log in faild')
        return;
      }
      localStorage['entryDetails']=JSON.stringify( data['entryDetails'])
      localStorage['userDetails']=JSON.stringify(data['userDetails'])
      this.dataService.setProp();
      this.router.navigate(['/home'])
      // this.location.replaceState('home')
      }  )
    
    console.log(this.formLogIn)
  }
}
