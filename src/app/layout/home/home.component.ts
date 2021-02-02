import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/shared/message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("drawer") contactList: any;
  constructor( private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.showContact.subscribe(event => {
      this.contactList.toggle();
    })
  }

}
