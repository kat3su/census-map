import {FusionTableStyle} from '../fusion-table-style';
export abstract class AbstractFilter {
  abstract fusionTableColumn: string;
  abstract display: string;
  abstract indicators: FusionTableStyle[];
}
