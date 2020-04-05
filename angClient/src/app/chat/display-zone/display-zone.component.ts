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
  channelId;
  
  constructor(
    private _apiService: ApiService,
    private _chatService: ChatService,
  ) {
      this._chatService.receivedMessage()
      .subscribe((data) => {
        let datas = data as any;
        if(this.channelId == datas.channel) this.messages.push(data);
      });
      this._chatService.newUserJoined()
      .subscribe((data) => {
        let datas = data as any;
        if(this.channelId == datas.channel && datas.display == true) this.messages.push(data);
      });
      
  }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    this._apiService.getMessages(changes.selectionnedChannel.currentValue).subscribe((datas) => {
      this.channelId = changes.selectionnedChannel.currentValue;
      this.messages = [];
    //   if ( this.selectionnedChannel ) this.messages.push(this.selectionnedChannel);
      for (const line of datas as any) {
        this.messages.push({ user: line.pseudo, content: line.content });
      }
    })
  }

  

}
