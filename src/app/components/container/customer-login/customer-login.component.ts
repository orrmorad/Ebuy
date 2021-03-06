import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IClubMember, ICasualCustomer } from '../../../../Models';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { debug } from 'util';

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

  constructor(private http: Http, private customerService: CustomerService, private router: Router) { }

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
    this.customerService.addCasualMember(e.CustomerId, e.Name, e.Address, e.Email)
      .subscribe(response => {
        return;
      });
    this.isCasualCustomerContactProvided = true;
  }

  submit() {
    this.clubMembers.forEach(member => {
      if (member.LoginName === this.loginName) {
        if (member.Password === this.password) {
          this.customerService.getClubMember(member.MemberId)
            .subscribe(
              response => {
                this.loggedInUser = response;
                localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
              }
            )
        };
        this.router.navigate(['./productpurchase']);
        return;
      }
    });
  }

  enterCasualCustomer() {
    this.router.navigate(['./productpurchase']);
  }
}
