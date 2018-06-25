import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { BookStoreService } from '../../../services/book-store.service';
import { Router } from '@angular/router';
import { ICountry, IShipmentArea } from '../../../../Models';

@Component({
  selector: 'app-club-registration',
  templateUrl: './club-registration.component.html',
  styleUrls: ['./club-registration.component.scss']
})
export class ClubRegistrationComponent implements OnInit {
  isValidDetailsProvided: boolean = true;
  loginName: string = '';
  password: string = '';
  reEnterPassword: string = '';
  email: string = '';
  city: string = '';
  country: string = '';
  street: string = '';
  houseNumber: number = 0;
  phoneNumber: string = '';
  isPasswordMatch: boolean = true;
  isEmailValid: boolean = true;
  customerId: number;
  pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
  errorMessage: string;
  countries: ICountry[] = [];
  shipmentAreas: IShipmentArea[] = [];

  constructor(private router: Router, private customerService: CustomerService, private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.getCountries();
    this.getShipmentAreas();
  }

  getCountries() {
    this.bookStoreService.getCountries().
      subscribe(response => this.countries = response)
  }

  getShipmentAreas() {
    this.bookStoreService.getShipmentAreas()
      .subscribe(response => this.shipmentAreas = response);
  }

  changeModel() {
    if (this.customerId && this.loginName && this.password && this.reEnterPassword && this.isPasswordMatch && this.isEmailValid && this.phoneNumber && this.city, this.street) {
      this.isValidDetailsProvided = true;
    }
    else {
      this.isValidDetailsProvided = false;
    }
  }

  validatePassword() {
    if (this.password == this.reEnterPassword) {
      this.isPasswordMatch = true;
      this.changeModel();
    }
    else {
      this.isPasswordMatch = false;
      this.isValidDetailsProvided = false;
    }
  }

  validateEmail() {
    var regex = new RegExp(this.pattern);
    if (regex.exec(this.email) && this.email == regex.exec(this.email)[0]) {
      this.isEmailValid = true;
      this.changeModel();
    }
    else {
      this.isEmailValid = false;
      this.isValidDetailsProvided = false;
    }
  }

  add() {
    var index = this.countries.findIndex(c => c.Country == this.country);
    var memberCountry = this.countries[index];
    debugger;
    this.customerService.addClubMember(this.customerId, this.loginName, this.password,
      memberCountry, this.city, this.street, this.houseNumber, this.email, this.phoneNumber, new Date())
      .subscribe(response => {
        return;
      },
        error => this.errorMessage = <any>error)
  }

  cancel() {
    this.router.navigate(['./home']);
  }

}
