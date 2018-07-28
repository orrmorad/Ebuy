import { Component, OnInit, Input } from '@angular/core';
import { IDeliveryMode, IShipmentOption, ICardType } from '../product-purchase/product-purchase.component';
import { DeliveryMode, ShipmentOption, CreditCardType, ITransaction } from '../../../../Models';
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
  transaction: ITransaction = {} as ITransaction;
  isElectronically: boolean;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    //this.confirmation.products = this.productsInCart;
    this.initData();

    this.bookStoreService.confirm.subscribe(confirmation => {
      this.confirmation = confirmation;
      var a = Number(DeliveryMode[confirmation.deliveryMode]);
      this.isElectronically = a == 0;
      this.confirmation.totalPrice = 0;
      this.transaction.CreditCardType = this.confirmation.creditCardType;
      this.transaction.DeliveryMode = this.confirmation.deliveryMode;
      this.transaction.ShipmentCost = this.confirmation.shipmentCost;
      this.transaction.ShipmentOption = this.confirmation.shipmentOption;
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
    this.confirmation.totalPrice += this.confirmation.shipmentCost ? this.confirmation.shipmentCost : 0;
    this.transaction.TotalCost = this.confirmation.totalPrice;
  }
}

export class Confirmation {
  creditCardType: CreditCardType;
  cardNumber: number;
  owner: string;
  expiration: string;
  deliveryMode: DeliveryMode;
  deliveryDate: Date;
  shipmentOption: string;
  products: ProductInCart[];
  shipmentCost: number;
  totalPrice: number;
  email: string;
}
