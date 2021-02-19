import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/message/message.service';
import { AuthService } from 'src/app/shared/security/auth.service';
import { WebsocketService } from 'src/app/shared/websocket/websocket.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {
  @ViewChild('contactList') contactList!: TemplateRef<any>;
  overlayRef!: OverlayRef;
  search: string = "";
  unread: number = 0;
  showContact: boolean = false;
  private topicSubscription!: Subscription;

  constructor(private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    public router: Router,
    private messageService: MessageService,
    private authSerivce: AuthService,
    private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.messageService.loadUnreadNumber().subscribe(res => {
      this.unread = this.messageService.getUnreadNumber();
    });
    const overlayStrat = this.overlay.position().global().bottom().right();
    this.overlayRef = this.overlay.create({ positionStrategy: overlayStrat });

    this.topicSubscription = this.websocketService.getPrivateMessageChannel()
      .subscribe(res => {
        if (!res.read) {
          this.unread++;
        }
      });
  }

  onClickMessage() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.contactList, this.viewContainerRef));
    }
  }

  onClickLogOut() {
    this.authSerivce.signOut().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  onClickSearch() {
    console.log('1')
  }



}
