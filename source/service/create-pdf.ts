import fs from 'node:fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from '../config/pdf-layout';
import { pdf_style } from '../config/pdf-style';

const printer = new PdfPrinter(fonts);

export function create_pdf(path: string, header: any, layout: any[]) {
  const doc_definition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [0, 95, 0, 0],
    header,
    content: [layout],
    styles: pdf_style,
    compress: true
  }

  const pdf = printer.createPdfKitDocument(doc_definition);
  const write_stream = fs.createWriteStream(path + '.pdf');

  pdf.pipe(write_stream);
  pdf.end();
}