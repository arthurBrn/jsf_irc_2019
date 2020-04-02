import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() messages;
  @Input() message;
  @Input() function: any;
  @Input() selectionnedChannel;
  @Output() emittedValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    this.emittedValue.emit(this.message);
  }
}
