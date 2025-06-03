
# 🦜 RedePapagaio – Rede Solidária em Situações Extremas

![GitHub repo size](https://img.shields.io/github/repo-size/gusandrini/RedePapagaio-GS?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/gusandrini/RedePapagaio-GS?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/gusandrini/RedePapagaio-GS?style=flat-square)

## 📌 Visão Geral

O **RedePapagaio** é uma plataforma de apoio em **situações extremas**, como desastres naturais e emergências. Inspirado no altruísmo dos papagaios-cinzentos africanos, o app conecta **vítimas, voluntários e ONGs** em uma rede de solidariedade eficaz, geolocalizada e em tempo real.

## 📽️ Demonstração

🎥 [**Clique aqui para assistir ao vídeo demonstrativo**](https://youtu.be/seu_link_aqui)

## 👥 Integrantes

| Nome              | RM      | Turma    |
|-------------------|---------|----------|
| Gustavo Sandrini  | 557505  | 2TDSPW   |
| Eduarda Tiemi     | 554756  | 2TDSPH   |
| Felipe Pizzinato  | 555141  | 2TDSPH   |

## 🛠️ Funcionalidades

- ✅ Cadastro/login de usuários (vítimas, voluntários, ONGs)
- ✅ Geolocalização de pedidos e ofertas de ajuda
- ✅ Integração com APIs oficiais (INMET, Defesa Civil)
- ✅ Notificações push para alertas e pedidos emergenciais
- ✅ Chat com IA integrada para suporte em tempo real
- ✅ Mapa com recursos e ONGs próximas
- ✅ Sistema de reputação e avaliação de voluntários
- ✅ Tela "Sobre Nós" com informações da rede

## 💻 Tecnologias Utilizadas

| Categoria        | Tecnologias                                                   |
|------------------|----------------------------------------------------------------|
| Mobile App       | React Native, Expo, Axios, React Navigation                   |
| Backend API      | Java 21, Spring Boot, Spring Data JPA, Spring Security JWT    |
| Banco de Dados   | MySQL 8                                                       |
| Infraestrutura   | Docker, Maven, Postman, Swagger                               |
| Machine Learning | scikit-learn, pandas, numpy, StandardScaler, RandomForest     |
| IoT e Integrações| Node-RED, APIs públicas (INMET, Defesa Civil, WhatsApp)       |
| Visualização     | Matplotlib, Seaborn                                           |

📦 Código da API disponível em: [**github.com/dudatiemiak/redepapagaio-api**](https://github.com/dudatiemiak/redepapagaio-api)

## 🚀 Como Rodar o Projeto (Mobile)

### 1. Clone o repositório

```bash
git clone https://github.com/gusandrini/RedePapagaio-GS.git
cd RedePapagaio-GS
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie com Expo (modo tunnel)

```bash
npx expo start --tunnel
```

### 4. Configure a URL base da API

Altere a URL no arquivo `services/api.ts` para o IP da máquina com o backend:

```ts
const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:8080/api',
  headers: { 'Content-Type': 'application/json' }
});
```

## 🌐 Endpoints da API

Documentação Swagger disponível em:

```
http://localhost:8080/swagger-ui/index.html
```

## 🧪 Testes

- Testes manuais no dispositivo físico via Expo Go
- Testes de API com Postman e Swagger
- Testes locais com Docker (container MySQL + backend Spring Boot)

## 📦 Estrutura de Pastas (Mobile)

```
RedePapagaio-GS/
├── assets/                 # Ícones e imagens
├── components/             # Componentes reutilizáveis (ex: AppHeader)
├── navigation/             # Stack e Tab Navigators
├── screens/                # Telas (Home, Login, Perfil, etc.)
├── services/               # Integrações com a API
├── types/                  # Tipagens personalizadas
├── App.tsx                 # Entrypoint
└── package.json
```

## 📚 Referências

- INMET API: https://portal.inmet.gov.br/
- Defesa Civil SP: https://defesacivil.sp.gov.br/
- Expo Documentation: https://docs.expo.dev/

## 📌 Observação Final

Este projeto foi desenvolvido como parte do **Global Solution 2025-1** da FIAP e é fruto da colaboração multidisciplinar entre disciplinas de mobile, backend, banco de dados, arquitetura e IA.

## 📬 Contato

Em caso de dúvidas ou contribuições:

- 💬 Gustavo Sandrini - [GitHub](https://github.com/gusandrini)
- 💬 Eduarda Tiemi - [GitHub](https://github.com/dudatiemiak)
- 💬 Felipe Pizzinato - [GitHub](https://github.com/felipepizzinato)
