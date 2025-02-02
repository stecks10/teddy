# Front-End - Client Management

## Descrição

Este projeto é a interface web para o sistema de gerenciamento de clientes, desenvolvido com [React](https://react.dev/) e [Vite](https://vitejs.dev/). O sistema permite ao usuário:

- Inserir seu nome na tela inicial e ser redirecionado para a tela de clientes.
- Visualizar uma lista de clientes cadastrados.
- Cadastrar novos clientes.
- Selecionar clientes para edição ou remoção.
- Atualizar informações de um cliente existente.
- Excluir clientes.

## Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces de usuário
- **Vite** - Ferramenta de build rápida para projetos React
- **TailwindCSS** - Estilização moderna e responsiva
- **React Router** - Gerenciamento de rotas
- **Axios** - Consumo de API
- **React Hook Form** - Gerenciamento de formulários
- **UUID** - Geração de identificadores únicos

## Requisitos

- Node.js 20+
- Gerenciador de pacotes npm ou yarn

## Instalação

1. Clone este repositório:

   ```sh
   git clone https://github.com/stecks10
   cd teddy
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Copie o arquivo de variáveis de ambiente:

   ```sh
   cp .env.example .env
   ```

## Execução

Para rodar o projeto em modo de desenvolvimento:

```sh
npm run dev
```

O sistema estará acessível em: [http://localhost:5173](http://localhost:5173)

## Construção para Produção

Para compilar a aplicação para produção:

```sh
npm run build
```

Para visualizar a build localmente:

```sh
npm run preview
```

## Responsividade

A aplicação foi projetada para ser responsiva, garantindo uma boa experiência em dispositivos de diferentes tamanhos.

## Autor

- **Vitor Nunes do Nascimento** - [GitHub](https://github.com/stecks10)

## Licença

Este projeto está sob a licença UNLICENSED.
