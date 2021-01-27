import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = "";
  password: string = "";
  remember: boolean = false;
  alertWindowStatus: string = 'fade';


  constructor(private userSerivce:UserService) { }

  ngOnInit(): void {
  }

  onClickSignIn() {
    if (this.username === '' || this.password === '') {
      this.showAlert();
    }
    else {
      this.userSerivce.signIn(this.username,this.password).subscribe();
    }
  }

  closeAlert() {
    if (this.alertWindowStatus !== 'fade') {
      this.alertWindowStatus = 'fade';
    }
  }

  showAlert() {
    if (this.alertWindowStatus !== 'show') {
      this.alertWindowStatus = 'show';
    }
  }

}
