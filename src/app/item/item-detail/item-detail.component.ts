import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item = new Item();

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {


  }

  ngOnInit(): void {
    let self = this.route.snapshot.queryParams['selfLink'];

    this.itemService.getItemDetail(self).subscribe(res => {
      this.item = res;
    })


  }

}
