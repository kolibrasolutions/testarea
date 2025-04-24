# Documentação de Implantação - Kolibra Solutions

Este documento contém instruções para implantar o novo site da Kolibra Solutions, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Requisitos de Sistema

- Node.js 18.x ou superior
- NPM 9.x ou superior
- Hospedagem compatível com Next.js (Vercel, Netlify, AWS, etc.)

## Estrutura do Projeto

O projeto segue a estrutura padrão do Next.js App Router:

```
kolibra-new/
├── public/               # Arquivos estáticos
├── src/
│   ├── app/              # Páginas da aplicação
│   ├── components/       # Componentes reutilizáveis
│   │   ├── forms/        # Componentes de formulário
│   │   ├── layout/       # Componentes de layout
│   │   ├── sections/     # Seções de página
│   │   └── ui/           # Componentes de UI
│   ├── hooks/            # Hooks personalizados
│   └── lib/              # Utilitários e configurações
├── next.config.js        # Configuração do Next.js
├── tailwind.config.js    # Configuração do Tailwind CSS
└── package.json          # Dependências e scripts
```

## Passos para Implantação

### 1. Preparação para Produção

```bash
# Instalar dependências
npm install

# Construir o projeto para produção
npm run build
```

### 2. Opções de Implantação

#### Opção 1: Vercel (Recomendado)

A Vercel é a plataforma mais simples para implantar aplicações Next.js:

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório Git
3. Importe o projeto
4. Configure o domínio personalizado: `kolibrasolutions.com.br`

#### Opção 2: Hospedagem Tradicional

Para hospedar em um servidor tradicional:

1. Execute `npm run build` para gerar os arquivos estáticos
2. Copie o conteúdo da pasta `.next/` para o servidor
3. Configure o servidor web (Nginx, Apache) para servir os arquivos
4. Configure o domínio `kolibrasolutions.com.br` para apontar para o servidor

## Configurações Pós-Implantação

### 1. Configurar DNS

Certifique-se de que o domínio `kolibrasolutions.com.br` esteja apontando para o servidor correto:

- Tipo A: Aponte para o IP do servidor
- CNAME: Configure `www.kolibrasolutions.com.br` para apontar para `kolibrasolutions.com.br`

### 2. Configurar HTTPS

É essencial configurar HTTPS para segurança e SEO:

- Na Vercel, o HTTPS é configurado automaticamente
- Em hospedagem tradicional, use Let's Encrypt para obter certificados gratuitos

### 3. Verificar Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade `kolibrasolutions.com.br`
3. Verifique a propriedade usando o método recomendado
4. Envie o sitemap.xml para indexação

### 4. Configurar Google Analytics

1. Crie uma propriedade no [Google Analytics](https://analytics.google.com/)
2. Adicione o ID de rastreamento no arquivo `src/app/layout.tsx`

## Manutenção e Atualizações

Para futuras atualizações do site:

1. Faça as alterações necessárias no código
2. Teste localmente com `npm run dev`
3. Construa a versão de produção com `npm run build`
4. Implante novamente seguindo os passos acima

## Contato para Suporte

Para suporte técnico relacionado à implantação, entre em contato:

- Email: suporte@kolibrasolutions.com.br
- Telefone: (35) 99979-6570
