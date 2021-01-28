import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignUpInfo } from './signUpInfo';
import { UserService } from '../user.service';
import { fromEvent, Observable, Subscription,Subject} from 'rxjs';
import { pluck, debounceTime, throttleTime, distinct, distinctUntilChanged } from 'rxjs/operators';


import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  input: SignUpInfo = {
    pseudo: "",
    password: "",
  }
  passwordSeconde: String = "";

  rslUniquePseudo: String = '';
  rslSecurePassword: String = '';
  rslSamePassword: String = 'test';


  

   public keyUp = new Subject<KeyboardEvent>();
  private subscription:Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.keyUp.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(
     x=> this.checkPseudo());
    

  }

  ngOnInit(): void {
    //this.testRebounceTime();
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

  testRebounceTime() {
    const id = document.getElementById("inputPseudo");
    if (id != null) {
      const clicks = fromEvent(id, 'keyup');
      const result = clicks.pipe(debounceTime(1000));
      result.subscribe(x => console.log(x, "rrrrrrr"));

    }


  }

  onSubmit(customerData: any) {
    if (this.readyToSubmit()) {
      this.userService.createUser(customerData);
    }
    else {
      console.log("waiiiiiiiiiit");
    }


  }

  checkPseudo(): boolean {
    if (this.input.pseudo != '') {
      const eleInputPseudo = document.getElementById("inputPseudo");
      if (eleInputPseudo != null) {
        //const keyup = fromEvent(eleInputPseudo, 'keyup');
        //const result = keyup.pipe(debounceTime(1000),distinctUntilChanged());
        
        //result.subscribe(x =>{
          const obUniquePseudo :Observable<boolean>= this.userService.checkUniquePseudo(this.input.pseudo);

          obUniquePseudo.subscribe(res => {
            if (res) {
              this.rslUniquePseudo = "YES!";
              return true;
            }
            else {
              this.rslUniquePseudo = "ToT";
              return false;
            }
          })
        }
        


        //  )}


        }
         
      
      else {
        this.rslUniquePseudo = '';
      }
    return false;

  }



  checkPasswordSecurity(): boolean {
    this.passwordSeconde = "";
    this.rslSamePassword = "";

    return true;

  }

  checkSamePassword(): boolean {
    if (this.input.password == "" || this.passwordSeconde == "") {
      this.rslSamePassword = ""
    }


    if (this.userService.isSame(this.input.password, this.passwordSeconde)) {
      this.rslSamePassword = ":)"
      return true;
    }
    else {
      this.rslSamePassword = "Noooo";
    }
    return false;

  }


  readyToSubmit() {

    return this.checkSamePassword() && this.checkPasswordSecurity() && this.userService.checkUniquePseudo(this.input.pseudo) && this.input.password != "" && this.input.pseudo != "";
  }
  /*
    searchInput = document.getElementById('inputPseudo');
    const searchInput$ = fromEvent(this.searchInput,'keyup').pipe(
      pluck('target','value'),
      debounceTime(1000)
    )
    searchInput$.subscribe(
        value => console.log(`我触发后每间隔一秒时间才会执行哦,当前输入的值为${value}`)
    )
  */

}


