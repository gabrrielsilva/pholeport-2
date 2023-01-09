import path from 'node:path';

const photo_width = 120,
      photo_height = 150,
      photo_header_height = 12,
      photo_gap = 30,
      fonts = {
        Roboto: {
          normal: path.join(__dirname, '../public/font/Roboto-Regular.ttf'),
          bold: path.join(__dirname, '../public/font/Roboto-Medium.ttf'),
          italics: path.join(__dirname, '../public/font/Roboto-Italic.ttf'),
          bolditalics: path.join(__dirname, '../public/font/Roboto-MediumItalic.ttf')
        },
      },
      header_widths = ['20%', '36%', '12%', '12%', '20%'],
      header_height = 12

export { photo_width, photo_height, photo_header_height, photo_gap, fonts, header_widths, header_height };

