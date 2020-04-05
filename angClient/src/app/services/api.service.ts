import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: String = 'http://localhost:8080/';

  login(mail, password) {
    const body = new HttpParams()
      .set('email', mail)
      .set('password', password);
    return this.httpClient.post(this.baseUrl + 'connect/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  register(user) {
    const body = new HttpParams()
      .set('first_name', user.first_name)
      .set('last_name', user.last_name)
      .set('email', user.email)
      .set('password', user.password)
      .set('createdAt', user.createdAt)
    return this.httpClient.post(this.baseUrl + 'connect/register',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  getMessages(channelId) {
    const body = new HttpParams()
      .set('channelId', channelId)
    return this.httpClient.post(this.baseUrl + 'messages/get',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  sendMessage(message) {
    const body = new HttpParams()
      .set('content', message.content)
      .set('channelId', message.channelId)
      .set('userId', message.userId)
      .set('pseudo', message.pseudo)
      .set('date', message.date)
    return this.httpClient.post(this.baseUrl + 'messages/send',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  getChannels(userId) {
    const body = new HttpParams()
        .set('userId', userId)
    return this.httpClient.post(this.baseUrl + 'channels/notJoined',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertChannel(datas) {
    const body = new HttpParams()
        .set('name', datas.name)
    return this.httpClient.post(this.baseUrl + 'channels',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  getUser(userId) {
    const body = new HttpParams()
        .set('userId', userId)
    return this.httpClient.post(this.baseUrl + 'connect/user',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getJoinedChannel(userId) {
    const body = new HttpParams()
        .set('userId', userId)
    return this.httpClient.post(this.baseUrl + 'channels/getJoined',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  addJoinedChannel(datas) {
    const body = new HttpParams()
        .set('userId', datas.userId)
        .set('channelId', datas.channelId)
        .set('stared', datas.stared)
    return this.httpClient.post(this.baseUrl + 'channels/addJoined',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getChannelName(channelId) {
    const body = new HttpParams()
        .set('channelId', channelId)
    return this.httpClient.post(this.baseUrl + 'channels/name',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  countUsers(channelId) {
    const body = new HttpParams()
        .set('channelId', channelId)
    return this.httpClient.post(this.baseUrl + 'channels/countUsers',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  favChannel(data) {
    const body = new HttpParams()
      .set('channelId', data.channelId)
      .set('userId', data.userId)
      .set('staredValue', data.staredValue)
    return this.httpClient.post(this.baseUrl + 'channels/favChannel',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
    }

    leaveChannel(data) {
    const body = new HttpParams()
      .set('channelId', data.channelId)
      .set('userId', data.userId)
    return this.httpClient.post(this.baseUrl + 'channels/leave',
    body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
    }

  renameChannel(data) {
    const body = new HttpParams()
      .set('name', data.channelName)
      .set('id', data.channelId)
    return this.httpClient.post(this.baseUrl + 'channels/rename',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
    }
}
