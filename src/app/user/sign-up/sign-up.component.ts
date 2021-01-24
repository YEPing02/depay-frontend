import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from './signUpInfo';
import { UserService } from '../user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  input: SignUpInfo = {
    pseudo: "",
    password: "",
  }
  passwordSeconde: String = "";

  rslUniquePseudo: String = '';
  rslSecurePassword: String = '';
  rslSamePassword: String = 'test';


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(customerData: any) {
    if(this.readyToSubmit()){
      this.userService.createUser(customerData);
    }
    else{
      console.log("waiiiiiiiiiit");
    }

    
  
   
  }

  checkPseudo() :boolean{
    if (this.input.pseudo != '') {
      this.userService.checkUniquePseudo(this.input.pseudo).subscribe(
        res => {
          if (res) {
            
            this.rslUniquePseudo = "YES!";
            return true;
          } else {
            this.rslUniquePseudo = "ToT";
            return false;
          }
        }
      )
    }
    else{
      this.rslUniquePseudo='';
    }

    return false;
  }

  checkPasswordSecurity(): boolean {
this.passwordSeconde="";
this.rslSamePassword ="";

return true;

  }

  checkSamePassword() :boolean{
    if (this.input.password=="" || this.passwordSeconde==""){
      this.rslSamePassword=""
    }


    if(this.userService.isSame(this.input.password,this.passwordSeconde)){
      this.rslSamePassword =":)"
      return true;
    }
    else{
      this.rslSamePassword ="Noooo";
    }
    return false;

  }


  readyToSubmit() {

    return this.checkSamePassword() && this.checkPasswordSecurity() && this.checkPseudo() && this.input.password!="" &&this.input.pseudo!="";
  }



}


