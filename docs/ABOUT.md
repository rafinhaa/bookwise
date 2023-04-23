# Introdução

Faaala dev!

Gostaria de lhe dar as boas vindas ao sexto desafio da trilha de **ReactJS** do **Ignite**. 🎉

Nesse desafio vamos construir uma aplicação completa, desenvolvendo desde um front-end ao back-end, semelhante ao que vimos no módulo.

Como se trata de um desafio, ele necessita de alguns conhecimentos além dos abordados nesse módulo, então é importante que tenha autonomia para que consiga pesquisar essas coisas caso não saiba como resolver. Por isso, lembre-se, **tenha calma** e **acredite no seu processo.** O aprendizado daqui é muito importante, mas você com certeza vai conseguir sair daqui com muito conhecimento bacana 💜

# Sobre o desafio

Nesse desafio, você vai aproveitar o que aprendeu durante o módulo para desenvolver uma plataforma de recomendações para leitores, um lugar onde eles possam avaliar e ver avaliações de outros leitores sobre os mais diversos livros.

# Layout do Desafio

Para essa aplicação nós fornecemos um layout para que você possa seguir e implementar os componentes desenhados no Figma.

Para acessar o Figma, você primeiro deve criar uma conta na plataforma.

### Criando uma conta no Figma

Para acessar o Layout da aplicação, você primeiramente deve ter uma conta criada na plataforma do Figma, para isso, você pode [clicar aqui](https://www.figma.com/signup).

Então, na página de cadastro, você pode logar diretamente com sua conta do Google ou criar uma conta com o e-mail que você preferir.

### Acessando o layout do app

Após criar e logar em sua conta, você deve duplicar o Layout do desafio. Para isso, basta você clicar no link abaixo. Ele adicionará o Layout à sua dashboard do Figma automaticamente, como uma cópia e abrirá o layout da aplicação para a sua visualização.

[BookWise](https://www.figma.com/file/jTau6bMNSF10GkqwYAbuLA/BookWise/duplicate)

# Desenvolvendo o desafio

Para desenvolver a desafio você pode tomar a total liberdade de escolha de tecnologias e ferramentas, deixamos isso para que você possa se desafiar e deixar a sua criatividade e conhecimentos guiar o caminho.

Entretanto, nós iremos dar um direcionamento para que você, caso queira, dar um primeiro passo com algumas configurações e padrões que criamos. Sinta-se livre para utilizá-las caso queira, ou você pode ignorá-las e criar tudo do zero caro você prefira. Você sempre tem a liberdade para utilizar, alterar e adaptar nossos exemplos para o que fizer mais sentido pra você:

### Estilização

Criamos um arquivo `stitches.config.ts` com todas as cores e estilizações utilizadas no layout.
_obs: Todas as cores e componentes estão disponíveis no style-guide que criamos dentro do figma, basta clicar em `assets` no menu do canto superior direito da tela_

```tsx
// stitches.config.ts

import { createStitches } from '@stitches/react';

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      default: 'Nunito, sans-serif',
    },

		space: {
      px: '1px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
    },

		fontSizes:
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },

		fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },

    lineHeights: {
      shorter: '125%',
      short: '140%',
      base: '160%',
      tall: '180%',
    },

    colors: {
			white: '#FFFFFF',
      black: '#000000',

      green: {
        100: '#50B2C0',
        200: '#255D6A',
        300: '#0A313C',
      },

      purple: {
        100: '#8381D9',
        200: '#2A2879',
      },

      gray: {
        100: '#F8F9FC',
        200: '#E6E8F2',
        300: '#D1D6E4',
        400: '#8D95AF',
        500: '#303F73',
        600: '#252D4A',
        700: '#181C2A',
        800: '#0E1116',
      },

			'gradient-vertical': `linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)`,
      'gradient-horizontal': `linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)`,
    },

		radii: {
      xs: '2.5px',
      sm: '5px',
      md: '10px',
      lg: '20px',
      full: '99999px',
    },
  },
})
```

E por estarmos utilizando _NextJS_ precisamos configurar o _Stitches_ para ele funcionar com o _Server Side Rendering_, para isso basta criar o seguinte arquivo `_document.tsx` dentro seu diretório `pages`.

```tsx
// _document.tsx

import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Fonte

Aqui vamos utilizar o recurso de `font` disponível nas novas versões do Next JS, para isso você vai precisar da seguinte configuração no seu arquivo `app.tsx`.

```jsx
// _app.tsx

