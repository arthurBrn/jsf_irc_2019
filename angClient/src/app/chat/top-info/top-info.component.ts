import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.css']
})
export class TopInfoComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  @Input() channelId;
  channelName;

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
      if (changes.channelId.currentValue) {
        this._apiService.getChannelName(changes.channelId.currentValue).subscribe((datas) => {
          this.channelName = datas[0].name;
        });
      }
  }

}
