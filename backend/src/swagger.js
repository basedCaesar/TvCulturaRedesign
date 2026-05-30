const swaggerUi = require('swagger-ui-express')

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'TV Cultura API',
    version: '1.0.0',
    description: 'API do portal TV Cultura — programas, episódios, notícias, grade e podcasts.',
  },
  servers: [{ url: 'http://localhost:3000' }],
  tags: [
    { name: 'Programas' },
    { name: 'Notícias' },
    { name: 'Grade' },
    { name: 'Podcasts' },
    { name: 'Meta' },
  ],
  paths: {
    '/api/programas': {
      get: {
        tags: ['Programas'],
        summary: 'Lista todos os programas',
        responses: {
          200: {
            description: 'Array de programas',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Programa' } } } },
          },
        },
      },
    },
    '/api/programas/{slug}': {
      get: {
        tags: ['Programas'],
        summary: 'Programa por slug com episódios',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' }, example: 'antimateria' }],
        responses: {
          200: { description: 'Programa com array de episódios', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProgramaDetalhe' } } } },
          404: { description: 'Não encontrado' },
        },
      },
    },
    '/api/episodios/{id}': {
      get: {
        tags: ['Programas'],
        summary: 'Episódio por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }, example: 1 }],
        responses: {
          200: { description: 'Episódio', content: { 'application/json': { schema: { $ref: '#/components/schemas/Episodio' } } } },
          404: { description: 'Não encontrado' },
        },
      },
    },
    '/api/grade': {
      get: {
        tags: ['Grade'],
        summary: 'Grade de programação por data (padrão: hoje)',
        parameters: [{ name: 'data', in: 'query', schema: { type: 'string', format: 'date' }, example: '2026-05-29' }],
        responses: {
          200: {
            description: 'Grade do dia',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'string', format: 'date' },
                    items: { type: 'array', items: { $ref: '#/components/schemas/GradeItem' } },
                  },
                },
              },
            },
          },
          400: { description: 'Formato de data inválido' },
        },
      },
    },
    '/api/grade/datas-disponiveis': {
      get: {
        tags: ['Grade'],
        summary: 'Lista datas com grade disponível',
        responses: {
          200: {
            description: 'Array de datas',
            content: { 'application/json': { schema: { type: 'object', properties: { datas: { type: 'array', items: { type: 'string', format: 'date' } } } } } },
          },
        },
      },
    },
    '/api/podcasts': {
      get: {
        tags: ['Podcasts'],
        summary: 'Lista todos os podcasts',
        responses: {
          200: { description: 'Array de podcasts', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Podcast' } } } } },
        },
      },
    },
    '/api/noticias': {
      get: {
        tags: ['Notícias'],
        summary: 'Lista notícias paginadas',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
        ],
        responses: {
          200: { description: 'Página de notícias', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedNoticias' } } } },
        },
      },
    },
    '/api/noticias/{slug}': {
      get: {
        tags: ['Notícias'],
        summary: 'Notícia por slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Notícia', content: { 'application/json': { schema: { $ref: '#/components/schemas/Noticia' } } } },
          404: { description: 'Não encontrada' },
        },
      },
    },
    '/api/entretenimento': {
      get: { tags: ['Notícias'], summary: 'Lista notícias de entretenimento paginadas', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } }], responses: { 200: { description: 'Página', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedNoticias' } } } } } },
    },
    '/api/entretenimento/{slug}': {
      get: { tags: ['Notícias'], summary: 'Notícia de entretenimento por slug', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Notícia' }, 404: { description: 'Não encontrada' } } },
    },
    '/api/esporte': {
      get: { tags: ['Notícias'], summary: 'Lista notícias de esporte paginadas', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } }], responses: { 200: { description: 'Página', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedNoticias' } } } } } },
    },
    '/api/esporte/{slug}': {
      get: { tags: ['Notícias'], summary: 'Notícia de esporte por slug', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Notícia' }, 404: { description: 'Não encontrada' } } },
    },
    '/api/economia': {
      get: { tags: ['Notícias'], summary: 'Lista notícias de economia paginadas', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } }], responses: { 200: { description: 'Página', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedNoticias' } } } } } },
    },
    '/api/economia/{slug}': {
      get: { tags: ['Notícias'], summary: 'Notícia de economia por slug', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Notícia' }, 404: { description: 'Não encontrada' } } },
    },
    '/api/receitas': {
      get: { tags: ['Notícias'], summary: 'Lista notícias de receitas paginadas', parameters: [{ name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } }], responses: { 200: { description: 'Página', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedNoticias' } } } } } },
    },
    '/api/receitas/{slug}': {
      get: { tags: ['Notícias'], summary: 'Notícia de receitas por slug', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'Notícia' }, 404: { description: 'Não encontrada' } } },
    },
    '/api/meta': {
      get: {
        tags: ['Meta'],
        summary: 'Metadados internos do scraper',
        responses: {
          200: { description: 'Array de chave/valor', content: { 'application/json': { schema: { type: 'array', items: { type: 'object', properties: { chave: { type: 'string' }, valor: { type: 'string' } } } } } } },
        },
      },
    },
  },
  components: {
    schemas: {
      Programa: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          slug: { type: 'string' },
          titulo: { type: 'string' },
          categoria: { type: 'string' },
          descricao: { type: 'string', nullable: true },
          imagem_local: { type: 'string', nullable: true },
          gerado_em: { type: 'string', format: 'date-time' },
        },
      },
      ProgramaDetalhe: {
        allOf: [
          { $ref: '#/components/schemas/Programa' },
          { type: 'object', properties: { episodios: { type: 'array', items: { $ref: '#/components/schemas/Episodio' } } } },
        ],
      },
      Episodio: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          programa_id: { type: 'integer' },
          youtube_id: { type: 'string', nullable: true },
          url_original: { type: 'string', nullable: true },
          descricao: { type: 'string', nullable: true },
          data_episodio: { type: 'string', format: 'date', nullable: true },
        },
      },
      GradeItem: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          data: { type: 'string', format: 'date' },
          horario: { type: 'string', example: '08:00' },
          programa_titulo: { type: 'string' },
          link_programa: { type: 'string', nullable: true },
          programa_imagem_local: { type: 'string', nullable: true },
        },
      },
      Podcast: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          slug: { type: 'string' },
          titulo: { type: 'string' },
          descricao: { type: 'string', nullable: true },
          imagem_local: { type: 'string', nullable: true },
          imagem_url: { type: 'string', nullable: true },
          url_externa: { type: 'string', nullable: true },
          gerado_em: { type: 'string', format: 'date-time' },
        },
      },
      Noticia: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          slug: { type: 'string' },
          titulo: { type: 'string', nullable: true },
          categoria: { type: 'string' },
          descricao: { type: 'string', nullable: true },
          conteudo: { type: 'string', nullable: true },
          imagem_local: { type: 'string', nullable: true },
          imagem_url: { type: 'string', nullable: true },
          publicado_em: { type: 'string', format: 'date-time', nullable: true },
          gerado_em: { type: 'string', format: 'date-time' },
        },
      },
      PaginatedNoticias: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/Noticia' } },
          page: { type: 'integer' },
          limit: { type: 'integer' },
          total: { type: 'integer' },
          pages: { type: 'integer' },
        },
      },
    },
  },
}

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))
  app.get('/api-docs.json', (req, res) => res.json(spec))
}

module.exports = { setupSwagger }
