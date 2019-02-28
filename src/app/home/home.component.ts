import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails=localStorage['userDetails'];
entryDetails=localStorage['entryDetails'];
lastOrder:any=[];
  constructor(
    private router:Router,
    private httpService:HttpService
    ) {
    if(!this.entryDetails){
    this.router.navigate(['/logIn'])
    return;
    }
    this.httpService.getLastOrder(this.entryDetails).subscribe((data)=>{
      this.lastOrder=data.data;
      console.log('ans:',data.data)
      console.log('len:',this.lastOrder.length)
            }  )
   }

  ngOnInit() {
  }

}
