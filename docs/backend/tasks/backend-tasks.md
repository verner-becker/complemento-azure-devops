# Backend Tasks - Part 1

Este arquivo contém as tarefas de implementação para o backend do Complemento Azure DevOps. Cada tarefa deve ser implementada seguindo a abordagem TDD (Test-Driven Development).

## Orientações Gerais

- Consulte sempre o arquivo de especificação (backend-planning*.md) antes de implementar
- Pergunte ao analista se tiver qualquer dúvida sobre a implementação
- Confirme qualquer alteração que não esteja explicitamente especificada
- Implemente os testes primeiro, verifique que falham, depois implemente a funcionalidade
- Use H2 para testes de integração e PostgreSQL para desenvolvimento/produção

## Configuração Inicial

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-001 | Configuração base do projeto Spring Boot | - Projeto Spring Boot criado com Maven<br>- Dependências configuradas (Spring Web, Spring Data JPA, PostgreSQL, Flyway, SpringDoc OpenAPI)<br>- Estrutura de pacotes criada conforme documentação<br>- Configurações de aplicação (application.properties) implementadas<br>- Projeto compila sem erros |
| TSK-002 | Configuração do Docker e Docker Compose | - Dockerfile criado conforme especificação<br>- docker-compose.yml configurado com serviços de app e banco de dados<br>- Volumes persistentes configurados<br>- Docker compose executa sem erros |
| TSK-003 | Implementação do tratamento global de exceções | - GlobalExceptionHandler implementado<br>- Tratamento para ResourceNotFoundException<br>- Tratamento para ValidationException<br>- Formato de resposta de erro padronizado<br>- Testes unitários para cada tipo de exceção |
| TSK-004 | Configuração do Swagger/OpenAPI | - Configuração do SpringDoc OpenAPI<br>- Informações básicas da API configuradas<br>- Documentação acessível via /swagger-ui.html<br>- Esquemas e endpoints corretamente expostos |

## Modelo Initiative

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-005 | Modelo de domínio - Initiative | - Classe Initiative criada com todos os campos conforme especificação<br>- Anotações JPA corretamente aplicadas<br>- InitiativeDTO implementado<br>- Métodos de conversão entre entidade e DTO<br>- Testes unitários para conversão |
| TSK-006 | Migration Flyway para Initiative | - Script V1__init.sql criado com DDL para tabela initiative<br>- Script é executado sem erros<br>- Estrutura da tabela corresponde à especificação |
| TSK-007 | Testes para InitiativeController | - Testes para endpoint GET /api/initiatives<br>- Testes para endpoint GET /api/initiatives/{id}<br>- Testes para endpoint POST /api/initiatives<br>- Testes para endpoint PUT /api/initiatives/{id}<br>- Testes para endpoint DELETE /api/initiatives/{id}<br>- Testes para GET /api/initiatives/{id}/packages |
| TSK-008 | Implementação do InitiativeController | - Controller com endpoints mockados<br>- DTO convertido para entidade e vice-versa<br>- Respostas com status HTTP apropriados<br>- Validação básica de parâmetros<br>- Todos os testes passando |
| TSK-009 | Testes para InitiativeService | - Testes para findAll()<br>- Testes para findById() (sucesso e não encontrado)<br>- Testes para save()<br>- Testes para update() (sucesso e não encontrado)<br>- Testes para delete() (sucesso, não encontrado e com dependências)<br>- Testes para findPackagesByInitiativeId() |
| TSK-010 | Implementação do InitiativeService | - Service implementado com lógica de negócio<br>- Validações implementadas<br>- Conversões entre entidade e DTO quando necessário<br>- Tratamento adequado de exceções<br>- Todos os testes passando |
| TSK-011 | Testes para InitiativeRepository | - Testes de integração com H2<br>- Testes para métodos CRUD básicos<br>- Testes para métodos personalizados (se houver)<br>- Configuração de teste isolada |
| TSK-012 | Implementação do InitiativeRepository | - Interface Repository estendendo JpaRepository<br>- Métodos personalizados (se necessário)<br>- Todos os testes passando |# Backend Tasks - Part 2

