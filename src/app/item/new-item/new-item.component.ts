import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/Security/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  item: Item = {};

  constructor(private itemService: ItemService,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  transImage(event: any): void {
    const input = event.target;
    console.log("input", input);
    const reader = new FileReader();
    reader.onload = (() => {
      if (typeof reader.result === "string") {
        this.item.imageBase64 = reader.result;
      }
    });
    reader.readAsDataURL(input.files[0]);

  }
  onSubmit() {
    this.item.uploadTime = new Date();
    this.userService.getUser().subscribe(
      res => {
        this.item.pseudo = res.pseudo;
        this.item.userId = res.id;

        this.itemService.addItem(this.item).subscribe(res => {
          if (typeof this.item.imageBase64 === "string") {
            this.itemService.addPhoto(res, this.item.imageBase64).subscribe(res =>
              console.log(res));
          }
        });

      }
    );
  }
}