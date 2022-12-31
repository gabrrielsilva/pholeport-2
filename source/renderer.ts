type windowAPIs = {
  pholeport: {
    handle_pholeport({ id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path }: {
      id: string,
      titulo: string,
      seguimento: string, 
      localidade: string,
      site_abordagem: string,
      versao: string,
      input_file_path: string
    }): Promise<{
      poles_amount: number,
      photos_amount: number,
      poles_without_photos: number,
      timing: number
    }>
  }
}

const input_file_selector = document.getElementById('kmz_file');
let input_file_path = '';

input_file_selector?.addEventListener('change', async e => {
  const kmz_file = ((e.target as HTMLInputElement).files as FileList)[0];
  input_file_path = kmz_file.path;
})

async function handle_submit() {
  const id = (document.getElementById('id') as HTMLInputElement).value;
  const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
  const seguimento = (document.getElementById('seguimento') as HTMLInputElement).value;
  const localidade = (document.getElementById('localidade') as HTMLInputElement).value;
  const site_abordagem = (document.getElementById('site_abordagem') as HTMLInputElement).value;
  const versao = (document.getElementById('versao') as HTMLInputElement).value;

  if (!id || !titulo || !seguimento || !localidade || !site_abordagem || !versao) throw new Error('Missing params');

  await (window as Window & typeof globalThis & windowAPIs).pholeport.handle_pholeport({ 
    id, 
    titulo, 
    seguimento, 
    localidade, 
    site_abordagem, 
    versao, 
    input_file_path 
  });

  // (document.getElementById('response') as HTMLDivElement).innerText = JSON.stringify(response);
}