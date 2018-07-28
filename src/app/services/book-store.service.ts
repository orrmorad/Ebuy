import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { ProductInCart } from '../components/container/query-products/query-products.component';
import { Confirmation } from '../components/container/charge-confirmation/charge-confirmation.component'
import { IProduct, IPurchasedProduct, DeliveryMode, IShipmentArea, ICountry, IClubMember } from '../../Models';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

const uri = 'http://localhost:53920/api';
@Injectable()
export class BookStoreService {
  private productInCart = new BehaviorSubject<ProductInCart[]>([]);
  private productsInStore = new BehaviorSubject<IProduct[]>([]);
  private confirmation = new BehaviorSubject<Confirmation>(null);
  private countries = new BehaviorSubject<ICountry[]>([])
  private shipmentAreas = new BehaviorSubject<IShipmentArea[]>([]);
  cart = this.productInCart.asObservable();
  store = this.productsInStore.asObservable();
  confirm = this.confirmation.asObservable();
  country = this.countries.asObservable();
  shipmentArea = this.shipmentAreas.asObservable();

  constructor(private http: Http) { }

  addToCart(products: ProductInCart[]) {
    this.productInCart.next(products)
  }

  editProducts(products: IProduct[]) {
    this.productsInStore.next(products);
  }

  createConfirmation(confirmation: Confirmation) {
   // var _deliveryDate = new Date();
   // confirmation.deliveryDate = new Date();
    // if (DeliveryMode[DeliveryMode.electronically] == DeliveryMode[DeliveryMode[confirmation.deliveryMode]]) {
    //   confirmation.deliveryDate.setDate(_deliveryDate.getDate() + 1);
    //   confirmation.shipmentCost = 0;
    // }
    this.confirmation.next(confirmation);
  }

  getCountries() {
    return this.http.get(uri + '/customer/GetCountries').
      map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getShipmentAreas() {
    return this.http.get(uri + '/customer/GetShipmentAreas')
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getShipmentPrices(){
    return this.http.get(uri + '/values/GetShipmentPrices')
      .map(response => response)
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
