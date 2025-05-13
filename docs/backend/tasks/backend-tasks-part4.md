# Backend Tasks - Part 4

## Relatórios e Visualizações

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-036 | DTOs para Relatórios | - StatusReportDTO implementado<br>- ProgressReportDTO implementado<br>- GanttDataDTO implementado<br>- DependencyMapDTO implementado<br>- CapacityDemandDTO implementado<br>- Testes unitários para cada DTO |
| TSK-037 | Testes para ReportController | - Testes para endpoint GET /api/reports/initiatives<br>- Testes para endpoint GET /api/reports/packages<br>- Testes para endpoint GET /api/reports/epics<br>- Testes para endpoint GET /api/reports/gantt<br>- Testes para endpoint GET /api/reports/dependencies<br>- Testes para endpoint GET /api/reports/capacity |
| TSK-038 | Implementação do ReportController | - Controller com endpoints mockados<br>- Parâmetros de filtragem implementados<br>- Respostas com status HTTP apropriados<br>- Formatação adequada dos dados para frontend<br>- Todos os testes passando |
| TSK-039 | Testes para ReportService - Parte 1 | - Testes para generateInitiativeStatusReport()<br>- Testes para generatePackageStatusReport()<br>- Testes para generateEpicProgressReport()<br>- Testes para diferentes períodos e filtros |
| TSK-040 | Implementação do ReportService - Parte 1 | - Métodos para geração de relatórios de status<br>- Agregação de dados por status<br>- Cálculos de progresso<br>- Filtragem por período e status<br>- Todos os testes passando |
| TSK-041 | Testes para ReportService - Parte 2 | - Testes para generateGanttData()<br>- Testes para generateDependencyMap()<br>- Testes para generateCapacityDemandData()<br>- Testes para diferentes filtros e configurações |
| TSK-042 | Implementação do ReportService - Parte 2 | - Métodos para geração de dados para visualizações<br>- Estruturação de dados para Gantt<br>- Mapeamento de dependências para grafo<br>- Cálculos de capacidade vs. demanda<br>- Todos os testes passando |

## Importação e Exportação

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-043 | Testes para ImportExportController | - Testes para endpoint POST /api/import/csv<br>- Testes para endpoints GET /api/export/*/csv<br>- Testes para endpoints GET /api/export/report/*/pdf<br>- Testes para endpoints GET /api/export/report/*/xlsx<br>- Testes para diferentes formatos e conteúdos |
| TSK-044 | Implementação do ImportExportController | - Controller com endpoints mockados<br>- Suporte a diferentes formatos<br>- Manipulação de arquivos MultipartFile<br>- Headers e content types corretos<br>- Todos os testes passando |
| TSK-045 | Testes para ImportExportService - CSV | - Testes para importação de CSV para cada entidade<br>- Testes para exportação para CSV<br>- Testes para validação de dados de importação<br>- Testes para formato de exportação |
| TSK-046 | Implementação do ImportExportService - CSV | - Métodos para parsing de CSV<br>- Conversão de dados para entidades<br>- Validação e tratamento de erros<br>- Geração de CSV a partir de entidades<br>- Todos os testes passando |
| TSK-047 | Testes para ImportExportService - Relatórios | - Testes para exportação de relatórios para PDF<br>- Testes para exportação de relatórios para Excel<br>- Testes para diferentes tipos de relatório<br>- Testes para formatação e estilos |
| TSK-048 | Implementação do ImportExportService - Relatórios | - Métodos para geração de PDF (usando biblioteca apropriada)<br>- Métodos para geração de Excel (usando Apache POI)<br>- Formatação e estilos para relatórios<br>- Todos os testes passando |

## Configurações do Sistema

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-049 | Modelo de domínio - Configuration | - Classe Configuration criada conforme especificação<br>- Anotações JPA corretamente aplicadas<br>- ConfigurationDTO implementado<br>- Métodos de conversão entre entidade e DTO<br>- Testes unitários para conversão |
| TSK-050 | Migration Flyway para Configuration | - Script de migração criado com DDL para tabela configuration<br>- Script é executado sem erros<br>- Estrutura da tabela corresponde à especificação |
| TSK-051 | Testes para ConfigurationController | - Testes para endpoint GET /api/configurations<br>- Testes para endpoint GET /api/configurations/{key}<br>- Testes para endpoint PUT /api/configurations/{key}<br>- Testes para endpoint POST /api/configurations |
| TSK-052 | Implementação do ConfigurationController | - Controller com endpoints<br>- Validação de chaves e valores<br>- Respostas com status HTTP apropriados<br>- Todos os testes passando |
| TSK-053 | Testes para ConfigurationService | - Testes para findAll()<br>- Testes para findByKey() (sucesso e não encontrado)<br>- Testes para save()<br>- Testes para update() (sucesso e não encontrado) |
| TSK-054 | Implementação do ConfigurationService | - Service implementado com lógica de negócio<br>- Validação de chaves<br>- Tratamento de exceções<br>- Todos os testes passando |
| TSK-055 | Testes para ConfigurationRepository | - Testes de integração com H2<br>- Testes para métodos CRUD básicos<br>- Testes para busca por chave |
| TSK-056 | Implementação do ConfigurationRepository | - Interface Repository estendendo JpaRepository<br>- Método findByConfigKey<br>- Todos os testes passando |
| TSK-057 | Inicialização de Configurações | - Script de inicialização de configurações padrão<br>- Valores default para configurações essenciais<br>- Testes para verificar inicialização |