## Modelo Package

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-013 | Modelo de domínio - Package | - Classe Package criada com todos os campos conforme especificação<br>- Anotações JPA corretamente aplicadas<br>- PackageDTO implementado<br>- Métodos de conversão entre entidade e DTO<br>- Testes unitários para conversão<br>- Relacionamento com Initiative configurado |
| TSK-014 | Migration Flyway para Package | - Script de migração criado com DDL para tabela package<br>- Chave estrangeira para initiative configurada<br>- Script é executado sem erros<br>- Estrutura da tabela corresponde à especificação |
| TSK-015 | Testes para PackageController | - Testes para endpoint GET /api/packages<br>- Testes para endpoint GET /api/packages/{id}<br>- Testes para endpoint POST /api/packages<br>- Testes para endpoint PUT /api/packages/{id}<br>- Testes para endpoint DELETE /api/packages/{id}<br>- Testes para GET /api/packages/{id}/epics<br>- Testes para GET /api/packages/{id}/dependencies |
| TSK-016 | Implementação do PackageController | - Controller com endpoints mockados<br>- DTO convertido para entidade e vice-versa<br>- Respostas com status HTTP apropriados<br>- Validação básica de parâmetros<br>- Todos os testes passando |
| TSK-017 | Testes para POST e DELETE em dependências | - Testes para endpoint POST /api/packages/{id}/dependencies<br>- Testes para endpoint DELETE /api/packages/{id}/dependencies/{dependencyId}<br>- Casos de teste para operações de sucesso e falha |
| TSK-018 | Implementação de endpoints de dependências | - Endpoints para gerenciar dependências entre pacotes<br>- Validação para evitar dependências circulares<br>- Validação para evitar auto-dependência<br>- Respostas HTTP apropriadas<br>- Todos os testes passando |
| TSK-019 | Testes para PackageService | - Testes para findAll()<br>- Testes para findById() (sucesso e não encontrado)<br>- Testes para save() (com e sem iniciativa vinculada)<br>- Testes para update() (sucesso e não encontrado)<br>- Testes para delete() (sucesso, não encontrado e com dependências)<br>- Testes para findEpicsByPackageId()<br>- Testes para operações de dependências |
| TSK-020 | Implementação do PackageService | - Service implementado com lógica de negócio<br>- Validações implementadas (datas, relacionamentos)<br>- Tratamento adequado de exceções<br>- Lógica para gerenciar dependências<br>- Verificação de dependências circulares<br>- Todos os testes passando |
| TSK-021 | Modelo de domínio - PackageDependency | - Classe PackageDependency criada conforme especificação<br>- Anotações JPA corretamente aplicadas<br>- DependencyDTO implementado<br>- Métodos de conversão entre entidade e DTO<br>- Testes unitários para conversão |
| TSK-022 | Migration Flyway para PackageDependency | - Script de migração criado com DDL para tabela package_dependency<br>- Chaves estrangeiras configuradas<br>- Constraints de unicidade e auto-referência<br>- Script é executado sem erros |
| TSK-023 | Testes para PackageRepository | - Testes de integração com H2<br>- Testes para métodos CRUD básicos<br>- Testes para busca por initiativeId<br>- Testes para verificação de dependências<br>- Configuração de teste isolada |
| TSK-024 | Implementação do PackageRepository | - Interface Repository estendendo JpaRepository<br>- Métodos personalizados para busca e contagem<br>- Métodos para gerenciar dependências<br>- Todos os testes passando |
| TSK-025 | Testes para PackageDependencyRepository | - Testes de integração com H2<br>- Testes para métodos CRUD básicos<br>- Testes para busca de dependências<br>- Testes para verificação de dependências circulares |
| TSK-026 | Implementação do PackageDependencyRepository | - Interface Repository estendendo JpaRepository<br>- Métodos personalizados para busca de dependências<br>- Métodos para verificar dependências circulares<br>- Todos os testes passando |# Backend Tasks - Part 3

## Modelo Epic

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-027 | Modelo de domínio - Epic | - Classe Epic criada com todos os campos conforme especificação<br>- Anotações JPA corretamente aplicadas<br>- EpicDTO implementado<br>- Métodos de conversão entre entidade e DTO<br>- Testes unitários para conversão<br>- Relacionamento com Package configurado |
| TSK-028 | Migration Flyway para Epic | - Script de migração criado com DDL para tabela epic<br>- Chave estrangeira para package configurada<br>- Script é executado sem erros<br>- Estrutura da tabela corresponde à especificação |
| TSK-029 | Testes para EpicController | - Testes para endpoint GET /api/epics<br>- Testes para endpoint GET /api/epics/{id}<br>- Testes para endpoint POST /api/epics<br>- Testes para endpoint PUT /api/epics/{id}<br>- Testes para endpoint DELETE /api/epics/{id}<br>- Testes para PUT /api/epics/{id}/progress |
| TSK-030 | Implementação do EpicController | - Controller com endpoints mockados<br>- DTO convertido para entidade e vice-versa<br>- Respostas com status HTTP apropriados<br>- Validação básica de parâmetros<br>- Endpoint específico para atualização de progresso<br>- Todos os testes passando |
| TSK-031 | Testes para EpicService | - Testes para findAll()<br>- Testes para findById() (sucesso e não encontrado)<br>- Testes para save() (com e sem pacote vinculado)<br>- Testes para update() (sucesso e não encontrado)<br>- Testes para delete() (sucesso e não encontrado)<br>- Testes para updateProgress() (sucesso e validação) |
| TSK-032 | Implementação do EpicService | - Service implementado com lógica de negócio<br>- Validações implementadas (datas, relacionamentos, progresso)<br>- Tratamento adequado de exceções<br>- Método específico para atualização de progresso<br>- Todos os testes passando |
| TSK-033 | Testes para EpicRepository | - Testes de integração com H2<br>- Testes para métodos CRUD básicos<br>- Testes para busca por packageId<br>- Configuração de teste isolada |
| TSK-034 | Implementação do EpicRepository | - Interface Repository estendendo JpaRepository<br>- Métodos personalizados para busca<br>- Todos os testes passando |
| TSK-035 | Atualização de progresso automático | - Testes para atualização de progresso do pacote quando épicos são atualizados<br>- Testes para atualização de progresso da iniciativa quando pacotes são atualizados<br>- Implementação da propagação de progresso na hierarquia<br>- Validações e tratamento de exceções |# Backend Tasks - Part 4

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
| TSK-057 | Inicialização de Configurações | - Script de inicialização de configurações padrão<br>- Valores default para configurações essenciais<br>- Testes para verificar inicialização |# Backend Tasks - Part 5

