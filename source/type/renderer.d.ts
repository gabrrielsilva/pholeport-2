export interface PholeportAPI {
  get_logos: () => Promise<string[]>,
  handle_pholeport: ({
    id,
    titulo,
    seguimento,
    localidade,
    site_abordagem,
    versao,
    input_file_path,
    left_logo,
    right_logo,
  }: {
    id: string;
    titulo: string;
    seguimento: string;
    localidade: string;
    site_abordagem: string;
    versao: string;
    input_file_path: string;
    left_logo: string;
    right_logo: string;
  }) => Promise<{
    poles_amount: number;
    photos_amount: number;
    poles_without_photos: number;
    timing: number;
  }>;
}

declare global {
  interface Window {
    pholeport: PholeportAPI;
  }
}
