import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DinamicService } from '../dinamic.service';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
cartId:number;
numProducts=1;

detailsCart:any=[];
  constructor(
    private httpService: HttpService,
    private dataService: DataService,
  ) {
    // this.numProducts=1;
    
      this.httpService.getLastOrder(this.dataService.entryDetails).subscribe((data) => {
        this.dataService.lastOrder = data.data;
        this.start()
      })
      }
  start() {
    console.log('last',this.dataService.lastOrder.length)
    if(this.dataService.lastOrder.length===0 || this.dataService.lastOrder.done===1){
      this.httpService.generateCart().subscribe(data=>{
        this.cartId=data.id;
        // this.getDetailsCart();
      })
    }
    else{
      this.cartId=this.dataService.lastOrder[0].id;
      this.getDetailsCart();
    }
    
  }
  getDetailsCart(){
    this.httpService.getDetailsCart(this.cartId).subscribe(data=>{
      console.log('details cart',data)
      this.detailsCart=data.data;
    })
  }

  ngOnInit() {
  }
  onClickModel(event){
    if(event.target.id==='myModal')
    this.dataService.productChoice=null;
  }
  addProduct(){
    if(!(this.numProducts>0)){
    alert('units is required');
    return;
    }
    this.httpService.addProductToCart(this.cartId,this.dataService.productChoice.id,this.numProducts).subscribe(date=>{
      if(date.sucess){
        this.dataService.productChoice=null;
        this.getDetailsCart()

      }
    })   
  }

}
