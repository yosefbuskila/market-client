import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DinamicService } from '../dinamic.service';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lastOrder;
  constructor(
    public httpService:HttpService,
    public router:Router,
    public dataService:DataService,
    // private dinService:DinamicService
    ) {
      this.lastOrder=dataService.lastOrder;
    if(!this.dataService.entryDetails){
    this.router.navigate(['/logIn'])
    return;
    }
    this.httpService.getLastOrder(this.dataService.entryDetails).subscribe((data)=>{
      console.log('data',data)
      this.dataService.lastOrder=data.data;
      this.lastOrder=dataService.lastOrder;
      console.log('last',this.lastOrder)
            }  )
         }
   start(){
    this.router.navigate(['/market'])
   }
  ngOnInit() {
  }
  
}
