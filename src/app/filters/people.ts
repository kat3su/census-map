import {FusionTableStyle} from '../fusion-table-style';
import {AbstractFilter} from './@abstract-filter';

export class PeopleFilter extends AbstractFilter {
  fusionTableColumn = 'people';
  display = 'Display map by population';
  indicators: FusionTableStyle[] = [
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
    }
  ];
};
