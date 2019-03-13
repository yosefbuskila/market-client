import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ok',
  templateUrl: './ok.component.html',
  styleUrls: ['./ok.component.css']
})
export class OkComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }
  download(){
    console.log('down')
  }
  onOk(){
    this.router.navigate(['/home'])
  }

}
