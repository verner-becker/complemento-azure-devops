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
| TSK-012 | Implementação do InitiativeRepository | - Interface Repository estendendo JpaRepository<br>- Métodos personalizados (se necessário)<br>- Todos os testes passando |