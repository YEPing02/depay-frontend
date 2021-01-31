import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  lastMessages: Message[] = [];
  lastOfConversation: Message = {};
  user: User = {};
  showConversation:boolean=false;
  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.messageService.loadLastMessages().subscribe(res => {
      this.lastMessages = this.messageService.getLastMessages();
    })
    this.userService.getUser().subscribe(res => {
      this.user = res;
    })
  }

  onClickConversation(message: Message): void {
    this.lastOfConversation = message;
    if(this.lastOfConversation.id===message.id){
      this.showConversation=!this.showConversation;
    }
  }

  updateConversation(message:Message):void{
    let objectUserId=message.receiverId;
    this.lastOfConversation=message;
    this.lastMessages.filter((lastMessage,index)=>{
      if(lastMessage.receiverId===objectUserId||lastMessage.senderId===objectUserId){
        this.lastMessages[index]=message;
      }
    })
  }
}
