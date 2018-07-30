import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { BookStoreService } from '../../../services/book-store.service';
import { Router } from '@angular/router';
import { ICountry, IShipmentArea } from '../../../../Models';
import {UserService} from '../../../services/user-service.service';

@Component({
  selector: 'app-club-registration',
  templateUrl: './club-registration.component.html',
  styleUrls: ['./club-registration.component.scss']
})
export class ClubRegistrationComponent implements OnInit {
  isValidDetailsProvided: boolean = false;
  loginName: string = '';
  password: string = '';
  reEnterPassword: string = '';
  email: string = '';
  city: string = '';
  country: ICountry;
  street: string = '';
  houseNumber: string = '';
  phoneNumber: string = '';
  isPasswordMatch: boolean = false;
  isEmailValid: boolean = false;
  isLoginNameValid : boolean = true;
  isPasswordValid : boolean = true;
  customerId: number;
  emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
  passwordAndNamePattern = "^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9]*$";
  oneLetterOneNumberPattern = "([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*";
  errorMessage: string;
  countries: ICountry[] = [];
  shipmentAreas: IShipmentArea[] = [];


  constructor(private router: Router, private customerService: CustomerService, private bookStoreService: BookStoreService, private userService : UserService ) { }

  ngOnInit() {
    this.getCountries();
    this.getShipmentAreas();
  }

  getCountries() {
    this.bookStoreService.getCountries().
      subscribe(response => { this.countries = response })
  }

  getShipmentAreas() {
    this.bookStoreService.getShipmentAreas()
      .subscribe(response => this.shipmentAreas = response);
  }

  changeModel() {
    if (this.loginName && this.password && this.reEnterPassword && this.email && this.isPasswordMatch && this.isPasswordValid && this.isLoginNameValid && this.isEmailValid) {
      this.isValidDetailsProvided = true;
    }
    else {
      this.isValidDetailsProvided = false;
    }
  }

  validatePassword() {
    if (this.validionOfNameAndPassword(this.password) == true) {
      if (this.password == this.reEnterPassword) {
        this.isPasswordMatch = true;
        this.isPasswordValid = true;
        this.changeModel();
        return;
      }
    }
    this.isPasswordValid = false;
    this.isPasswordMatch = false;
    this.isValidDetailsProvided = false;
  }

  validionOfNameAndPassword(fieldToCheck: string) {
    var regexLettersAndNumbers = new RegExp(this.passwordAndNamePattern);
    var regexOneLetterOneNumber = new RegExp(this.oneLetterOneNumberPattern);
    if (regexLettersAndNumbers.exec(fieldToCheck) && fieldToCheck == regexLettersAndNumbers.exec(fieldToCheck)[0]) {
      if (fieldToCheck.length >= 6 && fieldToCheck.length <= 10) {
        if (regexOneLetterOneNumber.exec(fieldToCheck) && fieldToCheck == regexOneLetterOneNumber.exec(fieldToCheck)[0]) {
          return true;
        }
      }
    }
    return false;
  }

  validLoginName(){
    if(this.validionOfNameAndPassword(this.loginName) == true){
      this.isLoginNameValid = true;
      this.changeModel();
      return;
    }
    this.isLoginNameValid = false;
    this.isValidDetailsProvided = false;
  }

  validateEmail() {
    var regex = new RegExp(this.emailPattern);
    if (this.email && this.email != "" && regex.exec(this.email) && this.email == regex.exec(this.email)[0]) {
      this.isEmailValid = true;
      this.changeModel();
    }
    else {
      this.isEmailValid = false;
      this.isValidDetailsProvided = false;
    }
  }

  changeCountry(index){
    this.country = this.countries[index];
  }

  add() {
    this.customerService.addClubMember(this.customerId, this.loginName, this.password,
      this.country, this.city, this.street, this.houseNumber, this.email, this.phoneNumber, new Date())
      .subscribe(response => {
        if(response.status == 200){
          alert("welcome to Ebuy "+ this.loginName);
          this.customerService.getClubMemberByNameAndPassword(this.loginName,this.password)
          .subscribe(
            response => {
              this.userService.updateUser(response);
              localStorage.setItem('loggedInUser', JSON.stringify(response));
              this.router.navigate(['./productpurchase']);
            }
          )
          
        }
        else{
          alert("someting went error");
          this.router.navigate(['./home']);
        }
        
      },
        error => this.errorMessage = <any>error)
  }

  cancel() {
    this.router.navigate(['./home']);
  }

}
