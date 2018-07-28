import { Injectable } from '@angular/core';
import { IClubMember } from '../../Models';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomerService } from '../services/customer.service'

const uri = 'http://localhost:53920/api';

@Injectable()
export class UserService {

   currentUser;
   shippmentArea: number;
  
  constructor(private http:Http, private customerService: CustomerService) { 
    this.updateUser(JSON.parse(localStorage.getItem('loggedInUser')));
  }

  updateUser(user) {
    this.currentUser = user;
    this.getShipmentArea();
  }

  getShipmentArea(){
    this.customerService.getCountries().subscribe(response => {
      let country = response.filter(c => {
          return c.CountryId == this.currentUser.Country.CountryId;
      })
      this.shippmentArea = country[0].ShipmentArea.ShipmentAreaId;
    });
    }
  }




