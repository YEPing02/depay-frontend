import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Item } from 'src/app/shared/data-model/item';
import { User } from 'src/app/shared/data-model/user';
import { UserService } from 'src/app/user/user.service';
import { Message } from '../../data-model/message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @Input() user: User = {};
  @Input() objectUserId?: string = "";
  objectUser: User = {};
  newMessage: Message = {};
  conversation: Message[] = [];
  @Input() show: boolean = true;
  item?: Item;
  constructor(
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.newMessage.senderId = this.user.id;
    this.newMessage.senderPseudo = this.user.pseudo;
    if (this.objectUserId) {
      this.newMessage.receiverId = this.objectUserId;
      this.userService.loadUserDetail(this.objectUserId).subscribe(res => {
        this.objectUser = res;
        this.newMessage.receiverPseudo = this.objectUser.pseudo;
      });
      this.messageService.loadConversation(this.objectUserId).subscribe(res => {
        this.conversation = res;
      });
    }

    if (this.item) {
      this.newMessage.itemId = this.item.id;
    }
    if (this.objectUser.id) {

    }
  }
  @Output() sendMessage: EventEmitter<Message> = new EventEmitter();

  onClickSendNewMessage(): void {
    this.messageService.sendMessage(this.newMessage).subscribe(res => {
      this.conversation.push(res);
      this.sendMessage.emit(res);
      this.newMessage.content = "";
    });
  }

  @Output() close: EventEmitter<any> = new EventEmitter();

  closeConversation(): void {
    this.close.emit(this.newMessage);
  }
  contentClass(message: Message): string {
    return message.senderId === this.user.id ? "conversation-message-sent" : "conversation-message-received";
  }

}
