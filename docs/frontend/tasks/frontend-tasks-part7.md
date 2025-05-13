# Frontend Tasks - Part 7

## Relatório: Progresso de Épicos

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-070 | HTML/CSS para Relatório de Épicos | - Cabeçalho com filtros<br>- Área de resumo executivo com velocidade média<br>- Gráfico burndown<br>- Gráfico de distribuição por status<br>- Tabela detalhada de épicos<br>- Botões de exportação<br>- Rodapé com explicações<br>- Layout conforme especificação | Claude 3.5 |
| FE-071 | Implementação dos filtros | - Filtro por pacote<br>- Filtro por status<br>- Filtro por responsável<br>- Botão para gerar relatório<br>- Botões para exportar (PDF, Excel, CSV)<br>- Integração com estado da aplicação | Claude 3.5 |
| FE-072 | Implementação do resumo executivo | - Informações sobre velocidade média<br>- Previsões de conclusão<br>- Indicadores de desempenho<br>- Estilo visual com destaque para indicadores críticos<br>- Integração com API para buscar dados | Claude 3.5 |
| FE-073 | Implementação do gráfico burndown | - Gráfico de linha usando Chart.js<br>- Eixo X com períodos de tempo<br>- Eixo Y com esforço restante<br>- Linha ideal vs. linha real<br>- Projeção futura baseada na velocidade atual<br>- Tooltip com detalhes por ponto<br>- Integração com API para buscar dados | Claude 3.7 |
| FE-074 | Implementação do gráfico de distribuição | - Gráfico de pizza usando Chart.js<br>- Segmentos por status<br>- Legenda explicativa<br>- Tooltip com contagem e percentual<br>- Integração com API para buscar dados | Claude 3.5 |
| FE-075 | Implementação da tabela detalhada | - Tabela com todas as colunas conforme especificação<br>- Formatação para status, progresso<br>- Destaque para épicos atrasados ou em risco<br>- Cálculos de previsão e diferença de datas<br>- Ordenação por colunas<br>- Integração com API para buscar dados | Claude 3.5 |
| FE-076 | Implementação da exportação | - Exportação para PDF<br>- Exportação para Excel<br>- Exportação para CSV<br>- Inclusão de todos os dados e gráficos<br>- Formatação adequada para impressão<br>- Cabeçalho e rodapé no PDF<br>- Tratamento de erros durante exportação | Claude 3.7 |

## Tela de Configurações

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-077 | HTML/CSS para Configurações | - Layout com categorias de configuração<br>- Formulários para edição de parâmetros<br>- Botões para salvar/cancelar<br>- Mensagens de confirmação<br>- Layout responsivo<br>- Design conforme especificação | Claude 3.5 |
| FE-078 | Implementação de configurações de capacidade | - Formulário para editar capacidade base das equipes<br>- Validação de valores numéricos positivos<br>- Persistência das configurações via API<br>- Feedback visual após salvar<br>- Recarregamento das configurações ao abrir | Claude 3.5 |
| FE-079 | Implementação de configurações de unidades | - Formulário para definir unidades de medida<br>- Seleção de unidade padrão (story points, horas, dias)<br>- Configuração de conversão entre unidades<br>- Persistência das configurações via API<br>- Feedback visual após salvar | Claude 3.5 |
| FE-080 | Implementação de configurações de ciclos | - Formulário para configurar ciclos/iterações<br>- Definição de datas de início/fim<br>- Configuração de duração padrão<br>- Geração automática de próximos ciclos<br>- Persistência das configurações via API<br>- Feedback visual após salvar | Claude 3.5 |
| FE-081 | Importação/Exportação de configurações | - Botões para exportar configurações (JSON)<br>- Interface para importar configurações<br>- Validação do arquivo importado<br>- Confirmação antes de sobrescrever<br>- Feedback de progresso e sucesso/erro<br>- Backup automático antes de importar | Claude 3.5 |