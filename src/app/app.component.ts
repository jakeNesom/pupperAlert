import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { QuoteService } from './services/quote.service';

@Component({
  selector: 'app-root',
  templateUrl: 'views/app.component.html',
  styleUrls: [ 'css/app.component.css'],
  animations: [
    trigger('fadeOut', [
      state('rest', style({
        opacity: '100'
      })),
      state('out',   style({
        opacity: '0'
      })),
      state('set', style({
        opacity: '100'
      })),
      transition('rest => out', [ 
        animate('1s', style({opacity: '0'}))
      ]),
      transition('out => set', [ 
        animate('1s', style({opacity: '100'}))
      ]),
      transition('set => out', [ 
        animate('1s', style({opacity: '0'}))
      ]),

    ])
    
  ]
})
export class AppComponent  { 
  
  constructor(public quoteService: QuoteService ) {}
  public clicked: "out" | "set" | "in" | "rest" = "rest";
  public quoteReceived: Object;
  public newQuote: Object;
  public fontSize:number = 30;
  public tqCounter = 0;
  public testQuote: any = [ 
    { 
      "ID": 2130, 
      "title": "Tom Bissel", 
      "content": "<p>To create anything&#8211;whether a short story or a magazine profile or a film or a sitcom&#8211;is to believe, if only momentarily, you are capable of magic.</p>\n", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },
    { 
      "ID": 1234, 
      "title": "Bill Gates", 
      "content": "<p>If you can't make it good, at least make it look good.</p>", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },
    { 
      "ID": 1234, 
      "title": "Thomas Hardy", 
      "content": "<p>Fear is the mother of foresight</p>", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },
    { 
      "ID": 1234, 
      "title": "Barack Obama", 
      "content": "<p>If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.</p>", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },
    { 
      "ID": 1234, 
      "title": "Malcolm X", 
      "content": "<p>I'm for truth, no matter who tells it.  I'm for justice, no matter who it's for or against.</p>", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },
    { 
      "ID": 1234, 
      "title": "Plato", 
      "content": "<p>If a man neglects education, he walks lame to the end of his life.</p>", 
      "link": "https://quotesondesign.com/tom-bissel/", 
      "custom_meta": { 
        "Source": "<a href=\"http://www.brainpickings.org/index.php/2012/04/13/magic-hours-tom-bissell/\">article</a>" 
      }
    },   
  ];
  ngOnInit() { 
    //this.getQuote()

    // For testing:
    this.setQuote(this.testQuote);
  }

  getQuote (changeState?:"set") { 

    var quote;
    if( this.tqCounter < this.testQuote.length - 1 && changeState == "set")
    { 
      this.tqCounter ++;
      quote = this.testQuote[this.tqCounter];
      let quoteArr = [quote];
      this.setQuote(quoteArr, changeState);
      
    }
    else if (changeState == "set")
    {
      this.quoteService.getQuote()
      .then(
        quote => this.setQuote(quote, changeState),
        error => console.log(error)
      );
    } else {
      this.quoteService.getQuote()
        .then(
          quote => this.setQuote(quote),
          error => console.log(error)
        );
    }
  }

  getNewQuote() {
    if(this.quoteReceived && this.newQuote)
    {
      if(this.quoteReceived[0].title !== this.newQuote[0].title )
      {
        this.setQuote(this.newQuote);
      }
      this.getQuote();
    }
    
  }


  setQuote (quote:any, changeState?:"set") {
    
    let length = quote[0].content.length;
    if(length > 250 ) { this.getQuote();}
    else {
      if(length > 200) { this.fontSize = 18; }
      else if(length > 150) { this.fontSize = 20;}
      else if(length > 100)  { this.fontSize = 25; }
      else  { this.fontSize = 30; }

      this.quoteReceived = quote;
      if(changeState == "set") { this.clicked = "set";}
    }
  }

  toggleClicked() {
    
    if(this.clicked == "rest" || this.clicked == "set") { 
      let _this = this;
      this.clicked = "out";
      setTimeout(function(){
        _this.getQuote("set");
      }, 2500)
      
    }
  }
}
