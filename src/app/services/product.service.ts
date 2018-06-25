import { Injectable } from '@angular/core';
import { IProduct, IPrice } from '../../Models';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

//const uri = 'assets/data.json';
const uri = 'http://localhost:53920/api';
@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(uri + '/values/getProducts')
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getProductsByQuery(title: string, author: string, keywords: string,
    specificDate: Date, startDate: Date, endtDate: Date, isSpecificChecked:boolean): Observable<IProduct[]> {
    title = title || ' ';
    author = author || ' ';
    keywords = keywords || ' ';
    specificDate = specificDate || undefined;
    startDate = startDate || undefined;
    endtDate = endtDate || undefined;
    return this.http.get(uri + `/values/GetProductsByQuery/${title}/${author}/${keywords}/${specificDate}/${startDate}/${endtDate}/${isSpecificChecked}`)
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getPrices(): Observable<IPrice[]> {
    return this.http.get('assets/data.json')
      .map(response => response.json()['prices'])
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
