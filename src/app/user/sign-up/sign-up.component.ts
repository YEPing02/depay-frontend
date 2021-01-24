import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }

  onSubmit(customerData : any) {
    console.warn('submit', customerData);

  }



}


