import { Injectable } from '@angular/core';
import { IClubMember, ICountry } from '../../Models';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

const uri = 'http://localhost:53920/api';
@Injectable()
export class CustomerService {

  constructor(private http: Http) { }

  getClubMembers(): Observable<IClubMember[]> {
    return this.http.get(uri + '/customer/GetClubMembers')
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  getClubMember(id: number) {
    return this.http.get(uri + `/customer/GetClubMember/${id}`)
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  addClubMember(customerId: number, loginName: string, password: string, country: ICountry,
    city: string, street: string, houseNumber: number, email: string, phone: string, firstRegistration: Date) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    var body = {
      'MemberId': customerId,
      'LoginName': loginName,
      'Password': password,
      'Country': country,
      'City': city,
      'Street': street,
      'HouseNumber': houseNumber,
      'Email': email,
      'Phone': phone,
      'FirstRegistration': firstRegistration
    };
    return this.http.post(uri + '/customer/PostClubMember', body, { headers: headers })
      .map((res) => {
        res.json();
      })
      .catch(this.handleErrorObservable);
  }

  addCasualMember(customerId: number, name: string, address: string, email: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    var body = {
      'customerId': customerId,
      'Name': name,
      'Address': address,
      'Email': email
    };
    return this.http.post(uri + '/customer/AddCasualCustomer', body, { headers: headers })
      .map((res) => {
        res.json();
      })
      .catch(this.handleErrorObservable);
  }

  getCountries() {
    return this.http.get(uri + '/customer/GetCountries')
      .map(response => response.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
