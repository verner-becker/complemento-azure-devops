# Frontend Tasks - Part 2

## Dashboard

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-013 | HTML/CSS para Dashboard | - Layout com 4 cartões de estatísticas no topo<br>- Seção para gráficos (status e progresso)<br>- Área para mini Gantt<br>- Tabela para "Itens que Precisam de Atenção"<br>- Layout responsivo<br>- Design conforme especificação | Claude 3.5 |
| FE-014 | Implementação dos cartões de estatísticas | - Componente para exibir valores estatísticos<br>- Integração com API para buscar contagens<br>- Exibição de total de iniciativas, pacotes, épicos e itens em risco<br>- Estilo visual com cores diferentes para cada tipo<br>- Atualização dinâmica dos valores | Claude 3.5 |
| FE-015 | Implementação do gráfico de status | - Criação do gráfico de pizza usando Chart.js<br>- Integração com API para buscar dados de status<br>- Cores correspondentes para cada status<br>- Legenda explicativa<br>- Tooltip ao passar o mouse | Claude 3.5 |
| FE-016 | Implementação do gráfico de progresso | - Criação do gráfico de barras usando Chart.js<br>- Integração com API para buscar dados de progresso<br>- Barras representando o progresso dos pacotes<br>- Tooltip com detalhes ao passar o mouse<br>- Legenda explicativa | Claude 3.5 |
| FE-017 | Implementação do mini Gantt | - Criação de visualização simplificada de Gantt<br>- Integração com API para buscar dados de cronograma<br>- Exibição das próximas entregas (timeline)<br>- Indicador de data atual<br>- Barras coloridas por status | Claude 3.7 |
| FE-018 | Implementação da tabela de itens em atenção | - Tabela com itens críticos que precisam de atenção<br>- Integração com API para buscar dados<br>- Colunas para código, nome, tipo e status<br>- Badges de status com cores apropriadas<br>- Evento de clique para navegar para o detalhe do item | Claude 3.5 |
| FE-019 | Funcionalidade de atualização do Dashboard | - Botão para atualizar dados<br>- Função para recarregar todos os componentes<br>- Indicador visual durante carregamento<br>- Tratamento de erros de API<br>- Mensagem de última atualização | Claude 3.5 |

## Implementação do Gerenciador de Estado

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-020 | Implementação de mini gerenciador de estado | - Módulo para gerenciar estado da aplicação<br>- Funções para armazenar/recuperar estado global<br>- Funções para atualizar estado<br>- Eventos para notificar sobre mudanças<br>- Armazenamento de seleções e filtros atuais | Claude 3.5 |
| FE-021 | Persistência de estado | - Salvar estado atual no localStorage<br>- Recuperar estado ao iniciar a aplicação<br>- Limpar estado quando necessário<br>- Versionamento do estado para compatibilidade<br>- Tratamento de erros | Claude 3.5 |
| FE-022 | Integração do estado com a navegação | - Manter estado ativo ao navegar entre páginas<br>- Restaurar seleções anteriores ao retornar à página<br>- Gerenciamento de histórico de navegação<br>- Sincronização do estado do menu com a página atual<br>- Manter filtros aplicados | Claude 3.5 |