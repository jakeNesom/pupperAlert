import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { PupperData } from './services/pupper-data.service';
import { AddressManip } from './services/address-manip.service';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

// https://stackoverflow.com/questions/37326572/how-can-i-integrate-google-maps-apis-inside-an-angular-2-component
declare var google: any;
interface Window {
  initMap():void;
}

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
  public loc: string = 'Sacramento';
  public title: string = 'pupper-alert' + ' ' + this.loc;
  public lat: number = 38.5764870;
  public lng: number = -121.4929151;
  
  options:any;
  styles:any;
  
  public animalData:any;

  public addressGeos = [];
  constructor( gmw:GoogleMapsAPIWrapper, public pupperData:PupperData,
    public addressManip:AddressManip ) {
    

    
      this.styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ];
    
}
  
  
  ngOnInit() { 
   
  //   var mapProp = {
  //           center: new google.maps.LatLng(51.508742, -0.120850),
  //           zoom: 5,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //       };
  //     var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
      this.getPupperData();
        
  }

  getPupperData () {
    this.pupperData.getAllPupperData()
      .then(data => this.processData(data) );
  }

  processData(data:any) {
    console.dir(data); 
    this.animalData = data.features;
    this.animalData = this.animalData.splice(-50);
    console.dir(this.animalData);
    this.testGeoLocation(this.animalData);
  }

  testGeoLocation (data) {
    console.log(data[0].properties.Picked_up_Location);
    let loc = this.addressManip.convertAddressToSearchString(data[0].properties.Picked_up_Location);

    console.log(this.addressManip.getAddressAsGeoCode(loc));
  }
  
}
