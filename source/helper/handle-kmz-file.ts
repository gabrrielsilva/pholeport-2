import fs from 'node:fs';
import { input_path, kmz_copy_path, kmz_extracted } from '../config/paths';
import { extract_files } from '../util/extract-files';

export async function handle_kmz_file() {
  const input_files = fs.readdirSync(input_path);
  const kmz_filename = input_files.find((file) => file.endsWith('.kmz'));

  if (!kmz_filename) throw new Error('Coloque um KMZ na pasta input');
  if (fs.existsSync(kmz_extracted)) fs.rmSync(kmz_extracted, { recursive: true, force: true });

  fs.mkdirSync(kmz_extracted);
  fs.copyFileSync(input_path + '/' + kmz_filename, kmz_copy_path);
  fs.renameSync(kmz_copy_path, kmz_copy_path + '.zip');

  await extract_files(kmz_copy_path + '.zip', kmz_extracted);
}