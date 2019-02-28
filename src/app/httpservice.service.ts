import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url='http://localhost:3000/';
  heaJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  getNumOrders():Observable<[number]>{
    return this.http.get<[number]>(this.url+'gen/sum/orders');
  }
  getNumItens():Observable<[number]>{
    return this.http.get<[number]>(this.url+'gen/sum/items');
  }
  logIn(logInData):Observable<any>{
    return this.http.post<any>(this.url+'user/login',logInData,this.heaJson);
  }
  getLastOrder(entryDetails):Observable<any>{
    return this.http.post<any>(this.url+'api/last_order',entryDetails,this.heaJson);
  }
}
