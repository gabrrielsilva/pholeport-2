import { header_height, header_widths } from '../config/pdf-layout';
import '../config/pdf-style';

export function create_header(
  id: string, 
  titulo: string, 
  seguimento: string, 
  localidade: string, 
  site_abordagem: string, 
  versao: string, 
  left_logo: string, 
  right_logo: string
) {
  return {
    style: 'header',
    table: {
      widths: header_widths,
      heights: header_height,
      body: [
        [
          { rowSpan: 4, image: `public/image/logo/${left_logo}`, fit: [100, 100], alignment: 'center', margin: [0, 10] },
          { rowSpan: 2, text: `RELATÓRIO FOTOGRÁFICO\n ${seguimento}`, style: 'title_header' },
          { rowSpan: 2, text: `ID SGI/GL SGP\n ${id}`, style: 'info_header' },
          { rowSpan: 2, text: `SITE/ABORD\n ${site_abordagem}`, style: 'info_header' },
          { rowSpan: 4, image: `public/image/logo/${right_logo}`, fit: [100, 100], alignment: 'center', margin: [0, 10] },
        ],
        [],
        [
          '',
          { text: `PROJETO: ${titulo}`,  style: 'info_header' },
          { rowSpan: 2, text: `DATA\n ${new Date().toLocaleDateString('pt-BR')}`, style: 'info_header' },
          { rowSpan: 2, text: `VERSÃO\n ${versao}`, style: 'info_header' },
          '',
        ],
        [
          '',
          { text: `LOCALIDADE: ${localidade}`, style: 'info_header' },
          '',
          '',
          '',
        ],
      ],
    },
  };
}