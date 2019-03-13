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

numProducts=1;
sumOrders=0;
hiddenProp=false;
marketSwitch=true;
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
    if(this.dataService.lastOrder.length===0 || this.dataService.lastOrder[0].done===1){
      this.httpService.generateCart().subscribe(data=>{
        this.dataService.cartId=data.id;
        // this.getDetailsCart();
      })
    }
    else{
      this.dataService.cartId=this.dataService.lastOrder[0].id;
      this.getDetailsCart();
    }
    
  }
  getDetailsCart(){
    this.httpService.getDetailsCart(this.dataService.cartId).subscribe(data=>{
      console.log('details cart',data)
      this.dataService.detailsCart=data.data;
      this.sumOrders=0;
      this.dataService.detailsCart.forEach(element => {
        this.sumOrders+=element.price_sum;
      });
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
    this.httpService.addProductToCart(this.dataService.cartId,this.dataService.productChoice.id,this.numProducts).subscribe(date=>{
      if(date.sucess){
        this.dataService.productChoice=null;
        this.getDetailsCart()

      }
    })   
  }
  deliteProduct(productId){
    this.httpService.removeProdFromCart(productId).subscribe(data=>{
      if(data.sucess){
        this.getDetailsCart()
      }
    })
  }
  deleteAllOrder(){
    this.httpService.removeAllProd(this.dataService.cartId).subscribe(data=>{
      if(data.sucess){
        this.getDetailsCart()
      }
    })
  }
  onSearch(event){
    this.dataService.detailsCart.forEach(element => {
      if(element.name.toLowerCase().includes(event.target.value.toLowerCase()) )
        element.focus=true;
        else
        element.focus=false;
        if(event.target.value==='')
        element.focus=false;      
    });



    // console.log(this.detailsCart)
  }

}
