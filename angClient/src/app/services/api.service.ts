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
    console.log('api : ' + message);
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

  getChannels() {
    return this.httpClient.get(this.baseUrl + 'channels');
  }

  insertChannel(name) {
    const body = new HttpParams()
        .set('name', name)
    return this.httpClient.post(this.baseUrl + 'channels',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
