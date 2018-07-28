import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryMode, ICountry } from '../../../../Models';
import { BookStoreService } from '../../../services/book-store.service';
import { CustomerService } from '../../../services/customer.service'
import { IShipmentDetails } from '../../../../Models';
import { UserService } from '../../../services/user-service.service'

@Component({
  selector: 'app-shipment-address',
  templateUrl: './shipment-address.component.html',
  styleUrls: ['./shipment-address.component.scss']
})
export class ShipmentAddressComponent implements OnInit {
  countries: ICountry[] = [];
  selectedCountryId: number;
  states: string[];
  isStateEnabled: boolean;
  country: ICountry;
  street: string;
  houseNumber: number;
  zipCode: number;
  pob: number;
  city: string;
  reciever: string;
  showPopup: boolean = false;
  addressDetails: any;
  loggedInUser: any = null;
  state: string;
  email : string;
  shipmentDetails: IShipmentDetails = {} as IShipmentDetails;
  @Input() deliveryMode: string;
  @Output() OnCloseConfirm = new EventEmitter<any>();
  @Output() OnClose = new EventEmitter<any>();

  constructor(private router: Router, private customerService: CustomerService, private UserService: UserService) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.UserService.updateUser(this.loggedInUser);
    this.selectedCountryId = this.loggedInUser.Country.CountryId;

    this.initData();
    this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connticut', 'Delaware', 'Columbia',
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Luisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississipi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming'];
  }

  initData() {
    this.getCountries();
    this.city = this.loggedInUser.City;
    this.street = this.loggedInUser.Street;
    this.houseNumber = this.loggedInUser.HouseNumber;
  }

  getCountries() {
    this.customerService.getCountries()
      .subscribe(response => {
        this.countries = response;
        localStorage.setItem('countries', JSON.stringify(this.countries));
        this.changeCountry();
      })
  }

  changeCountry() {
    var index = this.countries.findIndex(c => c.CountryId == this.selectedCountryId);
    this.isStateEnabled = (this.countries[index].Country == 'USA');
    this.country = this.countries[index];
  }

  onCloseAccept() {
    this.shipmentDetails.Country = this.country;
    this.shipmentDetails.City = this.city;
    this.shipmentDetails.HouseNumber = this.houseNumber;
    this.shipmentDetails.Street = this.street;
    this.shipmentDetails.ZipCode = this.zipCode;
    this.shipmentDetails.Pob = this.pob;
    this.shipmentDetails.State = this.state;
    this.shipmentDetails.Email = this.email;
    this.OnCloseConfirm.emit(this.shipmentDetails);
  }

  onCloseCancel() {
    this.shipmentDetails.Country = undefined;
    this.shipmentDetails.City = '';
    this.shipmentDetails.HouseNumber = undefined;
    this.shipmentDetails.Street = '';
    this.shipmentDetails.ZipCode = undefined;
    this.shipmentDetails.Pob = undefined;
    this.shipmentDetails.State = undefined;
    this.shipmentDetails.Email = '';
    this.OnClose.emit(this.shipmentDetails);
  }

}
