import { ipcMain } from 'electron';
import { handle_pholeport, Input } from 'source/main/handle-pholeport';

ipcMain.handle(
  'pholeport',
  async (_, { id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path }: Input) => {
    const output = await handle_pholeport({ id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path });
    return output;
  }
);