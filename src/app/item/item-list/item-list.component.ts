import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.loadItemList().subscribe(res => {
      this.items = this.itemService.getItems();
    });
  }

  onClickItem(item: Item): void {
    let self = item.links.filter(link => { return link.rel === 'self' })[0].href;
    let id = item.id;
    this.router.navigate(['/items/detail', id], {
      queryParams: {
        'selfLink': self
      }
    });
  }
}
