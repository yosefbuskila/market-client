import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../httpservice.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  tried;
  profileForm = this.fb.group({    
      city: [''],
      street: [''],
      shippingDate: [''],
      creditCard: ['']
  });
  controls=this.profileForm.controls;
  shippingDates=[]
  busyDays:[];
  dateNoValid;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
  ) {
    this.httpService.getBusyDays().subscribe(data=>{
      this.busyDays=data.data;
      let dateCorect=new Date()
          for(let i=0;i<10;i++){
            let day=this.formatDay(dateCorect)
            // let equel=day==this.formatDay(new Date(data.data[0].date_ship))
            // console.log(day,this.formatDay(new Date(data.data[0].date_ship)),equel,data.data[0].date_ship)
            this.shippingDates.push({date_ship:day,mark:this.chackDate(day)})
            dateCorect.setDate(dateCorect.getDate() + 1)
          }
    })
   }
   formatDay(date:Date){
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' +(d <= 9 ? '0' + d : d)  + '/' + (m<=9 ? '0' + m : m) + '/' + y;
   }
   chackDate(dayChack){
    let result=this.busyDays.filter(day=>{
      // console.log('CHCK',day['date_ship'],'|',dayChack,'|',this.formatDay(new Date(day['date_ship'])));
      // dayChack==this.formatDay(new Date(day['date_ship']))
      return dayChack==this.formatDay(new Date(day['date_ship']))
    })
    // console.log(dayChack,result)
    return result.length>0;
   }

  ngOnInit() {
  }
  onSubmit(){
    this.tried=true;
    console.log(this.dateNoValid)
  }
  onCoiceDate(event){
    this.dateNoValid=this.chackDate(event.target.value)
  }

}
