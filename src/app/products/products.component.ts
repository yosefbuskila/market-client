import { Component, OnInit } from '@angular/core';
import { HttpService } from '../httpservice.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products;
valueSearch;

  constructor(
    private httpService:HttpService,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.httpService.getcategories().subscribe(data=>{
      this.dataService.categories=data.data;
      this.onChooseCat(this.dataService.categories[0])
    })
  }
  onChooseCat(category){
    console.log(category)
    this.httpService.getcategoryById(category.id).subscribe(data=>{
      this.products=data.data;
    })
  }
  onClickProduct(data){
    this.dataService.productChoice=data;
  }
  onSearch(){
    this.httpService.getcategoryByStr(this.valueSearch).subscribe(data=>{
      this.products=data.data;
    })

    console.log('search',this.valueSearch)
  }
  onKeyInp(event){
    if(event.charCode===13)
    this.onSearch();
  }
}
