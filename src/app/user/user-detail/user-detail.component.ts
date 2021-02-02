import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/data-model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.loadSelfUserDetail().subscribe(res => {
      this.userService.getUser().subscribe(res => { this.user = res });
    });
  }

}
