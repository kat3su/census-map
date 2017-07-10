import {Component, OnInit} from '@angular/core';
declare const google: any;
interface FusionTableStyle {
  from: number;
  to: number;
  color: string;
  display: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map;
  fusionLayer;
  colourIndicators: FusionTableStyle[] = [
    {
      from: 0,
      to: 1000,
      color: '#7CFC00',
      display: '0 - 1000'
    },
    {
      from: 1001,
      to: 10000,
      color: '#FFFACD',
      display: '1001 - 10000'
    },
    {
      from: 10001,
      to: 100000,
      color: '#FFE4E1',
      display: '10001 - 100000'
    },
    {
      from: 100001,
      to: 1000000,
      color: '#D2691E',
      display: '100001 - 1000000'
    },
    {
      from: 1000001,
      to: null,
      color: '#FF4500',
      display: '1000001+'
    },
  ];
  /**
   * Initialisation
   */
  ngOnInit(): void {

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -25, lng: 133},
      zoom: 4
    });

    const fusionLayerOptions = {
      query: {
        select: 'geometry',
        from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ',
        where: null
      },
      styles: [],
      map: this.map
    };

    this.colourIndicators.forEach(colourIndicator => {
      fusionLayerOptions.styles.push(this.getFusionTableStyle('people', colourIndicator));
    });
    this.fusionLayer = new google.maps.FusionTablesLayer(fusionLayerOptions);
    // this.fusionLayer.setOptions({})
    // Can also do 2 layer
    /*
     google.maps.event.addListener(this.fusionLayer, 'click', function(e) {
     console.log(e);
     });
     */
  }

  /**
   * Get Fusion Table style layer config object
   * @param filteringAttribute
   * @param params
   */
  getFusionTableStyle(filteringAttribute, params: FusionTableStyle) {
    const conditions = [];
    if (params.from) {
      conditions.push(`${filteringAttribute} >= ${params.from}`);
    }
    if (params.to) {
      conditions.push(`${filteringAttribute} <= ${params.to}`);
    }
    return {
      where: conditions.join(' AND '),
      polygonOptions: {
        fillColor: params.color
      }
    };
  }
}
