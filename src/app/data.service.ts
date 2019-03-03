import { Injectable } from '@angular/core';
import { setPreviousOrParentTNode } from '@angular/core/src/render3/state';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userDetails;
  public entryDetails;
  public name='guest';
  constructor() {
    this.setProp();
   }

setProp(){
  if(localStorage['userDetails']){
  this.userDetails=JSON.parse( localStorage['userDetails']);
  this.entryDetails=JSON.parse(localStorage['entryDetails'])
  this.name=this.userDetails.first_name +' '+this.userDetails.last_name;
  };
}

}
