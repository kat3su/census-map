import {Component, OnInit} from '@angular/core';
import {FusionTableStyle} from './fusion-table-style';
import {PeopleFilter} from './filters/people';
import {AgeFilter} from './filters/age';
import {AbstractFilter} from './filters/@abstract-filter';
import {IncomeFilter} from './filters/income';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map;
  autocomplete;
  fusionLayer;
  filterList = [
    new PeopleFilter(),
    new AgeFilter(),
    new IncomeFilter(),
  ];
  currentFilter: AbstractFilter = this.filterList[0];

  /**
   * Initialisation
   */
  ngOnInit(): void {
    console.log(this.filterList);
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

    this.currentFilter.indicators.forEach(colourIndicator => {
      fusionLayerOptions.styles.push(this.getFusionTableStyle('people', colourIndicator));
    });
    this.fusionLayer = new google.maps.FusionTablesLayer(fusionLayerOptions);
    this.updateMapWithFilter();
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
        fillColor: params.color,
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
    this.currentFilter.indicators.forEach(colourIndicator => {
      styles.push(this.getFusionTableStyle(this.currentFilter.fusionTableColumn, colourIndicator));
    });
    this.fusionLayer.setOptions({
      styles: styles
    });
  }
}
