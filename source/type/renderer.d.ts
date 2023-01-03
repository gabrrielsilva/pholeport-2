export interface IPholeportAPI {
  handle_pholeport: ({
    id,
    titulo,
    seguimento, 
    localidade,
    site_abordagem,
    versao,
    input_file_path
  }: {
    id: string,
    titulo: string,
    seguimento: string, 
    localidade: string,
    site_abordagem: string,
    versao: string,
    input_file_path: string
  }) => Promise<{
    poles_amount: number,
    photos_amount: number,
    poles_without_photos: number,
    timing: number
  }>
}

declare global {
  interface Window {
    pholeport: IPholeportAPI
  }
}