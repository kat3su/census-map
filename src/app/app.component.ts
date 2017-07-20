import {Component, OnInit} from '@angular/core';
declare const google: any;
interface FusionTableStyle {
  from: number;
  to: number;
  color: string;
  display: string;
}

const peopleIndicator: FusionTableStyle[] = [
  {
    from: 0,
    to: 500,
    color: '#d1fcd0',
    display: '0 - 500'
  },
  {
    from: 501,
    to: 2000,
    color: '#7CFC00',
    display: '501 - 2000'
  },
  {
    from: 2001,
    to: 5000,
    color: '#ffe81c',
    display: '2001 - 50000'
  },
  {
    from: 5001,
    to: 10000,
    color: '#ffae02',
    display: '50001 - 10000'
  },
  {
    from: 10001,
    to: 15000,
    color: '#ff6749',
    display: '10001 - 200000'
  },
  {
    from: 15001,
    to: null,
    color: '#d23111',
    display: '200001+'
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map;
  autocomplete;
  fusionLayer;
  colourIndicators = peopleIndicator;
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
        from: '1z0YGyCgbd59yqE8cMxElT2YRYtYgWfS1uB0StEyA',
        where: 'people > 500'
      },
      styles: [{
        polygonOptions: {
          fillOpacity: 0,
          strokeOpacity: 0.7,
          strokeWeight: 1,
        }
      }],
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

    const input = document.getElementById('map_search');
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'au'}
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(this.autocomplete, 'place_changed', this.onAutocompleteSelected.bind(this));
  }

  /**
   * Zoom to selected suburb
   */
  onAutocompleteSelected() {
    this.map.panTo(this.autocomplete.getPlace().geometry.location);
    this.map.setZoom(14);
  }

  /**
   * Get Fusion Table style layer config object
   * @param f'ASD'ingAttribute
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
        fillColor: params.color,
        fillOpacity: 0.3,
        strokeOpacity: 0.7,
        strokeWeight: 1,
      }
    };
  }
}
