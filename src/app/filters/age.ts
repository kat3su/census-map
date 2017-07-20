import {AbstractFilter} from './@abstract-filter';
import {FusionTableStyle} from '../fusion-table-style';

export class AgeFilter extends AbstractFilter {
  fusionTableColumn = 'median_age';
  display = 'Display Map by Median Age' ;
  indicators: FusionTableStyle[] = [
    {
      from: 0,
      to: 20,
      color: '#d1fcd0',
      display: '0 - 20'
    },
    {
      from: 21,
      to: 30,
      color: '#7CFC00',
      display: '21 - 30'
    },
    {
      from: 31,
      to: 40,
      color: '#ffe81c',
      display: '31 - 40'
    },
    {
      from: 41,
      to: 50,
      color: '#ffae02',
      display: '41 - 50'
    },
    {
      from: 51,
      to: null,
      color: '#ff6749',
      display: '51 - 60'
    },
  ];
}