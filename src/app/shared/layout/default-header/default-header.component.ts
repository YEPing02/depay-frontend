import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {
search:string="";

  constructor(public router:Router) { }

  ngOnInit(): void {

  }

  onClickSearch(){
    console.log('1')
  }



}
