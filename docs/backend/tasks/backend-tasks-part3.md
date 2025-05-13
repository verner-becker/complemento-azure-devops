# Backend Tasks - Part 3

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
| TSK-035 | Atualização de progresso automático | - Testes para atualização de progresso do pacote quando épicos são atualizados<br>- Testes para atualização de progresso da iniciativa quando pacotes são atualizados<br>- Implementação da propagação de progresso na hierarquia<br>- Validações e tratamento de exceções |