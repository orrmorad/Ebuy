import { Component, OnInit } from '@angular/core';
import { DeliveryMode, ShipmentOption, CreditCardType, IProduct, IPrice, IDelivery, ITransaction, ICreditCardType, IShipmentDetails } from '../../../../Models';
import { Confirmation } from '../charge-confirmation/charge-confirmation.component';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BookStoreService } from '../../../services/book-store.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription'
import { ProductInCart } from '../query-products/query-products.component';
import { UserService } from '../../../services/user-service.service';

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
  expiration: string = "";
  owner: string = "";
  deliverySelected: boolean = false;
  shipmentValid: boolean = true;
  isFieldsValid: boolean = false;
  shipmentMode: number;
  showAddressDetailsPopup: boolean = false;
  productsObservable: Observable<IProduct[]>;
  productId: number;
  productsToRemove: number[] = [];
  isRemoveButtonEnabled = false;
  selectedDeliveryMode: string;
  productsInCart: ProductInCart[] = [];
  confirmation: Confirmation = new Confirmation();
  shipmentPrices: Object[] = [];
  creditCardsTypes: ICreditCardType[] = [];
  shipmentCompany: string;
  shipmentDetails: IShipmentDetails;

  constructor(private productService: ProductService, private purchaseService: PurchaseService,
    private router: Router, private bookStoreService: BookStoreService, private userService: UserService) { }

  ngOnInit() {
    this.initData();
    this.getProducts();
    this.typeChanged("American Express");
  }

  initData() {

    this.getDeliveryModes();
    this.getCreditCardTypes();
    this.bookStoreService.cart.subscribe(products => this.productsInCart = products);
    this.shipmentOptions = [{ id: ShipmentOption.AirExpress, data: "Air Express" },
    { id: ShipmentOption.AirStandard, data: "Air Standard" }, { id: ShipmentOption.Boat, data: 'Boat' }];
    this.creditCards = [{ id: CreditCardType.AmericanExpress, data: 'American Express' },
    { id: CreditCardType.Mastercard, data: 'Mastercard' }, { id: CreditCardType.Visa, data: "Visa" }];

  }

  getCreditCardTypes() {
    this.purchaseService.getCreditCardTypes().subscribe(response => {
      this.creditCardsTypes = JSON.parse(response._body);
    })

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
    let option = this.shipmentOptions[e];
    this.shipmentMode = option.id;
    this.shipmentCompany = option.data;
    this.shipmentValid = true;
    this.checkIfValid();
  }


  checkIfValid() {
    this.confirmation.shipmentOption = this.shipmentCompany;
    //this.bookStoreService.createConfirmation(this.confirmation);
    let isOwnerValid = this.confirmation.owner != undefined && this.confirmation.owner != "";
    let isExpirationValid = this.confirmation.expiration != undefined && this.confirmation.expiration != "";
    this.isFieldsValid = this.productsInCart.length != 0 && this.deliverySelected && this.shipmentValid && this.confirmation.cardNumber != 0 && isOwnerValid && isExpirationValid;
  }

  goToConfirmation() {
    let response = this.validCreditCard();
    if (response) {
      return;
    }
    else {
      response = null;
      response = this.validExpirationDate();
      if (response) {
        return;
      }
      else {
        if (this.selectedDeliveryMode === 'electronically') {
          if (this.shipmentDetails.Email == "" || this.shipmentDetails.Email == undefined) {
            alert("please enter emaill in the shipment address button");
            return;
          }
          this.confirmation.email = this.shipmentDetails.Email;
        }
        this.calcShipmentCost()
        this.bookStoreService.createConfirmation(this.confirmation);
        this.router.navigate(['./chargeconfirmation']);
      }
    }
  }

  calcShipmentCost() {
    if (this.selectedDeliveryMode === 'electronically') {
      this.confirmation.shipmentCost = 0;
      this.confirmation.deliveryDate = new Date();
      this.confirmation.deliveryDate.setDate(this.confirmation.deliveryDate.getDate() + 1);
      return;
    }
    this.bookStoreService.getShipmentPrices().subscribe(response => {
      this.shipmentPrices = JSON.parse(response._body);
      let options;

      let shipmentArea = this.userService.shippmentArea;
      options = this.shipmentPrices.filter((option: any) => {
        return option.Area == shipmentArea && option.ShipmentOption == this.shipmentMode
      });
      this.findBestShipmentCost(options);
    });
  }

  findBestShipmentCost(options) {
    let bestOption: any = {};
    let optionsPrices = [];
    options.forEach(o => {
      let shipmentCost = o.BasicCharge + o.ItemCharge * this.products.length;
      optionsPrices.push({ shipmentCost: shipmentCost, duration: o.ShipmentDuration, name: o.CompanyName });
    })
    bestOption = optionsPrices[0];
    for (let i = 1; i < optionsPrices.length; i++) {
      if (optionsPrices[i].shipmentCost < bestOption.shipmentCost)
        bestOption = optionsPrices[i]
      if (optionsPrices[i].shipmentCost == bestOption.shipmentCost)
        if (optionsPrices[i].duration < bestOption.duration)
          bestOption = optionsPrices[i];
    }
    this.confirmation.shipmentCost = bestOption.shipmentCost;
    console.log("bestOption.duration : " + bestOption.duration);
    this.confirmation.deliveryDate = new Date();
    this.confirmation.deliveryDate.setDate(this.confirmation.deliveryDate.getDate() + bestOption.duration);

  }

  validCreditCard() {
    if (typeof (this.confirmation.cardNumber) != 'number') {
      alert("Card number must be number");
      return 'error';
    }

    let card: any = this.creditCards.filter(e => { if (e.data == this.confirmation.creditCardType.toString()) return e; })
    let validCard = this.creditCardsTypes.filter(e => { if (e.Type == card[0].id) return e; });

    return this.checkValidionOfCard(validCard[0]);

  }

  validExpirationDate() {
    let today = new Date();

    if (this.confirmation.expiration.length != 5) {
      alert("Invalid expiration date");
      return 'error';
    }
    if (this.confirmation.expiration.includes('/', 1) == false) {
      alert("Invalid expiration date");
      return 'error';
    }

    if(this.confirmation.expiration.indexOf('/') != 2){
      alert("Invalid expiration date");
      return 'error';
    }

    let month = Number(this.confirmation.expiration.slice(0,2));
    let year = Number(this.confirmation.expiration.slice(3,5));

    if(month == NaN || year == NaN){
      alert("Invalid expiration date");
      return 'error';
    }

    if(month < 0 ||  month > 13){
      alert("Invalid expiration date");
      return 'error';
    }

    month--;
    year = year + 2000;

    let expirationDate = new Date(year,month,1);
    today = new Date (today.getFullYear(),today.getMonth(),1);

    if(today.getTime() > expirationDate.getTime()){
      alert("Invalid expiration date");
      return 'error';
    }

  }

  checkValidionOfCard(validCard) {
    let checkError = '9';
    checkError = validCard.Prefix + checkError.repeat(validCard.NumOfDigit - 4);

    if (this.confirmation.cardNumber.toString().length != validCard.NumOfDigit) {
      alert(`Card number must be ${validCard.NumOfDigit} numbers`);
      return 'error';
    }
    if (this.confirmation.cardNumber.toString().slice(0, 4) != validCard.Prefix) {
      alert(`Card number is invalid`);
      return 'error';
    }

    if(this.confirmation.cardNumber.toString() === checkError){
      alert(`Card number is invalid`);
      return 'error';
    }
  }

  highlight(product, index) {
    product.isSelected = !product.isSelected;
    if (product.isSelected == true) {
      this.productsToRemove.push(index);
    }
    else {
      let indexToRemove = this.productsToRemove.indexOf(index);
      this.productsToRemove.splice(indexToRemove, 1);
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
    if (this.productsInCart.length == 0) { this.isRemoveButtonEnabled = false }
    this.bookStoreService.addToCart(this.productsInCart);
  }

  navigateToQuery() {
    this.router.navigate(['./queryproducts']);
  }

  confirm(e) {
    this.shipmentDetails = e;
    //debugger;
  }

  cancle(e) {
    this.shipmentDetails = e;
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