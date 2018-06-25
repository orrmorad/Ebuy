import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubRegistrationComponent } from './components/container/club-registration/club-registration.component';
import { HomeComponent } from './components/container/home/home.component';
import { ProductPurchaseComponent } from './components/container/product-purchase/product-purchase.component';
import { ShipmentAddressComponent } from './components/container/shipment-address/shipment-address.component';
import { QueryProductsComponent } from './components/container/query-products/query-products.component';
import { ChargeConfirmationComponent } from './components/container/charge-confirmation/charge-confirmation.component';
import { AdministrationComponent } from './components/container/administration/administration.component';
import { RegisterCasualPopupComponent } from './common/components/register-casual-popup/register-casual-popup.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'clubregistration', component: ClubRegistrationComponent },
    { path: 'productpurchase', component: ProductPurchaseComponent },
    { path: 'shipmentaddress', component: ShipmentAddressComponent },
    { path: 'queryproducts', component: QueryProductsComponent },
    { path: 'chargeconfirmation', component: ChargeConfirmationComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'casualpopup', component: RegisterCasualPopupComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }