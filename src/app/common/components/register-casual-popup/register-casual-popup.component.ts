import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-register-casual-popup',
  templateUrl: './register-casual-popup.component.html',
  styleUrls: ['./register-casual-popup.component.scss']
})
export class RegisterCasualPopupComponent implements OnInit {
  customerId: number;
  name: string = "";
  address: string = "";
  email: string = "";
  details: any = {};
  isAllFieldsValid = false;
  @Output() OnSubmitDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  submitDetails() {
    this.details = {
      'CustomerId': this.customerId,
      'Name': this.name,
      'Address': this.address,
      'Email': this.email
    }
    this.OnSubmitDetails.emit(this.details);
  }

  close() {
    this.OnClose.emit(false);
  }

  detaisChanged() {
    this.isAllFieldsValid = this.customerId && this.address != "" && this.email != "" && this.name != "";
  }

}
