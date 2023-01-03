import path from 'node:path';

const photo_width = 120,
      photo_height = 150,
      photo_header_height = 12,
      photo_gap = 30,
      fonts = {
        Roboto: {
          normal: path.resolve('..", "..", "public", "fonts", "Roboto-Regular.ttf'),
          bold: path.resolve('..", "..", "public", "fonts", "Roboto-Medium.ttf'),
          italics: path.resolve('..", "..", "public", "fonts", "Roboto-Italic.ttf'),
          bolditalics: path.resolve('..", "..", "public", "fonts", "Roboto-MediumItalic.ttf'),
        },
      },
      header_widths = ['20%', '36%', '12%', '12%', '20%'],
      header_height = 12

export { photo_width, photo_height, photo_header_height, photo_gap, fonts, header_widths, header_height };

