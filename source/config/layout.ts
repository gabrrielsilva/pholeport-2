import { StyleDictionary } from 'pdfmake/interfaces';

const photo_width = 120,
      photo_height = 150,
      photo_header_height = 12,
      photo_gap = 30,
      styles: StyleDictionary = {
        header: { margin: [0, 0, 0, 0] },
        title_header: { fontSize: 13, bold: true, alignment: 'center' },
        info_header: { fontSize: 9, bold: true },
        columns: { alignment: 'center', margin: [25, 0, 25, 10] },
        title_photo_table: { alignment: 'center', fontSize: 10, bold: true, color: 'white', fillColor: '#1F2937' },
      };

export { photo_width, photo_height, photo_header_height, photo_gap, styles };

