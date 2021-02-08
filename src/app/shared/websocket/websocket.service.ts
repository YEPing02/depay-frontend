
import { Injectable } from '@angular/core';
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { RxStomp } from '@stomp/rx-stomp';
import { IMessage } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { AppSetting } from '../AppSetting';
import { Message } from '../data-model/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  destination: string = "";
  connected: boolean = false;
  init: boolean = false;
  rxStomp: RxStomp = new RxStomp();

  private privateMessageChannel!: Observable<Message>;

  constructor(private userService: UserService) {
    this.initialize();
  }

  initialize(): Observable<any> {
    return this.userService.getUser().pipe(tap(res => {
      let userId: string = "";
      if (res.id) {
        userId = res.id;
      }
      const stompConfig: InjectableRxStompConfig = {
        brokerURL: AppSetting.WS_ENDPOINT,
        connectHeaders: {
        },
        reconnectDelay: 0,
        debug: (msg: string): void => {
          console.log(new Date(), msg);
        }
      }

      this.destination = "/queue/private/" + userId;
      this.rxStomp.configure(stompConfig);
      this.rxStomp.activate();
      this.privateMessageChannel = this.rxStomp.watch(this.destination).pipe(
        map<IMessage, Message>(res =>
          JSON.parse(res.body)
        ));
      this.init = true;
    }))
  }




  getPrivateMessageChannel(): Observable<Message> {
    if (!this.init) {
      return this.initialize().pipe(
        mergeMap(resInit => {
          return this.privateMessageChannel;
        })
      )
    }
    return this.privateMessageChannel;

  }

  sendMessage(message: Message) {
    this.rxStomp.publish({ destination: this.destination, body: JSON.stringify(message) });
  }

  disconnect() {
    this.rxStomp.deactivate();
  }

}
