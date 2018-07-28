import { Injectable } from '@angular/core';
import { IProduct, IPrice,IDelivery } from '../../Models';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

//const uri = 'assets/data.json';
const uri = 'http://localhost:53920/api';

@Injectable()
export class PurchaseService {

  constructor(private http:Http) { }

  getDeliveryModes(): Observable<IDelivery[]> {
    return this.http.get(uri + '/values/GetDeliveryModes')
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getCreditCardTypes(){
    return this.http.get(uri + '/values/GetCreditCard')
    // .map(response => )
    .catch(this.handleErrorObservable);
  }


  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
