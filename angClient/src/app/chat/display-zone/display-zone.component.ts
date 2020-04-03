import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-display-zone',
  templateUrl: './display-zone.component.html',
  styleUrls: ['./display-zone.component.css']
})
export class DisplayZoneComponent implements OnInit {

  messages = [];
  @Input() selectionnedChannel;
  
  constructor(
    private _apiService: ApiService,
    private _chatService: ChatService,
  ) {
    this._chatService.receivedMessage()
    .subscribe((data) => {
      this.messages.push(data);
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    this._apiService.getMessages(changes.selectionnedChannel.currentValue).subscribe((datas) => {
      this.messages = [];
      for (const line of datas as any) {
        this.messages.push({ user: line.pseudo, content: line.content })
      }
    })
  }

  

}
