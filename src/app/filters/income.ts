import {AbstractFilter} from './@abstract-filter';
import {FusionTableStyle} from '../fusion-table-style';
export class IncomeFilter extends AbstractFilter {
  fusionTableColumn = 'median_weekly_household_income';
  display = 'Display Map by Median Weekly Household Income';
  indicators: FusionTableStyle[] = [
    {
      from: 0,
      to: 500,
      color: '#d1fcd0',
      display: '0 - 300'
    },
    {
      from: 501,
      to: 1000,
      color: '#7CFC00',
      display: '301 - 500'
    },
    {
      from: 1001,
      to: 1300,
      color: '#ffe81c',
      display: '501 - 800'
    },
    {
      from: 1301,
      to: 1500,
      color: '#ffae02',
      display: '801 - 1000'
    },
    {
      from: 1501,
      to: 2000,
      color: '#ff6749',
      display: '1001 - 1500'
    },
    {
      from: 2001,
      to: null,
      color: '#d23111',
      display: '1501+'
    }
  ];


}