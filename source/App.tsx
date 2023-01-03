import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { H1 } from './components/typography/H1';

type FormData = {
  kmz: FileList,
  id: string,
  titulo: string,
  seguimento: string,
  localidade: string,
  site_abordagem: string,
  versao: string
}

function App() {
  const [summary, setSummary] = useState<{ poles_amount: number, photos_amount: number, poles_without_photos: number, timing: number }>();
  const { register, handleSubmit } = useForm();

  async function onSubmit({ kmz, id, titulo, seguimento, localidade, site_abordagem, versao }: FormData) {
    const summary = await window.pholeport.handle_pholeport({ 
      id, 
      titulo, 
      seguimento, 
      localidade, 
      site_abordagem, 
      versao, 
      input_file_path: kmz[0].path
    });

    setSummary(summary);
  }

  return (
    <div className='w-screen h-screen p-10'>
      <header className='relative flex justify-between items-center'>
        <H1 text='Pholeport' extraStyles='text-[#121212] mb-10' />
        <div className='text-center -mt-8'>
          <span className='text-gray-400 text-base font-medium'>Powered by</span>
          <img className='h-12' src="image/infinitel.png" alt="infinitel logo" />
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='grid grid-cols-3 gap-5'>
        <div className='col-span-full'>
          <Input type={'file'} register={register} field='kmz' accept=".kmz" extraStyles='border-0 px-0' />
        </div>
        <Input type={'text'} register={register} field='id' />
        <Input type={'text'} register={register} field='titulo' />
        <Input type={'text'} register={register} field='seguimento' />
        <Input type={'text'} register={register} field='localidade' />
        <Input type={'text'} register={register} field='site_abordagem' label='site/abordagem' />
        <Input type={'text'} register={register} field='versao' label='versão' />
        <Button type='submit' text='Gerar relatório' extraStyles='bg-[#3992ff] hover:bg-blue-600 text-white col-span-3 mt-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-blue-200 transition-colors duration-200' />
      </form>
      <p>{summary?.timing}</p>
      <p>{summary?.poles_amount}</p>
      <p>{summary?.photos_amount}</p>
      <p>{summary?.poles_without_photos}</p>
    </div>
  )
}

export default App
