import { Component } from '@angular/core';
import{HttpService} from './httpservice.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameOfUser = 'guest';
  private numOrders:number;
  private numItems:number;
  constructor(private httpService:HttpService){  }
  ngOnInit() {
    this.getNums();
  }
  getNums(){
    this.httpService.getNumOrders().subscribe((data)=>this.numOrders=data[0])
    this.httpService.getNumItens().subscribe((data)=>this.numItems=data[0])
  }
}
