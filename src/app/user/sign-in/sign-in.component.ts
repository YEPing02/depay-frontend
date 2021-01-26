import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }



  onClickSignIn() {
    if (this.username === '' || this.password === '') {
      this.showAlert();
    }
    else {

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
