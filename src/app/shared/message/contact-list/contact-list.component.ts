import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { User } from 'src/app/shared/data-model/user';
import { UserService } from 'src/app/user/user.service';
import { Message } from '../../data-model/message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @ViewChild('conversation') conversation!: TemplateRef<any>;
  @ViewChild('contactList') contactList!: HTMLElement;
  position: ConnectedPosition = {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
  };
  overlayRef!: OverlayRef;
  lastMessages: Message[] = [];
  lastOfConversation: Message = {};
  user: User = {};
  showConversation: boolean = false;
  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef, private messageService: MessageService, private userService: UserService) { }
  ngOnInit(): void {
    this.messageService.loadLastMessages().subscribe(res => {
      this.lastMessages = this.messageService.getLastMessages();
    })
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
  }
  onClickConversation(message: Message): void {
    //if is open
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
      if (this.lastOfConversation.id !== message.id) {
        this.lastOfConversation = message;
        const positionStrat = this.overlay
          .position()
          .flexibleConnectedTo(this.contactList).withPositions([this.position]);
        this.overlayRef = this.overlay.create({ positionStrategy: positionStrat });
        this.overlayRef.attach(new TemplatePortal(this.conversation, this.viewContainerRef));
      }
    }
    else {
      this.lastOfConversation = message;
      const positionStrat = this.overlay
        .position()
        .flexibleConnectedTo(this.contactList).withPositions([this.position]);
      this.overlayRef = this.overlay.create({ positionStrategy: positionStrat });
      this.overlayRef.attach(new TemplatePortal(this.conversation, this.viewContainerRef));
    }
  }
  closeConversation() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }

  updateConversation(message: Message): void {
    let objectUserId = message.receiverId;
    this.lastOfConversation = message;
    this.lastMessages.filter((lastMessage, index) => {
      if (lastMessage.receiverId === objectUserId || lastMessage.senderId === objectUserId) {
        this.lastMessages[index] = message;
      }
    })
  }

  @Output() close: EventEmitter<any> = new EventEmitter();

  onClickClose(): void {
    this.close.emit();
  }
}
