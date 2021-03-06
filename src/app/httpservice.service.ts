import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DataService } from './data.service';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public url = environment.url
  public picUrl =this.url +  environment.picUrl;
  headJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  headFormData = {
    // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data ; boundary=------WebKitFormBoundaryQ8Azbp01YyrJzr65  '  })
    // headers: new HttpHeaders({ 'Content-Type': 'form-data'  })
    headers: new HttpHeaders()
  };
  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {
    console.log('env',this.url,this.picUrl)
   }

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

  uploudProduct(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'admin/add', fromData, this.headFormData);
  }
  updateProduct(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'admin/update', fromData, this.headFormData);
  }
  generateCart(): Observable<any> {
    return this.http.post<any>(this.url + 'api/create_cart', this.dataService.entryDetails, this.headJson);
  }
  getDetailsCart(cartId): Observable<any> {
    this.dataService.entryAndData.data ={
      "cartID": cartId
    };
    return this.http.post<any>(this.url + 'api/items_cart', this.dataService.entryAndData, this.headJson);
  }
  addProductToCart(cartId: number, productId: number, Quantity: number): Observable<any> {
    this.dataService.entryAndData.data = {
      "cartID": cartId,
      "product_id": productId,
      "Quantity": Quantity,
    };
    return this.http.post<any>(this.url + 'api/add_to_cart', this.dataService.entryAndData, this.headJson);
  }
  createShiping(shpingDitails): Observable<any> {
    this.dataService.entryAndData.data = shpingDitails;
    return this.http.post<any>(this.url + 'api/update_ship', this.dataService.entryAndData, this.headJson);
  }
  removeProdFromCart(productId): Observable<any> {
    this.dataService.entryAndData.data ={
      "itemID": productId
    };
    return this.http.post<any>(this.url + 'api/delete_item_cart', this.dataService.entryAndData, this.headJson);
  }
  removeAllProd(cartID): Observable<any> {
    this.dataService.entryAndData.data ={
      "cartID": cartID
    };
    return this.http.post<any>(this.url + 'api/delete_item_cart', this.dataService.entryAndData, this.headJson);
  }
  getBusyDays(): Observable<any> {
    return this.http.post<any>(this.url + 'api/busy_day', this.dataService.entryDetails, this.headJson);
  }


}
