import { exec } from 'child_process';
import path from 'node:path';

export function compress_pdf(filepath: string) {
  const script_path = path.join(__dirname, '../script/shrinkpdf.bat');
  exec(`${script_path} ${filepath}`);
}