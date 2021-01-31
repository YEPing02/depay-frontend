import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { AppSetting } from '../AppSetting';
import { AuthService } from '../Security/auth.service';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url: string = "";
  currentConversation: Message[] = [];
  lastMessages: Message[] = [];
  unreadNumber: number = 0;
  init: boolean = false;

  public showContact: Subject<any> = new Subject();

  constructor(private userService: UserService, private httpClient: HttpClient) {
    this.initialize().subscribe();
  }

  initialize(): Observable<any> {
    return this.userService.getUser().pipe(mergeMap(
      res => {
        this.url = AppSetting.ENDPOINT + "/users/" + res.id + "/messages"
        let lastMessageOb = this.httpClient.get<Message[]>(this.url + "/last");
        let unreadOb = this.httpClient.get<number>(this.url + "/unread");
        return forkJoin([lastMessageOb, unreadOb]).pipe(tap
          (res => {
            this.lastMessages = res[0];
            this.unreadNumber = res[1];
            this.init = true;
          }))
      }
    ));
  }

  sendMessage(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(this.url, message);
  }

  loadLastMessages(): Observable<Message[]> {
    if (this.init) {
      return of(this.lastMessages);
    }
    else {
      return this.initialize().pipe(
        mergeMap(resInit => {
          return of(this.lastMessages);
        }))
    }
  }

  loadConversation(receiverId: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.url + "/conversation/" + receiverId).pipe(tap(
      res => { this.currentConversation = res; }
    ));
  }

  loadUnreadNumber(): Observable<number> {
    if (this.init) {
      return of(this.unreadNumber);
    }
    else {
      return this.initialize().pipe(
        mergeMap(
          resInit => {
            return of(this.unreadNumber)
          }));
    }

  }

  getCurrentConversation() {
    return this.currentConversation;
  }
  getLastMessages() {
    return this.lastMessages;
  }
  getUnreadNumber() {
    return this.unreadNumber;
  }

}
