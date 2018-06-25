import { Component, OnInit } from '@angular/core';
import { productsInCart } from '../product-purchase/product-purchase.component'
import { Http } from '@angular/http'
import { IClubMember, IProduct, IStoreObject, IPrice } from '../../../../Models';
import { CustomerService } from '../../../services/customer.service';
import { BookStoreService } from '../../../services/book-store.service';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-products',
  templateUrl: './query-products.component.html',
  styleUrls: ['./query-products.component.scss']
})
export class QueryProductsComponent implements OnInit {

  productsList: IProduct[] = [];
  productsInCart: ProductInCart[] = [];
  tempProductsInCart: ProductInCart[] = [];
  products: IProduct[];
  isCartDisplayed: boolean = false;
  author: string;
  title: string;
  keyword: string;
  category: string;
  specificDate: Date = null;
  startDate: Date = null;
  endDate: Date = null;
  isSpecificChecked: boolean = true;

  constructor(private bookStoreService: BookStoreService,
    private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.bookStoreService.cart.subscribe(products => this.productsInCart = products);
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response;
      });
  }

  getResults() {
    this.productService.getProductsByQuery(this.title, this.author, this.keyword, this.specificDate,
      this.startDate, this.endDate, this.isSpecificChecked)
      .subscribe(response => {
        this.productsList = response;
      });
  }

  selectProduct(product) {
    product.isSelected = !product.isSelected;
    this.tempProductsInCart.push(new ProductInCart(product));
  }

  addToCart() {
    this.bookStoreService.addToCart(this.tempProductsInCart);
  }

  navgiateToPurchasePage() {
    this.router.navigate(['./productpurchase']);
  }
}

export class ProductInCart {
  product: IProduct;
  isSelected: boolean;
  totalCost: number;
  vat: number;

  constructor(product: IProduct) {
    this.product = product;
    this.vat = 17;
    this.totalCost = this.product.Price * this.vat / 100 + this.product.Price;
  }
}