import type { AppProps } from "next/app";
import { Nunito } from "@next/font/google";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunito.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
```

### Banco de dados

Vamos utilizar de `SQLite` como banco de dados e `Prisma` como _ORM_, e para facilitar as coisas vamos deixar um arquivo `schema.prisma` abaixo para que você consiga criar o banco rodando o comando `npx prisma migrate dev`.

```jsx
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id         String   @id @default(uuid())
  name       String
  avatar_url String?
  created_at DateTime @default(now())

  accounts Account[]
  sessions Session[]
  ratings  Rating[]

  @@map("users")
}

model Book {
  id          String   @id @default(uuid())
  name        String
  author      String
  summary     String
  cover_url   String
  total_pages Int
  created_at  DateTime @default(now())

  categories CategoriesOnBooks[]
  ratings    Rating[]

  @@map("books")
}

model Category {
  id   String @id @default(uuid())
  name String @unique

  books CategoriesOnBooks[]

  @@map("categories")
}

model CategoriesOnBooks {
  book_id    String
  categoryId String

  book     Book     @relation(fields: [book_id], references: [id])
  category Category @relation(fields: [categoryId], references: [id])

  @@id([book_id, categoryId])
}

model Rating {
  id          String   @id @default(uuid())
  rate        Int
  description String
  created_at  DateTime @default(now())

  book    Book   @relation(fields: [book_id], references: [id])
  book_id String

  user    User   @relation(fields: [user_id], references: [id])
  user_id String

  @@map("ratings")
}

model Account {
  id                  String  @id @default(cuid())
  user_id             String
  type                String
  provider            String
  provider_account_id String
  refresh_token       String?
  access_token        String?
  expires_at          Int?
  token_type          String?
  scope               String?
  id_token            String?
  session_state       String?
  user                User    @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@unique([provider, provider_account_id])
  @@map("accounts")
}

