import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails=localStorage['userDetails'];
entryDetails=localStorage['entryDetails'];
  constructor(private router:Router) {
    if(!this.entryDetails)
    this.router.navigate(['/logIn'])
   }

  ngOnInit() {
  }

}
