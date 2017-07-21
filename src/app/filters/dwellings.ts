import {AbstractFilter} from './@abstract-filter';
import {FusionTableStyle} from '../fusion-table-style';
export class DwellingFilter extends AbstractFilter {
  fusionTableColumn = 'private_dwellings';
  display = 'Display Map by Private Dwellings';
  indicators: FusionTableStyle[] = [
    {
      from: 0,
      to: 500,
      color: '#d1fcd0'
    },
    {
      from: 501,
      to: 2000,
      color: '#7CFC00'
    },
    {
      from: 2001,
      to: 5000,
      color: '#ffe81c'
    },
    {
      from: 5001,
      to: 10000,
      color: '#ffae02'
    },
    {
      from: 10001,
      to: 15000,
      color: '#ff6749'
    },
    {
      from: 15001,
      to: null,
      color: '#d23111'
    }
  ];
}
