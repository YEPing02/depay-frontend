import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/security/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = "";
  password: string = "";
  remember: boolean = false;
  showAlert: boolean = false;

  constructor(private authSerivce: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickSignIn() {
    if (this.username === '' || this.password === '') {
      this.showAlert=true;
    }
    else {
      this.authSerivce.signIn(this.username, this.password)
        .subscribe(res => {
          this.router.navigateByUrl('items');
        });
    }
  }

  closeAlert() {
    if ( this.showAlert===true) {
      this.showAlert=false;
    }
  }

}
