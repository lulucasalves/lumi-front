
# Lumi Front-end

Este projeto foi feito para análise recorrente de gastos com enegia elétrica, sendo analisado os boletos que são enviados

### Design do projeto
O design do projeto foi feito no [Figma](https://www.figma.com/file/jcZf4pS3jaIwg57hLHPL84/Lumi?type=design&node-id=0%3A1&mode=design&t=SzS9HPUfOOzRvTx2-1) com 4 frames, sendo eles 2 de páginas com template para PC e 2 com template para celular, seu design foi inspirado no site da [Lumi](https://www.labs-lumi.com.br/).

### Desenvolvimento
Este projeto foi desenvolvido com Nextjs (Versão 3.4), Typescript (Versão 5.1) e React (Versão 18.2), junto com dependencias que utilizo muito em meus projetos: styled-components, react-icons e react-vis.

Para iniciar o projeto localmente basta digitar o comando `yarn && yarn dev` ou `npm i && npm dev` e acessar a [porta 3000](http://localhost:3000).

### Deploy

A prefêrencia do deploy era para ser no AWS ECS porém sem recursos financeiros não foi possível fazer isso, então para apresentação eu subi a aplicação na Vercel

## Atenção!

No primeiro acesso pode demorar até 1 minuto para carregar as requisições, isso ocorre pelo fato da api estar hospedada em um servidor gratuito com pouca memória de processamento.