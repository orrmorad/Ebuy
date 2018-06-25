import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeScreenComponent } from './components/container/welcome-screen/welcome-screen.component';
import { CustomerLoginComponent } from './components/container/customer-login/customer-login.component';
import { ClubRegistrationComponent } from './components/container/club-registration/club-registration.component';
import { ContainerComponent } from './components/container/container.component';
import { HomeComponent } from './components/container/home/home.component';
import { ProductPurchaseComponent } from './components/container/product-purchase/product-purchase.component';
import { ShipmentAddressComponent } from './components/container/shipment-address/shipment-address.component';
import { QueryProductsComponent } from './components/container/query-products/query-products.component';
import { ChargeConfirmationComponent } from './components/container/charge-confirmation/charge-confirmation.component';
import { AdministrationComponent } from './components/container/administration/administration.component';
import { CustomerService } from './services/customer.service';
import { RegisterCasualPopupComponent } from './common/components/register-casual-popup/register-casual-popup.component';
import { ProductService } from './services/product.service';
import { BookStoreService } from './services/book-store.service';
import {PurchaseService} from './services/purchase.service';
import { AddressConfirmationPopupComponent } from './common/components/address-confirmation-popup/address-confirmation-popup.component';
import { ConfirmEqualValidatorDirective } from './common/confirm-equal-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeScreenComponent,
    CustomerLoginComponent,
    ClubRegistrationComponent,
    ContainerComponent,
    HomeComponent,
    ProductPurchaseComponent,
    ShipmentAddressComponent,
    QueryProductsComponent,
    ChargeConfirmationComponent,
    AdministrationComponent,
    RegisterCasualPopupComponent,
    AddressConfirmationPopupComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CustomerService,
    ProductService,
    BookStoreService,
    PurchaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
