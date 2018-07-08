import { Component, OnInit } from '@angular/core';
import { DeliveryMode, ShipmentOption, CreditCardType, IProduct, IPrice, IDelivery, ITransaction } from '../../../../Models';
import { Confirmation } from '../charge-confirmation/charge-confirmation.component';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BookStoreService } from '../../../services/book-store.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription'
import { ProductInCart } from '../query-products/query-products.component';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit {

  deliveryMode: IDelivery[];
  deliveryModes: IDeliveryMode[];
  shipmentOptions: IShipmentOption[];
  creditCards: ICardType[];
  products: IProduct[];
  prices: IPrice[];
  isShipmentOptionEnabled: boolean;
  //productsInCart: productsInCart[] = [];
  cardNumber: number = 0;
  expiration : string = "";
  owner : string = "";
  deliverySelected: boolean = false;
  shipmentValid: boolean = true;
  isFieldsValid: boolean = false;
  shipmentMode: ShipmentOption;
  showAddressDetailsPopup: boolean = false;
  productsObservable: Observable<IProduct[]>;
  productId: number;
  productsToRemove: number[] = [];
  isRemoveButtonEnabled = false;
  selectedDeliveryMode: DeliveryMode;
  productsInCart: ProductInCart[] = [];
  confirmation: Confirmation = new Confirmation();
  shipmentPrices : object[] = [];

  constructor(private productService: ProductService, private purchaseService: PurchaseService,
    private router: Router, private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.initData();
    this.getProducts();
    this.typeChanged("American Express");
  }

  initData() {

    this.getDeliveryModes();
    this.bookStoreService.cart.subscribe(products => this.productsInCart = products);
    this.shipmentOptions = [{ id: ShipmentOption.AirExpress, data: "Air Express" },
    { id: ShipmentOption.AirStandard, data: "Air Standard" }, { id: ShipmentOption.Boat, data: 'Boat' }];
    this.creditCards = [{ id: CreditCardType.AmericanExpress, data: 'American Express' },
    { id: CreditCardType.Mastercard, data: 'Mastercard' }, { id: CreditCardType.Visa, data: "Visa" }];

  }

  getDeliveryModes() {
    this.purchaseService.getDeliveryModes()
      .subscribe(response => {
        this.deliveryMode = response;
      });
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response;
      });
  }

  changeDeliveryMode(value) {
    this.selectedDeliveryMode = value;
    this.confirmation.deliveryMode = DeliveryMode[DeliveryMode[value]];
    this.isShipmentOptionEnabled = (value == 'hard');
    this.deliverySelected = true;
    if (this.isShipmentOptionEnabled && this.shipmentMode != null) {
      this.shipmentValid = true;
    }
    else if (!this.isShipmentOptionEnabled) {
      this.shipmentValid = true;
    }
    else {
      this.shipmentValid = false;
    }
    this.checkIfValid();
  }

  typeChanged(e) {
    this.confirmation.creditCardType = e;
  }

  changeShipmentMode(e) {
    this.shipmentMode = e;
    this.shipmentValid = true;
    this.checkIfValid();
  }


  checkIfValid() {
    this.confirmation.shipmentOption = this.shipmentMode;
    this.bookStoreService.createConfirmation(this.confirmation);
    let isOwnerValid = this.confirmation.owner != undefined &&  this.confirmation.owner != "";
    let isExpirationValid = this.confirmation.expiration != undefined && this.confirmation.expiration !="";
    this.isFieldsValid = this.productsInCart.length != 0 && this.deliverySelected && this.shipmentValid && this.confirmation.cardNumber != 0 && isOwnerValid && isExpirationValid ;
  }

  goToConfirmation() {
    this.calcShipmentCost()
    // this.bookStoreService.createConfirmation(this.confirmation);
    this.router.navigate(['./chargeconfirmation']);
  }

  calcShipmentCost (){
    this.bookStoreService.getShipmentPrices().subscribe(response => {
      this.shipmentPrices = JSON.parse(response._body);
      let options;
      this.shipmentPrices.forEach(option=>{

      })
      debugger;
    });
  }

  highlight(product,index) {
      product.isSelected = !product.isSelected;
      if (product.isSelected == true) {
        this.productsToRemove.push(index);
      }
      else {
        this.productsToRemove.splice(index, 1);
      }

      if (this.productsToRemove.length > 0) this.isRemoveButtonEnabled = true;
       else this.isRemoveButtonEnabled = false;
  }

  removeFromCart() {
    this.productsToRemove.forEach(index => {
      this.productsInCart[index].isSelected = false;
      this.productsInCart.splice(index, 1);
    });
    this.productsToRemove = [];
    if(this.productsInCart.length == 0){ this.isRemoveButtonEnabled = false}
    this.bookStoreService.addToCart(this.productsInCart);
  }

  navigateToQuery() {
    this.router.navigate(['./queryproducts']);
  }

  confirm(e) {
    debugger;
  }
}

export interface IDeliveryMode {
  id: DeliveryMode;
  data: string;
}

export interface IShipmentOption {
  id: ShipmentOption;
  data: string;
}

export interface ICardType {
  id: CreditCardType;
  data: string;
}

export class productsInCart {
  productId: number;
  productName: string;
  price: number;
  isSelected: boolean = false;

  constructor(id: number, name: string, price: number) {
    this.productId = id;
    this.productName = name;
    this.price = price;

  }
}