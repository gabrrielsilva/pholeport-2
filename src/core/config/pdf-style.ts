import { StyleDictionary } from 'pdfmake/interfaces';

export const pdf_style: StyleDictionary = {
  header: { margin: [0, 0, 0, 0] },
  title_header: { fontSize: 13, bold: true, alignment: 'center' },
  title_header_highlighted: { fontSize: 13, bold: true, alignment: 'center', color: '#004674' },
  info_header: { fontSize: 9, bold: true },
  info_header_highlighted: { fontSize: 9, bold: true, color: '#004674' }, 
  columns: { alignment: 'center', margin: [25, 0, 25, 10] },
  title_photo_table: { alignment: 'center', fontSize: 10, bold: true, color: 'white', fillColor: '#1F2937' },
};