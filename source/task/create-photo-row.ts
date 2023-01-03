import { photo_gap } from '../config/pdf-layout';
import '../config/pdf-style';

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