import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Listbox } from './components/Listbox';
import { Result } from './components/Result';
import { H1 } from './components/typography/H1';
import getErrorMessage from './util/getErrorMessage';

type FormData = {
  kmz: FileList,
  id: string,
  titulo: string,
  seguimento: string,
  localidade: string,
  site_abordagem: string,
  versao: string,
  left_logo: string, 
  right_logo: string
}

function App() {
  const [logos, setLogos] = useState<string[]>([]);
  const [summary, setSummary] = useState<{ poles_amount: number, photos_amount: number, poles_without_photos: number, timing: number }>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit({ kmz, id, titulo, seguimento, localidade, site_abordagem, versao, left_logo, right_logo }: FormData) {                
    try {
      const summary = await window.pholeport.handle_pholeport({ 
        id, 
        titulo, 
        seguimento, 
        localidade, 
        site_abordagem, 
        versao, 
        input_file_path: kmz[0].path,
        left_logo,
        right_logo
      });
  
      setSummary(summary);
    } catch (e) {      
      setErrorMessage(getErrorMessage(e));
    }
  }

  async function getLogos() {
    setLogos(await window.pholeport.get_logos());
  }

  useEffect(() => { getLogos() }, []);

  return (
    <div className='w-screen h-screen p-10'>
      <H1 text='Pholeport' extraStyles='text-[#121212] mb-10' />
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='grid grid-cols-3 gap-5'>
        <input type="file" {...register('kmz', { required: true })} accept=".kmz" className='w-full text-sm text-gray-500 col-span-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200' />
        <Input register={register} field='id' rules={{ required: true, minLength: 5, maxLength: 5 }} errors={errors} errorMessage='Campo obrigatório de 5 caracteres' />
        <Input register={register} field='titulo' rules={{ required: true }} errors={errors} errorMessage='Campo obrigatório' />
        <Input register={register} field='seguimento' rules={{ required: true }} errors={errors} errorMessage='Campo obrigatório' />
        <Input register={register} field='localidade' rules={{ required: true }} errors={errors} errorMessage='Campo obrigatório' />
        <Input register={register} field='site_abordagem' label='site/abordagem' rules={{ required: true }} errors={errors}errorMessage='Campo obrigatório' />
        <Input register={register} field='versao' label='versão' rules={{ required: true }} errors={errors} errorMessage='Campo obrigatório' />
        <Listbox label='Logo esquerda' options={logos} control={control} name='left_logo' defaultValue={logos[0]} />
        <Listbox label='Logo direita' options={logos} control={control} name='right_logo' defaultValue={logos[0]} />
        <Button type='submit' text='Gerar relatório' onClick={() => { setErrorMessage(null); setSummary(null) }} extraStyles='bg-[#3992ff] hover:bg-blue-600 text-white col-span-3 mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-blue-200 transition-colors duration-200' />
        {isSubmitting && !summary && !errorMessage ? <p className='font-sans text-lg font-medium text-orange-500'>Processando...</p> : ''}
        {summary && !errorMessage && !isSubmitting ? <Result poles_amount={summary?.poles_amount} photos_amount={summary?.photos_amount} poles_without_photos={summary?.poles_without_photos} timing={summary?.timing} /> : ''}
        {errorMessage && !isSubmitting && !summary ? <span className='w-full font-sans text-lg font-bold text-red-600 whitespace-nowrap'>{errorMessage.includes(': Error:') ? errorMessage.split(': Error:')[1] : errorMessage}</span> : ''}
      </form>
    </div>
  )
}

export default App;