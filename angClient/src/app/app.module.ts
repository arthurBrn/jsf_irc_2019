import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutofocusModule } from 'angular-autofocus-fix';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSidebarInfoComponent } from './sidebar/user-sidebar-info/user-sidebar-info.component';
import { UserStaredChanelComponent } from './sidebar/user-stared-chanel/user-stared-chanel.component';
import { UserChanelsComponent } from './sidebar/user-chanels/user-chanels.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UserSidebarInfoComponent,
    UserStaredChanelComponent,
    UserChanelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutofocusModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
