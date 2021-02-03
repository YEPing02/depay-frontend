import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Item } from '../../shared/data-model/item';
import { ItemService } from '../item.service';
import { forkJoin, Observable, of, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  item: Item = {};

  constructor(private itemService: ItemService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {

  }

  transImage(event: any): void {
    const input = event.target;
    console.log("input", input);
    const reader = new FileReader();
    reader.onload = (() => {
      if (typeof reader.result === "string") {
        let nbImage = 0;
        if (this.item.imageBase64 != null && this.item.imageBase64 != undefined) {
          nbImage = this.item.imageBase64.length;
          this.item.imageBase64[nbImage] = reader.result
        }
        else {
          this.item.imageBase64 = [reader.result]
        }
      }
    });

    for (let index = 0; index < input.files.length; index++) {
      reader.readAsDataURL(input.files[index]);
    }


  }
  onSubmit() {
    this.item.uploadTime = new Date();

    let id: string = "";
    /*
        const ob = this.userService.getUser().pipe(tap(res => {
          this.item.pseudo = res.pseudo;
          this.item.userId = res.id;
    
          this.itemService.addItem(this.item).pipe(tap(res => {
            if (res.id != undefined) {
              id = res.id;
            }
    
            console.log(id);
            if (this.item.imageBase64 != undefined && this.item.imageBase64?.length != 0) {
              this.itemService.saveImages(res).subscribe(res => console.log(res));
            }
          }))
        }
    
        ));
    
        forkJoin(ob).subscribe(res => this.router.navigateByUrl("/items"));
    
    */






    this.userService.getUser().subscribe(
      res => {
        this.item.pseudo = res.pseudo;
        this.item.userId = res.id;

        this.itemService.addItem(this.item).subscribe(res => {
          if (res.id != undefined) {
            this.item.id = res.id;
          }

          if (this.item.imageBase64 != undefined && this.item.imageBase64?.length != 0) {
            this.itemService.saveImages(this.item).subscribe(res => this.router.navigateByUrl("/items"));
          }
        });
      }
    );
  }
}