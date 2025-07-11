
 /$$$$$$$  /$$                                                  /$$$$$$                       /$$$$$$ 
| $$__  $$| $$                                                 /$$__  $$                     /$$__  $$
| $$  \ $$| $$  /$$$$$$  /$$$$$$$  /$$$$$$$   /$$$$$$         | $$  \__/  /$$$$$$   /$$$$$$ | $$  \__/
| $$$$$$$/| $$ /$$__  $$| $$__  $$| $$__  $$ /$$__  $$ /$$$$$$|  $$$$$$  |____  $$ |____  $$|  $$$$$$ 
| $$____/ | $$| $$$$$$$$| $$  \ $$| $$  \ $$| $$  \ $$|______/ \____  $$  /$$$$$$$  /$$$$$$$ \____  $$
| $$      | $$| $$_____/| $$  | $$| $$  | $$| $$  | $$         /$$  \ $$ /$$__  $$ /$$__  $$ /$$  \ $$
| $$      | $$|  $$$$$$$| $$  | $$| $$  | $$|  $$$$$$/        |  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$/
|__/      |__/ \_______/|__/  |__/|__/  |__/ \______/          \______/  \_______/ \_______/ \______/ 
                                                                                                      
                                                                                                      
                                                                                                    

**Bem-vindo ao Plenno-SaaS!**  
Uma aplicação web *moderna* construída com **React**, **TypeScript** e **Vite**. Esta plataforma SaaS foi projetada para gerenciar tarefas e fluxos de trabalho com eficiência.

## **Funcionalidades**

- **Autenticação segura**: Login e registro com proteção avançada.
- **Gerenciamento em tempo real**: Crie, edite e acompanhe tarefas instantaneamente.
- **Interface responsiva**: Design adaptável para desktop e mobile.
- **Integrações**: A Desenvolver.

## **Tecnologias Utilizadas**

- **React**: Biblioteca para interfaces de usuário dinâmicas.
- **TypeScript**: Tipagem estática para maior robustez.
- **Vite**: Build rápido com *Hot Module Replacement* (HMR).
- **ESLint**: Regras para qualidade e consistência de código.
- **Tailwind CSS**

## **Pré-requisitos**

Antes de começar, instale:  
- **Node.js** (versão 18 ou superior)  
- **Git**  
- Um editor como *VS Code*

## **Configuração do Projeto**

1. **Clone o repositório**:  
git clone https://github.com/Abraaog/Plenno-SaaS.git
cd Plenno-SaaS/plenno-app

2. **Instale as dependências**:
npm install

3. **Execute em modo de desenvolvimento**:
npm run dev
Acesse em **http://localhost:5173**.

4. **Build para produção**:
npm run build

5. **Visualize o build**:
npm run preview


## **Configuração do ESLint**

O projeto usa **ESLint** com regras para *TypeScript* e *React*. Para personalizar, edite `eslint.config.js`:

import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

// Definindo tipagem explícita para a configuração
const config = tseslint.config([
  {
    ignores: ['dist'], // Ignora a pasta de build
  },
  {
    files: ['**/*.{ts,tsx}'], // Arquivos TypeScript e TSX
    extends: [
      ...tseslint.configs.recommendedTypeChecked, 
      reactX.configs['recommended-typescript'], 
      reactDom.configs.recommended, 
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'], 
        tsconfigRootDir: import.meta.dirname, 
      },
    },
  },
]);

export default config;


**Documentações**:  
- *typescript-eslint*: https://typescript-eslint.io/  
- *eslint-plugin-react-x*: https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x  
- *eslint-plugin-react-dom*: https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom  

## **Contribuindo**

Contribuições são *bem-vindas*! Siga os passos:  

1. Faça um **fork** do repositório.  
2. Crie uma branch:
  git checkout -b minha-feature
3. Faça alterações e commit:
   git commit -m "Descreva sua alteração"
4. Envie para o repositório remoto:
   git push origin minha-feature


5. Abra um **Pull Request** no GitHub.  

## **Licença**

Este projeto está sob a **Licença MIT**. Veja o arquivo `LICENSE` para detalhes.

## **Contato**

Para dúvidas, contate *abraaogomesjppb@gmail.com* ou abra uma *issue* em https://github.com/Abraaog/Plenno-SaaS/issues.

---
*Desenvolvido com paixão por Abraão Gomes da Silva Araújo.*

![GitHub](https://img.shields.io/github/license/Abraaog/Plenno-SaaS)
![Vite](https://img.shields.io/badge/Vite-4.x-blueviolet)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
