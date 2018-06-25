import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryMode } from '../../../../Models';

@Component({
  selector: 'app-shipment-address',
  templateUrl: './shipment-address.component.html',
  styleUrls: ['./shipment-address.component.scss']
})
export class ShipmentAddressComponent implements OnInit {
  countries: string[];
  states: string[];
  isStateEnabled: boolean;
  street: string;
  houseNumber: number;
  zipCode: number;
  pob: string;
  city:string;
  reciever:string;
  showPopup: boolean = false;
  @Input() deliveryMode: string;
  @Output() OnClose = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    this.countries = ['Israel', 'USA', 'France', 'Germany', 'Italy'];
    this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connticut', 'Delaware', 'Columbia',
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Luisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississipi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming'];
  }

  changeCountry(value) {
    this.isStateEnabled = (value == 'USA');
  }

  onClose() {
    this.OnClose.emit();
  }

}
