import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public url = 'http://localhost:3001/';
  public picUrl = this.url + 'pic/';
  headJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }

  getNumOrders(): Observable<[number]> {
    return this.http.get<[number]>(this.url + 'gen/sum/orders');
  }
  getNumItens(): Observable<[number]> {
    return this.http.get<[number]>(this.url + 'gen/sum/items');
  }
  logIn(logInData): Observable<any> {
    return this.http.post<any>(this.url + 'user/login', logInData, this.headJson);
  }
  getLastOrder(entryDetails): Observable<any> {
    return this.http.post<any>(this.url + 'api/last_order', entryDetails, this.headJson);
  }
  register(regDetails): Observable<any> {
    return this.http.post<any>(this.url + 'user/reg', regDetails, this.headJson);
  }

  chacIdEmail(id: string, email: string): Observable<any[]> {
    let responseId = this.http.get(this.url + 'user/exist/personal_number/' + id);
    let responseEmail = this.http.get(this.url + 'user/exist/email/' + email);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([responseId, responseEmail]);
  }
  getcategories(): Observable<any> {
    return this.http.post<any>(this.url + 'api/categories', this.dataService.entryDetails, this.headJson);
  }
  getcategoryById(categoryId): Observable<any> {
    return this.http.post<any>(this.url + 'api/product/category/' + categoryId, this.dataService.entryDetails, this.headJson);
  }
  getcategoryByStr(categoryStr): Observable<any> {
    return this.http.post<any>(this.url + 'api/product/name/' + categoryStr, this.dataService.entryDetails, this.headJson);
  }



}
