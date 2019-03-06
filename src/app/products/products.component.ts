import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
categories=[{id:12,name:'milk'},{id:13,name:'fruits'}
,{id:14,name:'drinks'},{id:15,name:'wine'},{id:12,name:'milk'},{id:13,name:'fruits'},{id:14,name:'drinks'},{id:15,name:'wine'}
]
  constructor() { }

  ngOnInit() {
  }
  onChooseCat(event){
    console.log(event.target.id)
  }
}
