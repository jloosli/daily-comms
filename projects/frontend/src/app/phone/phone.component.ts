import {Component, OnInit} from '@angular/core';
import {PhoneService} from 'projects/frontend/src/app/services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {

  phone: string = '';

  constructor(private phoneSvc: PhoneService) {
  }

  ngOnInit(): void {
    this.phoneSvc.phone$.subscribe(phone => this.phone = phone);
  }

  onChange(phone:string) {
    this.phoneSvc.setPhone(phone);
  }

}
