import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-confirmation-popup',
  templateUrl: './address-confirmation-popup.component.html',
  styleUrls: ['./address-confirmation-popup.component.scss']
})
export class AddressConfirmationPopupComponent implements OnInit {

  @Output() OnCancel = new EventEmitter<boolean>();
  @Output() OnConfirm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.OnCancel.emit(false);
  }

  confirm() {
    this.OnConfirm.emit(true);
  }

}
