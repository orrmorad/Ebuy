import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http'
import { IClubMember, IProduct, IStoreObject } from '../../../../Models';
import { CustomerService } from '../../../services/customer.service';
import { BookStoreService } from '../../../services/book-store.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productsInCartObservable: Observable<IProduct[]>;
  productsInStoreObservable: Observable<IProduct[]>;
  productsInStore: IProduct[];
  productsInCart: IProduct[];

  constructor(private http: Http, private customerService: CustomerService, private bookStoreService: BookStoreService) { }
  apiValues: string[] = [];
  @Input() showPopup = false;

  ngOnInit() {
    // this.productsInCartObservable = this.bookStoreService.products;
    // this.productsInCartObservable.subscribe(products => this.productsInCart = products)
    // this.productsInStoreObservable = this.bookStoreService.productsInStore;
    // this.productsInStoreObservable.subscribe(products => this.productsInStore = products)
    // this.bookStoreService.loadAll();
  }
}
