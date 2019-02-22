import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private url='http://localhost:3000/';
  constructor(private http:HttpClient) { }

  getNumOrders():Observable<[number]>{
    return this.http.get<[number]>(this.url+'gen/sum/orders');
  }
  getNumItens():Observable<[number]>{
    return this.http.get<[number]>(this.url+'gen/sum/items');
  }
}