## Testes de Integração

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-058 | Configuração do ambiente de testes de integração | - Configuração de teste com H2<br>- Configuração de TestRestTemplate<br>- Scripts de inicialização para dados de teste<br>- Perfil de teste específico |
| TSK-059 | Testes de integração da API de Iniciativas | - Testes completos dos endpoints de iniciativas<br>- Verificação das respostas HTTP<br>- Verificação da persistência no banco<br>- Cobertura de casos de sucesso e falha |
| TSK-060 | Testes de integração da API de Pacotes | - Testes completos dos endpoints de pacotes<br>- Verificação das operações de dependência<br>- Cobertura de casos de sucesso e falha<br>- Verificação de restrições de integridade |
| TSK-061 | Testes de integração da API de Épicos | - Testes completos dos endpoints de épicos<br>- Verificação de propagação de progresso<br>- Cobertura de casos de sucesso e falha |
| TSK-062 | Testes de integração dos Relatórios | - Testes completos dos endpoints de relatórios<br>- Verificação de formatos e conteúdos<br>- Testes com diferentes parâmetros e filtros |
| TSK-063 | Testes de integração da API de Configurações | - Testes completos dos endpoints de configurações<br>- Verificação de operações CRUD<br>- Cobertura de casos de sucesso e falha |

## CORS e Segurança

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-064 | Configuração de CORS | - Implementação da CorsConfig<br>- Configuração de origens permitidas via propriedades<br>- Testes para verificar headers CORS<br>- Documentação das configurações |
| TSK-065 | Segurança básica | - Proteção contra principais vulnerabilidades (XSS, CSRF)<br>- Validação adequada de entradas<br>- Escape de saídas quando necessário<br>- Headers de segurança básicos |

## Melhorias e Ajustes

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-066 | Monitoramento e logging | - Configuração de Logging (SLF4J/Logback)<br>- Logging adequado para operações críticas<br>- Logging de exceções e erros<br>- Formatação consistente de logs |
| TSK-067 | Paginação e ordenação | - Implementação de paginação nas listagens<br>- Suporte a ordenação<br>- Parâmetros para tamanho de página<br>- Testes para paginação e ordenação |
| TSK-068 | Cache na camada de serviço | - Configuração de cache (Caffeine)<br>- Cache para operações de leitura frequentes<br>- Invalidação de cache após escrita<br>- Testes para verificar funcionamento do cache |
| TSK-069 | Validação avançada de dados | - Validação com Bean Validation<br>- Mensagens de erro customizadas<br>- Validação de regras de negócio complexas<br>- Testes para cada validação |
| TSK-070 | Documentação da API | - Documentação completa com Swagger/OpenAPI<br>- Descrições para cada endpoint<br>- Exemplos de requisição/resposta<br>- Documentação para schemas e DTOs |

## Finalização

| Código | Descrição | Critérios de Aceitação |
|--------|-----------|------------------------|
| TSK-071 | Testes de carga com JMeter | - Script JMeter para endpoints principais<br>- Testes de concorrência<br>- Relatório de performance<br>- Identificação de gargalos |
| TSK-072 | Análise de qualidade de código | - Configuração do SonarQube<br>- Análise de cobertura de testes<br>- Identificação e correção de code smells<br>- Relatório de qualidade |
| TSK-073 | Documentação técnica | - Documentação de arquitetura<br>- Guia de desenvolvimento<br>- Guia de manutenção<br>- Referência de API |
| TSK-074 | Script de inicialização | - Script para carga inicial de dados<br>- Dados de exemplo para demonstração<br>- Validação dos dados iniciais<br>- Documentação do script |
| TSK-075 | Verificação final | - Verificação de todas as funcionalidades<br>- Resolução de bugs identificados<br>- Testes completos do sistema<br>- Documentação atualizada |