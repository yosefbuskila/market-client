import { Component } from '@angular/core';
import{HttpService} from './httpservice.service'
import { from } from 'rxjs';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // nameOfUser = 'guest';
  private numOrders:number;
  private numItems:number;
  constructor(private httpService:HttpService , private dataService:DataService){
    
    }
  ngOnInit() {
    this.getNums();
    // if(localStorage['userDetails']){
    //   const ud=JSON.parse(localStorage['userDetails'])
    //   this.nameOfUser=ud.first_name +' '+ud.last_name;
    //   console.log(ud)
    // }
  }
  getNums(){
    this.httpService.getNumOrders().subscribe((data)=>this.numOrders=data[0])
    this.httpService.getNumItens().subscribe((data)=>this.numItems=data[0])
  }
}
