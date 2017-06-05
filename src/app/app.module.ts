//Modules
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Services
import { QuoteService } from './services/quote.service';

//Components
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, 
                  BrowserAnimationsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ QuoteService ]
})
export class AppModule { }
