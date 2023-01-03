import { StyleDictionary } from 'pdfmake/interfaces';

const pdf_style: StyleDictionary = {
  header: { margin: [0, 0, 0, 0] },
  title_header: { fontSize: 13, bold: true, alignment: 'center' },
  info_header: { fontSize: 9, bold: true },
  columns: { alignment: 'center', margin: [25, 0, 25, 10] },
  title_photo_table: { alignment: 'center', fontSize: 10, bold: true, color: 'white', fillColor: '#1F2937' },
};

export { pdf_style };

