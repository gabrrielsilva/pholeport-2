import decompress from 'decompress';

export async function extract_files(zip_file_path: string, output_dir: string): Promise<void> {
  await decompress(zip_file_path, output_dir);
}