import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/data-model/item';
import { ItemService } from '../item.service';

import { AppSetting } from '../../shared/AppSetting';
import { AuthService } from '../../shared/security/auth.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item = new Item();
  //images: any = [1, 2, 3].map((n) => "../../../assets/0_wZAcNrIWFFjuJA78.jpg");


  images: string[] = [AppSetting.DEFAULT_IMAGE];




  constructor(private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.itemService.getItemDetail(id).subscribe(res => {
      this.item = res;
    });

    this.itemService.getAllImagesOfItem(id).subscribe(itemImages => {
      console.log(itemImages);
      this.images = itemImages;

    });




  }


}
