import { Component, OnInit } from '@angular/core';
import {Item} from '../item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  item : Item= {};

  constructor() {
  }

  ngOnInit(): void {   

  }

  onSubmit() {
    console.log("yes");
    console.log(this.item);
  }
}
