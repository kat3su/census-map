import {FusionTableStyle} from '../fusion-table-style';
import {AbstractFilter} from './@abstract-filter';

export class PeopleFilter extends AbstractFilter {
  fusionTableColumn = 'people';
  display = 'Display map by population';
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
};