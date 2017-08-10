import {Component, OnInit} from '@angular/core';
import {FusionTableStyle} from './fusion-table-style';
import {PeopleFilter} from './filters/people';
import {AgeFilter} from './filters/age';
import {AbstractFilter} from './filters/@abstract-filter';
import {IncomeFilter} from './filters/income';
import {DwellingFilter} from './filters/dwellings';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private fusionTableId = '1z0YGyCgbd59yqE8cMxElT2YRYtYgWfS1uB0StEyA';
  private map;
  private autocomplete;
  private fusionLayer;
  private highlightFusionLayer;
  public filterList = [
    new PeopleFilter(),
    new AgeFilter(),
    new IncomeFilter(),
    new DwellingFilter(),
  ];
  indicatorColorList = [
    '#d1fcd0',
    '#7CFC00',
    '#ffe81c',
    '#ffae02',
    '#ff6749',
    '#d23111'
  ];
  currentFilter: AbstractFilter = this.filterList[0];

  /**
   * Initialisation
   */
  ngOnInit(): void {
    this.setupMap();
    this.setupFusionLayer();
    this.setupSearchInput();
  }

  /**
   * Setup Google Map
   */
  private setupMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -25, lng: 133},
      zoom: 4
    });
  }

  /**
   * Setup Suburb Search Input
   */
  private setupSearchInput() {
    const input = document.getElementById('map_search');
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'au'}
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(this.autocomplete, 'place_changed', this.onAutocompleteSelected.bind(this));
  }

  /**
   * Setup Fusion Table
   */
  private setupFusionLayer() {
    const fusionLayerOptions = {
      query: {
        select: 'geometry',
        from: this.fusionTableId
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
    this.fusionLayer = new google.maps.FusionTablesLayer(fusionLayerOptions);
    this.updateMapWithFilter();
    this.setupFusionTableClickListener();
  }

  /**
   * Fusion Table Map On Click Listener
   */
  private setupFusionTableClickListener() {
    const self = this;
    google.maps.event.addListener(this.fusionLayer, 'click', function(e) {
      console.log(`state = '${e.row.state.value}' AND suburb = '${e.row.suburb.value}'`);

      self.fusionLayer.setOptions({
        styles: [{
          where: `people < 5000`,
          polygonOptions: {
            fillColor: '#000000',
            fillOpacity: 0.5,
          }
        }]
      });
    });
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
   * @param filteringAttribute
   * @param params
   * @param colorIndex
   */
  getFusionTableStyle(filteringAttribute, params: FusionTableStyle, colorIndex: number) {
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
        fillColor: this.indicatorColorList[colorIndex],
        fillOpacity: 0.3,
        strokeOpacity: 0.7,
        strokeWeight: 1,
      }
    };
  }

  /**
   * Update Current Filter
   *
   * @param filter
   */
  updateCurrentFilter(event) {
    this.currentFilter = this.filterList[event.target.value];
    this.updateMapWithFilter();

  }

  /**
   * Update Map
   * @param filteringAttribute
   */
  updateMapWithFilter() {
    const styles = [];
    this.currentFilter.indicators.forEach((colourIndicator, colorIndex) => {
      styles.push(this.getFusionTableStyle(this.currentFilter.fusionTableColumn, colourIndicator, colorIndex));
    });
    this.fusionLayer.setOptions({
      styles: styles
    });
  }
}
