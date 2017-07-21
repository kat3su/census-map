import {AbstractFilter} from './@abstract-filter';
import {FusionTableStyle} from '../fusion-table-style';

export class AgeFilter extends AbstractFilter {
  fusionTableColumn = 'median_age';
  display = 'Display Map by Median Age' ;
  indicators: FusionTableStyle[] = [
    {
      from: 0,
      to: 20,
      color: '#d1fcd0'
    },
    {
      from: 21,
      to: 30,
      color: '#7CFC00'
    },
    {
      from: 31,
      to: 40,
      color: '#ffe81c'
    },
    {
      from: 41,
      to: 50,
      color: '#ffae02'
    },
    {
      from: 51,
      to: null,
      color: '#ff6749'
    },
  ];
}