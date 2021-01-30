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
  images: any = [1,2,3].map((n) => "../../../assets/0_wZAcNrIWFFjuJA78.jpg");
  newMessage:string='';


  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.itemService.getItemDetail(id).subscribe(res => {
      this.item = res;
    })
  }

  onClickSendNewMessage():void{
    
  }

}
