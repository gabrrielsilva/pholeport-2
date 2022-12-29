import inquirer from 'inquirer';
import fs from 'node:fs';
import { ask_question } from '../util/ask-question';

type Answer = {
  id: string, 
  titulo: string, 
  seguimento: string, 
  localidade: string, 
  site_abordagem: string, 
  versao: string, 
  left_logo: string, 
  right_logo: string
}

export async function ask_questions(): Promise<Answer> {
  const logos = fs.readdirSync('source/static/images/logos');

  const answer: Answer = await inquirer.prompt([
    ask_question('id', 'Qual o id do projeto?'),
    ask_question('titulo', 'Qual o titulo do projeto?'),
    ask_question('seguimento', 'Qual o seguimento do projeto?'),
    ask_question('localidade', 'Qual a localidade do projeto?'),
    ask_question('site_abordagem', 'Qual o site/abordagem do projeto?'),
    ask_question('versao', 'Qual a versão do projeto?'),
    ask_question('left_logo', 'Escolha a logo esquerda do cabeçalho', 'list', logos),
    ask_question('right_logo', 'Escolha a logo direita do cabeçalho', 'list', logos),
  ])

  return answer;
}