model Session {
  id            String   @id @default(cuid())
  session_token String   @unique
  user_id       String
  expires       DateTime
  user          User     @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

Depois de criar o banco você pode popular ele da forma como preferir, entretanto criamos um arquivo `seed.ts` para que você já tenha dados para utilizar na aplicação.

```jsx
import { PrismaClient } from "@prisma/client";
import { books } from "./constants/books";
import { categories } from "./constants/categories";
import { ratings } from "./constants/ratings";
import { users } from "./constants/users";

const prisma = new PrismaClient();

async function main() {
  await prisma.rating.deleteMany();
  await prisma.user.deleteMany();
  await prisma.categoriesOnBooks.deleteMany();
  await prisma.category.deleteMany();
  await prisma.book.deleteMany();

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      },
    });
  });

  const categoriesSeed = categories.map((category) => {
    return prisma.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    });
  });

  const booksSeed = books.map((book) => {
    return prisma.book.create({
      data: {
        id: book.id,
        name: book.name,
        author: book.author,
        summary: book.summary,
        cover_url: book.cover_url,
        total_pages: book.total_pages,
        categories: {
          create: [
            ...book.categories.map((category) => {
              return {
                category: {
                  connect: {
                    id: category.id,
                  },
                },
              };
            }),
          ],
        },
      },
    });
  });

  const ratingsSeed = ratings.map((rating) => {
    return prisma.rating.create({
      data: {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        user: {
          connect: { id: rating.user_id },
        },
        book: {
          connect: { id: rating.book_id },
        },
      },
    });
  });

  await prisma.$transaction([
    ...categoriesSeed,
    ...booksSeed,
    ...usersSeed,
    ...ratingsSeed,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Para rodar a seed basta executar o seguinte comando `npx prisma db sedd` !

Note que ainda usamos alguns outros arquivos para popular o nosso banco de dados e para facilitar as coisas vamos disponibilizar toda a pasta `prisma` para que você faça o download do arquivo _zip_ e acrescente ao seu projeto.

[prisma.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/835579f0-3b22-46f9-954f-b1c1c1c8706d/prisma.zip)

Não se esqueça também que vamos precisar configurar um arquivo `.env` para que possamos utilizar corretamente a integração com o `Prisma.`

```jsx
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

### Imagens

Para as capas dos livros indicamos uma solução simples e que vai servir muito bem para esse projeto, vamos usar as imagens armazenadas localmente no projeto, assim basta criar um diretório `images/` e colar a pasta disponibilizada abaixo

[books.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8aa212a4-c0f1-4a03-9c33-ca5ea7f52c09/books.zip)

_Além disso, vamos dar algumas dicas para você desenvolver algumas das funcionalidades da aplicação._

Note que a aplicação concede a possibilidade de acesso tanto para usuários autenticados quanto para usuários não autenticados, limitando algumas funcionalidades da aplicação, como por exemplo, realizar uma avaliação de um livro e acessar a página do seu próprio perfil.

Para fazer a autenticação recomendamos que você utilize a biblioteca `next-auth` e conforme vimos em aula essa biblioteca se baseia no modelo de `OAuth`e dispõe de vários provedores (_Google, Github, Facebook, …_), para esse projeto escolhemos utilizar o _Google_ e _Github_ como provedores de autenticação.

Para fazer login com o `Google` temos que criar um projeto no _Google Cloud_ e configurar as rotas e acessos, basta entrar no link ([_https://console.cloud.google.com/_](https://console.cloud.google.com/)) e seguir o passo a passo realizado em aula.

Para fazer login com o `Github` o processo é bem similar ao acima mas por vamos dispor de um passo a passo aqui:

- Adicione o Provider do `Github` no `[...nextauth].ts` :
  ```tsx
  import GitHubProvider from "next-auth/providers/github";
  ...
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
  ...
  ```
- Agora vamos buscar essas chaves, acesse as configuração de `OAuth` do seu github. basta acessar o link ([_https://github.com/settings/developers_](https://github.com/settings/developers))
- Clique nem `New OAuth App` ou o que for correspondente ao seu idioma
- Adicione as informações do _App_ conforme abaixo
  ```
  Application Name: *BookWise*
  Homepage URL: http://localhost:3000
  Application description: (*fique a vontade para escrever uma descrição do projeto*)
  Authorization callback URL: http://localhost:3000/api/auth/callback/github
  ```
- Clique em `Register Application`
- Você deve conseguir ver o seu `Github ID` pegue esse valor e armazene em uma variável de ambiente.
- Clique em `Generate a new client secret` e em instantes esse novo valor vai ser gerado e exibido em tela, armazene essa informação em uma variável de ambiente
- _obs_: você ainda vai precisar de uma informação de `SECRET` para o _NextJS,_ caso não tenha feito esse passo na configuração de autenticação com Google basta adicionar uma variável de ambiente com o nome `NEXTAUTH_SECRET` e atribuir um valor aleatório, caso esteja usando _mac_ execute o comando `openssl rand-base64 32` e copie esse valor para a variável, caso esteja usando outro sistema operacional você pode utilizar de geradores de id para gerar uma chave.
- Com tudo isso feito você deve conseguir se autenticar com o seu `Github` ✨

Para buscar, atualizar ou inserir dados do nosso banco de dados você pode utilizar a mesma estratégia que utilizamos durante as aulas do módulo, criando uma `API Route` dentro da sua pasta `pages/api` e declarando ela da forma como achar melhor. Fique a vontade para usar quaisquer bibliotecas de cacheamento de dados de requisições ou o que preferir.
Por exemplo, para buscar um dado livro podemos criar um arquivo `/api/book/index.ts` que busca os dados através do _client_ do prisma, algo semelhante a:

```jsx
// /api/book?bookId=48b86ac2-014e-401d-bcbb-331ce5f4a457

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = String(req.query.bookId);

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  return res.json({ book });
}
```

> ⚠️ _Não se esqueça de instalar todas as dependências corretamente no seu package.json_

Caso você tenha alguma dificuldade você pode ir no nosso **[fórum](https://app.rocketseat.com.br/h/forum/react-js)** e deixar a sua dúvida por lá!

Após terminar o desafio, caso você queira, você pode tentar dar o próximo passo e deixar a aplicação com a sua cara. Tente mudar o layout, cores ou até adicionar novas funcionalidades para ir além 🚀

# Entrega

Após concluir o desafio, você deve enviar a URL do seu código no Github para a plataforma.

Além disso, que tal fazer um post no LinkedIn compartilhando o seu aprendizado e contando como foi a experiência?

É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades! 😍

Obs: Se você se sentir à vontade, pode postar um print do resultado final e nos marcar!
Será incrível acompanhar a sua evolução! 💜

Feito com 💜 por Rocketseat 👋
