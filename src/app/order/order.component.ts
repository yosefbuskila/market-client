import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../httpservice.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  tried;
  profileForm = this.fb.group({    
      city: ['bnei'],
      street: ['rabi akiva'],
      shippingDate: [''],
      creditCard: ['1234567']
  });
  controls=this.profileForm.controls;
  shippingDates=[]
  busyDays:[];
  dateNoValid;
  constructor(
    private router:Router,
    private dataService:DataService,
    private fb: FormBuilder,
    private httpService: HttpService,
  ) {
    this.httpService.getBusyDays().subscribe(data=>{
      this.busyDays=data.data;
      let dateCorect=new Date()
          for(let i=0;i<10;i++){
            let day=this.formatDay(dateCorect)
            let dayValue=this.formatDayValue(dateCorect)
            // let equel=day==this.formatDay(new Date(data.data[0].date_ship))
            // console.log(day,this.formatDay(new Date(data.data[0].date_ship)),equel,data.data[0].date_ship)
            this.shippingDates.push({date_ship:day,date_value:dayValue,mark:this.chackDate(dayValue)})
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
   formatDayValue(date:Date){
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y+'/' +(m<=9 ? '0' + m : m)+'/'+(d <= 9 ? '0' + d : d)   ;
   }
   chackDate(dayChack){
    let result=this.busyDays.filter(day=>{
      // console.log('CHCK',day['date_ship'],'|',dayChack,'|',this.formatDay(new Date(day['date_ship'])));
      // dayChack==this.formatDay(new Date(day['date_ship']))
      return dayChack==this.formatDayValue(new Date(day['date_ship']))
    })
    // console.log(dayChack,result)
    return result.length>0;
   }

  ngOnInit() {
  }
  onSubmit(){
    this.tried=true;
    if(this.dateNoValid || this.profileForm.invalid){
      alert('Please fill in all the fields according to the instructions!')
      return;
    }
    console.log(this.profileForm)
    console.log(this.profileForm.value.shippingDate)
    // let shipingDate=new Date(this.profileForm.value.shippingDate).toString()
    let shipingDitails={
      "cartID":this.dataService.cartId,
      "city": this.profileForm.value.city,
      "street": this.profileForm.value.street,
      "date":this.profileForm.value.shippingDate,
      "creditNam": this.profileForm.value.creditCard
        }
        console.log(shipingDitails)
    this.httpService.createShiping(shipingDitails).subscribe(date=>{
      if(date.sucess){
        this.router.navigate(['/ok'])
      }else alert('There is a problem accessing the server')
    },err=>{
      console.log('myErr',err)
      alert('There is a problem accessing the server')
    })
  }
  onCoiceDate(event){
    this.dateNoValid=this.chackDate(event.target.value)
  }
  onDblClickInp(){
    console.log('dbclicl')
    this.profileForm.patchValue   ({    
      city: this.dataService.userDetails.city,
      street: this.dataService.userDetails.street
  })
  }

}
