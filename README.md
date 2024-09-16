# **Database used**

MongoDB

# **Requisitos para rodar o projeto**

Obs: pode levar algum tempo na primeira vez.

# **BANCO DE DADOS**

1. Na raiz do projeto, execute:

```
npm run db:dev
```

se for a primeira vez que você está rodando o banco de dados, ele pode fechar devido à falta da pasta de volumes. Se isso acontecer, execute o comando novamente.

Uma vez que você tenha o container rodando, você precisa configurar a opção de replicação porque o prisma precisa disso.

Com o container rodando, faça:

```
# listar containers em execução
$ docker ps

# entrar no container do db
$ docker exec -it <container_id> bash

# entrar no mongosh dentro do container
$ mongosh

# cole isso
$ rs.initiate({_id: "rs0", members: [{_id: 0, host: "127.0.0.1:27017"}] })
```

Feche o bash digitando exit várias vezes. Uma vez no seu bash, reinicie o container:

```
docker restart <container_id>
```

Se você já fez isso uma vez, apenas `npm run db:dev` deve ser suficiente.

# **BACKEND**

Ao desenvolver, lembre-se de executar `npm run prisma:generate` sempre que você atualizar o arquivo `schema.prisma`.

Certifique-se de copiar e colar .env.example com os valores corretos.

- Configuração

execute os seguintes comandos:

```
$ npm run install

# para rodar o app
$ npm run start:dev
```

# **FRONTEND**

Certifique-se de copiar e colar .env.example com os valores corretos.

- Configuração

execute os seguintes comandos:

```
$ npm run install

# para rodar o app
$ npm run dev
```

No final, você terá:

API: localhost:3000

Aplicação frontend: localhost:4000

Banco de dados: localhost:27017

# **Solução de Problemas:**

Problemas com o banco de dados

Se você receber isso

```jsx
Error: NotYetInitialized: Cannot use non-local read concern until replica set is finished initializing.
```

Significa que o conjunto de replicação não está configurado no seu container, então você deve abrir o container, entrar no mongosh e executar:

```
# cole isso
$ rs.initiate({_id: "rs0", members: [{_id: 0, host: "127.0.0.1:27017"}] })
```

# **Coleção do Postman para endpoints da API:**

- Em breve
