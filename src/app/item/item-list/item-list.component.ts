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
      for (let item of this.items){
        this.itemService.getCoverImage(item).subscribe(res=>console.log(res));
      }
    });
  }

  onClickItem(item: Item): void {
    let id = item.id;
    this.router.navigate(['/items/detail', id], {
    });
  }
}
