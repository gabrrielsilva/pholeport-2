import { ipcMain } from 'electron';
import { handle_pholeport, Input } from '../../../main/handle-pholeport';

ipcMain.handle(
  'pholeport',
  async function(_, input: Input) {
    const { id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path } = input;
    const output = await handle_pholeport({ id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path });
    return output;
  }
);