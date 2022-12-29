import fs from 'node:fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from './config/layout';
import styles from './config/styles';

const printer = new PdfPrinter(fonts);

export function create_pdf(filename: string, header: any, photo_layouts: any[]) {
  const doc_definition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [0, 95, 0, 0],
    header,
    content: [photo_layouts],
    styles,
    
  }

  const pdf = printer.createPdfKitDocument(doc_definition);
  const write_stream = fs.createWriteStream(filename + '.pdf');

  pdf.pipe(write_stream);
  pdf.end();
}