import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './httpservice.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DinamicService {

  constructor(
    private httpService:HttpService,
    private router:Router,
    private dataService:DataService
  ) { }
  logIn(valuesLogIn){
    this.httpService.logIn(valuesLogIn).subscribe((data)=>{
      console.log('ans:',data)
      if(!data.success){
        alert('log in faild')
        return;
      }
      localStorage['entryDetails']=JSON.stringify( data['entryDetails'])
      localStorage['userDetails']=JSON.stringify(data['userDetails'])
      this.dataService.setProp();
      if(data.userDetails.role==='admin')
      this.router.navigate(['/admin'])
      else
      this.router.navigate(['/home'])
      // this.location.replaceState('home')
      }  )
  }
}
