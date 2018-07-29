import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-register-casual-popup',
  templateUrl: './register-casual-popup.component.html',
  styleUrls: ['./register-casual-popup.component.scss']
})
export class RegisterCasualPopupComponent implements OnInit, AfterViewInit  {
  @ViewChild('emailOfUser') myEmail: any;
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

  ngAfterViewInit() {
  }

  submitDetails() {
    this.details = {
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
    this.isAllFieldsValid = this.address != "" && this.email != "" && this.name != "" && this.myEmail.errors == null;
  }

}
