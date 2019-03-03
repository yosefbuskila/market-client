import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../httpservice.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
lastOrder:any=[];
  constructor(
    private router:Router,
    private httpService:HttpService,
    private dataService:DataService
    ) {
    if(!this.dataService.entryDetails){
    this.router.navigate(['/logIn'])
    return;
    }
    this.httpService.getLastOrder(this.dataService.entryDetails).subscribe((data)=>{
      this.lastOrder=data.data;
      console.log('ans:',data.data)
      console.log('len:',this.lastOrder.length)
            }  )
   }

  ngOnInit() {
  }

}
