import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IClubMember, ICasualCustomer } from '../../../../Models';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { debug } from 'util';
import { UserService } from '../../../services/user-service.service'

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
  isCasualCustomerContactProvided: boolean;
  isValidDetailsProvided: boolean;
  clubMembers: any[];
  loginName: string = "";
  password: string = "";
  showPopup: boolean = false;
  loggedInUser: IClubMember;
  loginError: boolean;

  constructor(private http: Http, private customerService: CustomerService, private router: Router, private UserService : UserService) { }

  ngOnInit() {
    this.getClubMembers();
  }

  getClubMembers() {
    this.customerService.getClubMembers()
      .subscribe((response) => {
        this.clubMembers = response;
      });
  }

  loginDetailsChanged() {
    this.loginName = this.loginName.trim();
    this.isValidDetailsProvided = (this.loginName != "" && this.password != "");
  }

  getDetails(e: ICasualCustomer) {
    this.showPopup = false;
    this.customerService.addCasualMember(e.Name, e.Address, e.Email)
      .subscribe(response => {
        return;
      });
    this.isCasualCustomerContactProvided = true;
  }

  submit() {
    this.loginError = false;
    this.clubMembers.forEach(member => {
      if (member.LoginName === this.loginName && member.Password === this.password) {
        this.customerService.getClubMember(member.MemberId)
          .subscribe(
            response => {
              this.loggedInUser = response;
              this.UserService.updateUser(this.loggedInUser);
              localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
            }
          )
        this.router.navigate(['./productpurchase']);
        return;
      }
      else {
        this.loginError = true;
      }

    });
  }

  enterCasualCustomer() {
    this.router.navigate(['./productpurchase']);
  }
}
