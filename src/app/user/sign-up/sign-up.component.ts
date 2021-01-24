import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from './signUpInfo';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  input : SignUpInfo ={
    pseudo : "111",
    password : "111",

  }
  passwordVerif : String = "6";

  constructor() {
   }

  ngOnInit(): void {
  }

  onSubmit(customerData : any) {
    console.warn('submit', customerData);
    console.warn(this.passwordVerif);

  }



}


