
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/message/message.service';
import { AuthService } from 'src/app/shared/Security/auth.service';
import { Message } from '../../shared/message/message';
import { Image } from '../image';
import { Item } from '../item';
import { ItemService } from '../item.service';

import { AppSetting } from '../../shared/AppSetting';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item = new Item();
  //images: any = [1, 2, 3].map((n) => "../../../assets/0_wZAcNrIWFFjuJA78.jpg");
  
  
  images : string[]= [AppSetting.DEFAULTIMAGE];



  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private itemService: ItemService,
    private authService : AuthService) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.itemService.getItemDetail(id).subscribe(res => {
      this.item = res;
    });
    
    this.itemService.getAllImage(id).subscribe(itemImages=>{
      console.log(itemImages);
      this.images = itemImages;

      });
    

    
    
  }


}
