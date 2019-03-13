import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ok',
  templateUrl: './ok.component.html',
  styleUrls: ['./ok.component.css']
})
export class OkComponent implements OnInit {

  constructor(
    private router:Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
  }
  onDownload(){
    console.log('down')
    let dataFile='A receipt for your purchase. Super Market crazy. Company number: 159753222\n';
    let sum=0;
    console.log('aaa',this.dataService.detailsCart)
    this.dataService.detailsCart.forEach(el => {
      dataFile+=`name product: ${el.name}, unit price: ${el.price}₪, units:${el.units}, sum price: ${el.units*el.price}₪\n`
      sum+=el.units*el.price;
    });
    dataFile+=`total price of all purchase: ${sum.toFixed(2)}₪ \n`
    dataFile+='Thank you \nWe look forward to seeing you next time \nGood Bye'
    this.download(dataFile)
  }
  onOk(){
    this.router.navigate(['/home'])
  }
  download(text='some text',filename='receipt.txt') {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

}
