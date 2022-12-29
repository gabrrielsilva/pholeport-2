import '../config/layout';
import { photo_gap } from '../config/layout';

export function create_photo_row(photo_columns: {
  width: string;
  table: {
      widths: number[];
      heights: number[];
      body: ((string | {
          style: string;
          colSpan: number;
          text: string;
      })[] | {
          image: string;
          width: number;
          height: number;
      }[])[];
  };
}[]) {
  return {
    style: 'columns',
    columns: [
      photo_columns[0],
      photo_columns[1],
    ],
    columnGap: photo_gap,
    // pageBreak,
  };
}