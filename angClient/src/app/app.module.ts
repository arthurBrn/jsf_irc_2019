import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutofocusModule } from 'angular-autofocus-fix';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserChanelsComponent } from './sidebar/user-chanels/user-chanels.component';
import { UserInfoComponent } from './sidebar/user-info/user-info.component';
import { ChatComponent } from './chat/chat.component';
import { DisplayZoneComponent } from './chat/display-zone/display-zone.component';
import { InputMsgComponent } from './chat/input-msg/input-msg.component';
import { ModalComponent } from './sidebar/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { TopInfoComponent } from './chat/top-info/top-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UserChanelsComponent,
    UserInfoComponent,
    ChatComponent,
    DisplayZoneComponent,
    InputMsgComponent,
    ModalComponent,
    TopInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutofocusModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
