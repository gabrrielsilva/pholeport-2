import fs from 'node:fs';
import { kmz_extracted } from '../config/path';
import { extract_files } from '../service/extract-files';

export async function handle_kmz_file(kmz_file_path: string) {  
  const kmz_copy_path = kmz_extracted + '/' + kmz_file_path.split('\\').pop();
  
  if (fs.existsSync(kmz_extracted)) {
    fs.rmSync(kmz_extracted, { recursive: true, force: true });
  }
  fs.mkdirSync(kmz_extracted);
  fs.copyFileSync(kmz_file_path, kmz_copy_path);
  fs.renameSync(kmz_copy_path, kmz_copy_path + '.zip');
  await extract_files(kmz_copy_path + '.zip', kmz_extracted);
}