import { Component, OnInit } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  public registerForm = this.formBuilder.group(
    {/*
      Async validators should be placed as the third argument*/
      pseudo: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]{4,15}$')],
        [this.usernameValidator()]
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')],
        []],
      checkPassword: ['', [Validators.required]]
    },
    { validators: [pwdDoubleCheck], updateOn: 'blur', }
  );




  ngOnInit(): void {
  }


  onSubmit(registerData: String) {
    if (this.checkValue()) {
      this.userService.createUser(registerData);
    }
  }

  checkValue() {
    return this.registerForm.valid;
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.checkUniquePseudo(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return !res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    }
  }


  get pseudoControl() {
    return this.registerForm.get('pseudo');
  }

  get pwdControl() {
    return this.registerForm.get('password');
  }

}


const pwdDoubleCheck: ValidatorFn = (controlGroup: AbstractControl): ValidationErrors | null => {
  const pwd = controlGroup.get('password')?.value;
  const pwdCheck = controlGroup.get('checkPassword')?.value;
  return pwd != pwdCheck ? { 'pwdDoubleCheckInvalid': true } : null;
};
