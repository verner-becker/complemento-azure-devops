# Mock API Server Documentation

Este é o servidor de mock API para o Complemento Azure DevOps, implementado usando JSON Server.

## Comandos

- Para iniciar o servidor de mock: `npm run mock-api`

## Endpoints Disponíveis

### Iniciativas
- `GET /api/initiatives` - Lista todas as iniciativas
- `GET /api/initiatives/:id` - Obtém uma iniciativa específica
- `POST /api/initiatives` - Cria uma nova iniciativa
- `PUT /api/initiatives/:id` - Atualiza uma iniciativa existente
- `DELETE /api/initiatives/:id` - Remove uma iniciativa
- `GET /api/initiatives/:id/packages` - Lista pacotes vinculados a uma iniciativa

### Pacotes de Entrega
- `GET /api/packages` - Lista todos os pacotes
- `GET /api/packages/:id` - Obtém um pacote específico
- `POST /api/packages` - Cria um novo pacote
- `PUT /api/packages/:id` - Atualiza um pacote existente
- `DELETE /api/packages/:id` - Remove um pacote
- `GET /api/packages/:id/epics` - Lista épicos vinculados a um pacote
- `GET /api/packages/:id/dependencies` - Lista dependências de um pacote
- `POST /api/packages/:id/dependencies` - Adiciona uma dependência
- `DELETE /api/packages/:id/dependencies/:dependencyId` - Remove uma dependência

### Épicos
- `GET /api/epics` - Lista todos os épicos
- `GET /api/epics/:id` - Obtém um épico específico
- `POST /api/epics` - Cria um novo épico
- `PUT /api/epics/:id` - Atualiza um épico existente
- `DELETE /api/epics/:id` - Remove um épico

### Configurações
- `GET /api/configurations` - Lista todas as configurações
- `GET /api/configurations/:key` - Obtém uma configuração específica
- `PUT /api/configurations/:key` - Atualiza uma configuração
- `POST /api/configurations` - Cria uma nova configuração

### Relatórios
- `GET /api/reports/initiatives` - Relatório de status por iniciativa
- `GET /api/reports/packages` - Relatório de status por pacote
- `GET /api/reports/epics` - Relatório de progresso de épicos
- `GET /api/reports/gantt` - Dados para gráfico de Gantt
- `GET /api/reports/dependencies` - Dados para mapa de dependências
- `GET /api/reports/capacity` - Dados para gráfico de capacidade vs. demanda

## Estrutura dos Dados

O arquivo `db.json` contém as seguintes entidades:
- initiatives
- packages
- epics
- packageDependencies
- configurations
- reports

## Filtros e Busca

O JSON Server suporta os seguintes parâmetros de query:
- `_page` e `_limit` para paginação
- `_sort` e `_order` para ordenação
- Filtros usando o nome do campo, ex: `/api/initiatives?status=IN_PROGRESS`

## Observações

1. Este é um servidor mock para desenvolvimento. Não use em produção.
2. Os dados são persistidos no arquivo `db.json`.
3. O servidor roda na porta 3000 por padrão.
4. As respostas seguem o padrão REST com códigos HTTP apropriados.
