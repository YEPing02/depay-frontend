import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Item } from '../../shared/data-model/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item = new Item();
  images: any = [1, 2, 3].map((n) => "../../../assets/0_wZAcNrIWFFjuJA78.jpg");



  constructor(private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.itemService.getItemDetail(id).subscribe(res => {
      this.item = res;
    })
  }


}
