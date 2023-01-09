import fs from 'node:fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from '../config/pdf-layout';
import { pdf_style } from '../config/pdf-style';
import { compress_pdf } from './compress-pdf';

const printer = new PdfPrinter(fonts);

export async function create_pdf(filepath: string, header: any, layout: any[]) {
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
  const write_stream = fs.createWriteStream(filepath);

  pdf.pipe(write_stream);
  pdf.end();

  compress_pdf(filepath);
}