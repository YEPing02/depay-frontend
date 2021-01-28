import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/Security/auth.service';
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

  constructor(private authSerivce: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onClickSignIn() {
    if (this.username === '' || this.password === '') {
      this.showAlert();
    }
    else {
      this.authSerivce.signIn(this.username, this.password)
        .subscribe();
    }
  }

  onClickLogOut(){
    this.authSerivce.signOut().subscribe(res=>{
      this.router.navigate(['/login']);
    });
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
