import decompress from 'decompress';

export async function extract_files(zip_file_path: string, outpur_dir: string) {
  try {
    await decompress(zip_file_path, outpur_dir);
  } catch (e) {
    throw(e);
  }
}