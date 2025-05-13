# Frontend Tasks - Part 4

## Cadastro de Épicos

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-034 | HTML/CSS para Cadastro de Épicos | - Layout mestre-detalhe com grid superior<br>- Painel de detalhes (formulário) inferior<br>- Botões de ação (Novo, Importar)<br>- Botões do formulário (Salvar, Cancelar, Excluir)<br>- Layout responsivo<br>- Design conforme especificação | Claude 3.5 |
| FE-035 | Implementação do grid de Épicos | - Grid com colunas conforme especificação<br>- Integração com API para buscar épicos<br>- Formatação de colunas (status, progress)<br>- Evento de seleção de linha<br>- Ordenação por colunas<br>- Filtro por pacote | Claude 3.5 |
| FE-036 | Implementação do formulário de Épicos | - Formulário com todos os campos conforme especificação<br>- Dropdown para seleção de pacote<br>- Layout em múltiplas colunas<br>- Validação de campos obrigatórios<br>- Validação de datas (fim > início)<br>- Formatação de campos especiais | Claude 3.5 |
| FE-037 | Implementação das operações CRUD | - Função para criar novo épico<br>- Função para carregar épico selecionado<br>- Função para salvar alterações<br>- Função para excluir épico<br>- Função para atualizar progresso<br>- Confirmação antes de excluir<br>- Tratamento de erros<br>- Feedback visual de sucesso/erro | Claude 3.5 |
| FE-038 | Implementação da importação CSV | - Modal para upload de arquivo CSV<br>- Preview dos dados a serem importados<br>- Validação do formato CSV<br>- Integração com API de importação<br>- Feedback de progresso e resultado<br>- Tratamento de erros | Claude 3.5 |

## Visualização: Gráfico de Gantt

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-039 | HTML/CSS para Gráfico de Gantt | - Área de filtros no topo<br>- Coluna de itens à esquerda<br>- Área principal do gráfico à direita<br>- Área de timeline/cabeçalho<br>- Botões de zoom/export<br>- Legenda na parte inferior<br>- Layout conforme especificação | Claude 3.5 |
| FE-040 | Implementação dos filtros do Gantt | - Filtro por iniciativa<br>- Filtro por período<br>- Filtro por nível de detalhe<br>- Botão para aplicar filtros<br>- Botão para exportar<br>- Integração com estado da aplicação | Claude 3.5 |
| FE-041 | Implementação da coluna de itens | - Estrutura hierárquica (iniciativas > pacotes > épicos)<br>- Indentação visual por nível<br>- Botões para expandir/colapsar níveis<br>- Estilo diferenciado para cada nível<br>- Scroll sincronizado com a área do gráfico | Claude 3.7 |
| FE-042 | Implementação da timeline | - Cabeçalho com divisões de tempo (meses/trimestres)<br>- Escala ajustável com zoom<br>- Linha vertical para data atual<br>- Estilo visual conforme especificação<br>- Rolagem horizontal sincronizada | Claude 3.7 |
| FE-043 | Implementação das barras do Gantt | - Barras para iniciativas, pacotes e épicos<br>- Posicionamento correto conforme datas<br>- Cores diferentes por status<br>- Indicador de progresso interno<br>- Tooltip ao passar o mouse<br>- Integração com API para buscar dados | Claude 3.7 |
| FE-044 | Implementação das dependências | - Linhas conectoras entre pacotes dependentes<br>- Estilo visual para dependências<br>- Destaque ao passar o mouse<br>- Renderização correta com scroll<br>- Tratamento de dependências entre itens não visíveis | Claude 3.7 |
| FE-045 | Funcionalidades interativas | - Zoom in/out na escala de tempo<br>- Drag para navegar na timeline<br>- Expansão/colapso de níveis hierárquicos<br>- Clique na barra para mostrar detalhes<br>- Exportação para PDF/imagem | Claude 3.7 |