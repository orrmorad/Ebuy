import { Component, OnInit, Input } from '@angular/core';
import { IDeliveryMode, IShipmentOption, ICardType } from '../product-purchase/product-purchase.component';
import { DeliveryMode, ShipmentOption, CreditCardType, IProduct } from '../../../../Models';
import { BookStoreService } from '../../../services/book-store.service';
import { ProductInCart } from '../query-products/query-products.component';

const vat: number = 17;
@Component({
  selector: 'app-charge-confirmation',
  templateUrl: './charge-confirmation.component.html',
  styleUrls: ['./charge-confirmation.component.scss']
})

export class ChargeConfirmationComponent implements OnInit {

  deliveryModes: IDeliveryMode[] = [];
  shipmentOptions: IShipmentOption[] = [];
  creditCards: ICardType[] = [];
  headers: string[] = [];
  confirmation: Confirmation = new Confirmation();
  productsInCart: ProductInCart[];
  vat: number = vat;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    //this.confirmation.products = this.productsInCart;
    this.initData();

    this.bookStoreService.confirm.subscribe(confirmation => {
      this.confirmation = confirmation;
      this.confirmation.totalPrice = 0;
    });
    this.bookStoreService.cart.subscribe(cart => {
      this.confirmation.products = cart;
    });
  }

  initData() {
    this.headers = ['Item #', 'Title', 'Basic Cost', 'VAT', 'Total Cost'];
  }

  calcTotalPrice() {
    this.confirmation.products.forEach(p => {
      this.confirmation.totalPrice += p.totalCost;
    });
    this.confirmation.totalPrice += this.confirmation.shipmentCost;
  }
}

export class Confirmation {
  creditCardType: CreditCardType;
  cardNumber: number;
  owner: string;
  deliveryMode: DeliveryMode;
  deliveryDate: Date;
  shipmentOption: ShipmentOption;
  products: ProductInCart[];
  shipmentCost: number;
  totalPrice: number;
}
