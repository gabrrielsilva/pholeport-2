let input_file_path = '';

const input_file_selector = document.getElementById('kmz_file');

input_file_selector?.addEventListener('change', async e => {
  const kmz_file = ((e.target as HTMLInputElement).files as FileList)[0];
  input_file_path = kmz_file.path;
});

document.getElementById('form')?.addEventListener('submit', e => {
  e.preventDefault();
  handle_submit();
});

export async function handle_submit() {
  const id = (document.getElementById('id_input') as HTMLInputElement).value;
  const titulo = (document.getElementById('titulo_input') as HTMLInputElement).value;
  const seguimento = (document.getElementById('seguimento_input') as HTMLInputElement).value;
  const localidade = (document.getElementById('localidade_input') as HTMLInputElement).value;
  const site_abordagem = (document.getElementById('site_abordagem_input') as HTMLInputElement).value;
  const versao = (document.getElementById('versao_input') as HTMLInputElement).value;

  if (!id || !titulo || !seguimento || !localidade || !site_abordagem || !versao) throw new Error('Missing params');

  const summary = await window.pholeport.handle_pholeport({ 
    id, 
    titulo, 
    seguimento, 
    localidade, 
    site_abordagem, 
    versao, 
    input_file_path 
  });

  (document.getElementById('summary') as HTMLElement).innerText = JSON.stringify(summary);
}