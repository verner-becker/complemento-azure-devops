# Frontend Tasks - Part 5

## Visualização: Mapa de Dependências

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-046 | HTML/CSS para Mapa de Dependências | - Área de filtros no topo<br>- Área principal para o grafo<br>- Botões de zoom e exportação<br>- Legenda na parte inferior<br>- Layout responsivo<br>- Design conforme especificação | Claude 3.5 |
| FE-047 | Implementação dos filtros | - Filtro por iniciativa<br>- Opção para destacar caminho crítico<br>- Botão para aplicar filtros<br>- Botão para resetar layout<br>- Botão para exportar<br>- Integração com estado da aplicação | Claude 3.5 |
| FE-048 | Implementação do grafo de dependências | - Nós representando pacotes de entrega<br>- Arestas representando dependências<br>- Agrupamento visual por iniciativa<br>- Cores dos nós baseadas no status<br>- Integração com API para buscar dados<br>- Renderização eficiente para muitos nós | Claude 3.7 |
| FE-049 | Interação com o grafo | - Zoom in/out no grafo<br>- Drag para movimentar o grafo<br>- Drag para reposicionar nós<br>- Tooltip ao passar o mouse sobre nós<br>- Clique para selecionar nó e mostrar detalhes<br>- Destaque de dependências ao selecionar um nó | Claude 3.7 |
| FE-050 | Destaque de caminho crítico | - Algoritmo para identificar caminho crítico<br>- Destaque visual para nós e arestas do caminho crítico<br>- Tooltip explicando o impacto no cronograma<br>- Opção para alternar visualização<br>- Explicação do que é o caminho crítico na interface | Claude 3.7 |
| FE-051 | Exportação e visualização | - Exportação do grafo para imagem<br>- Opção para ajustar automaticamente o layout<br>- Exibição de informações resumidas (total de nós, dependências)<br>- Identificação de possíveis ciclos de dependência<br>- Tratamento de grafos grandes | Claude 3.7 |

## Visualização: Capacidade vs. Demanda

| Código | Descrição | Critérios de Aceitação | Modelo Recomendado |
|--------|-----------|------------------------|-------------------|
| FE-052 | HTML/CSS para Capacidade vs. Demanda | - Área de filtros no topo<br>- Área principal para o gráfico<br>- Seleção de modo de visualização<br>- Legenda explicativa<br>- Layout responsivo<br>- Design conforme especificação | Claude 3.5 |
| FE-053 | Implementação dos filtros | - Filtro por período<br>- Filtro por iniciativa<br>- Seleção do modo de visualização (equipe/período)<br>- Botão para aplicar filtros<br>- Botão para exportar<br>- Integração com estado da aplicação | Claude 3.5 |
| FE-054 | Implementação do gráfico por equipe | - Gráfico de barras usando Chart.js<br>- Eixo X com equipes<br>- Eixo Y com unidades de capacidade<br>- Barras empilhadas por iniciativa<br>- Linha de capacidade máxima<br>- Indicadores de sobrealocação<br>- Integração com API para buscar dados | Claude 3.7 |
| FE-055 | Implementação do gráfico por período | - Gráfico de barras usando Chart.js<br>- Eixo X com períodos (meses/sprints)<br>- Eixo Y com unidades de capacidade<br>- Barras empilhadas por iniciativa<br>- Linha de capacidade máxima<br>- Indicadores de sobrealocação<br>- Integração com API para buscar dados | Claude 3.7 |
| FE-056 | Interação e detalhamento | - Tooltip detalhado ao passar o mouse<br>- Clique para mostrar detalhes dos pacotes na barra<br>- Toggle para mostrar/ocultar iniciativas<br>- Destaque visual de sobrealocação<br>- Exportação para imagem/PDF | Claude 3.5 |
| FE-057 | Análise de capacidade | - Cálculo de porcentagem de utilização<br>- Identificação de períodos críticos<br>- Sugestões de rebalanceamento<br>- Exibição de métricas resumidas<br>- Integração com API para dados de capacidade | Claude 3.7 |