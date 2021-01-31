import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../message/message.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {
  search:string="";
  unread:number=0;
  constructor(public router:Router,private messageService :MessageService) { }

  ngOnInit(): void {
    this.messageService.loadUnreadNumber().subscribe(res=>{
      this.unread=this.messageService.getUnreadNumber();
    })
  }

  onClickMessage(){
    this.messageService.showContact.next("clicked");
  }

  onClickSearch(){
    console.log('1')
  }



}
