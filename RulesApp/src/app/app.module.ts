import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { RulesAddComponent } from './components/rules-add/rules-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/MaterialModule';
import {CdkTableModule} from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RulesEditComponent } from './components/rules-edit/rules-edit.component';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArchiveHistoryComponent } from './components/archive-history/archive-history.component';
import { ArchiveDetailsComponent } from './components/archive-details/archive-details.component';




@NgModule({
  declarations: [
    AppComponent,
    RulesListComponent,
    RulesAddComponent,
    RulesEditComponent,
    LoginComponent,
    ArchiveHistoryComponent,
    ArchiveDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    CdkTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
