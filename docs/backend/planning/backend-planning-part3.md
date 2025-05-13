## APIs REST

### 1. Iniciativas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/initiatives | Lista todas as iniciativas |
| GET | /api/initiatives/{id} | Obtém uma iniciativa específica |
| POST | /api/initiatives | Cria uma nova iniciativa |
| PUT | /api/initiatives/{id} | Atualiza uma iniciativa existente |
| DELETE | /api/initiatives/{id} | Remove uma iniciativa (com verificação de dependências) |
| GET | /api/initiatives/{id}/packages | Lista pacotes vinculados a uma iniciativa |

### 2. Pacotes de Entrega

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/packages | Lista todos os pacotes de entrega |
| GET | /api/packages/{id} | Obtém um pacote específico |
| POST | /api/packages | Cria um novo pacote |
| PUT | /api/packages/{id} | Atualiza um pacote existente |
| DELETE | /api/packages/{id} | Remove um pacote (com verificação de dependências) |
| GET | /api/packages/{id}/epics | Lista épicos vinculados a um pacote |
| GET | /api/packages/{id}/dependencies | Lista dependências de um pacote |
| POST | /api/packages/{id}/dependencies | Adiciona uma dependência a um pacote |
| DELETE | /api/packages/{id}/dependencies/{dependencyId} | Remove uma dependência |

### 3. Épicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/epics | Lista todos os épicos |
| GET | /api/epics/{id} | Obtém um épico específico |
| POST | /api/epics | Cria um novo épico |
| PUT | /api/epics/{id} | Atualiza um épico existente |
| DELETE | /api/epics/{id} | Remove um épico |
| PUT | /api/epics/{id}/progress | Atualiza o progresso de um épico |

### 4. Relatórios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/reports/initiatives | Relatório de status por iniciativa |
| GET | /api/reports/packages | Relatório de status por pacote |
| GET | /api/reports/epics | Relatório de progresso de épicos |
| GET | /api/reports/gantt | Dados para gráfico de Gantt |
| GET | /api/reports/dependencies | Dados para mapa de dependências |
| GET | /api/reports/capacity | Dados para gráfico de capacidade vs. demanda |

### 5. Importação/Exportação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/import/csv | Importa dados de CSV |
| GET | /api/export/initiatives/csv | Exporta iniciativas para CSV |
| GET | /api/export/packages/csv | Exporta pacotes para CSV |
| GET | /api/export/epics/csv | Exporta épicos para CSV |
| GET | /api/export/report/{reportType}/pdf | Exporta relatório para PDF |
| GET | /api/export/report/{reportType}/xlsx | Exporta relatório para Excel |

### 6. Configurações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/configurations | Lista todas as configurações |
| GET | /api/configurations/{key} | Obtém uma configuração específica |
| PUT | /api/configurations/{key} | Atualiza uma configuração |
| POST | /api/configurations | Cria uma nova configuração |