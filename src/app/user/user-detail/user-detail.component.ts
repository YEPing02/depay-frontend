import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/Security/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetail().subscribe(res=>{
      this.user=res;
    });
  }

}
