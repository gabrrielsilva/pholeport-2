import { photo_gap } from '../config/layout';
import '../config/styles';

export function create_photo_row(photo_columns: any[], pageBreak: string) {
  return {
    style: 'columns',
    columns: [
      photo_columns[0],
      photo_columns[1],
    ],
    columnGap: photo_gap,
    pageBreak,
  };
}