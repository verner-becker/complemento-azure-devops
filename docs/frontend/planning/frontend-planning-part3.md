### 3. Cadastro de Pacotes de Entrega

Similar ao Cadastro de Iniciativas, com os campos específicos:

**Grid Superior (listagem)**:
- Colunas: ID, Código, Título, Iniciativa, Status, Data Fim, Equipe, Progresso
- Botões de ação: Novo, Importar

**Painel de Detalhes (formulário)**:
- Campos:
  - Código (texto curto)
  - Título (texto longo)
  - Descrição (área de texto)
  - Iniciativa (dropdown com lista de iniciativas)
  - Status (dropdown)
  - Data Início (data)
  - Data Fim (data)
  - Equipe Responsável (texto)
  - Capacidade Alocada (número)
  - Progresso (número)
  - Dependências (seleção múltipla de outros pacotes)
- Botões: Salvar, Cancelar, Excluir

#### Interações:
- Similar ao cadastro de iniciativas
- Ao selecionar uma iniciativa, as datas são preenchidas automaticamente com os limites da iniciativa
- Validação para evitar dependências circulares

### 4. Cadastro de Épicos

**Grid Superior (listagem)**:
- Colunas: ID, Código, Título, Pacote, Status, Progresso, Data Fim
- Botões de ação: Novo, Importar

**Painel de Detalhes (formulário)**:
- Campos:
  - Código (texto curto - ID no Azure DevOps)
  - Título (texto longo)
  - Descrição (área de texto)
  - Pacote de Entrega (dropdown com lista de pacotes)
  - Status (dropdown)
  - Data Início (data)
  - Data Fim (data)
  - Responsável (texto)
  - Progresso (número - percentual)
  - Esforço (número)
- Botões: Salvar, Cancelar, Excluir

#### Interações:
- Similar aos outros cadastros
- Ao selecionar um pacote, as datas são preenchidas automaticamente com os limites do pacote

### 5. Gráfico de Gantt

Visualização temporal de todas as entidades do projeto:

- Eixo Y: Itens organizados hierarquicamente (Iniciativas > Pacotes > Épicos)
- Eixo X: Linha do tempo (meses/trimestres)
- Filtros: Por iniciativa, período, nível de detalhe
- Interações: Zoom, expand/collapse, exportar
- Elementos visuais:
  - Barras coloridas por status
  - Progresso interno nas barras
  - Marcos importantes como diamantes
  - Linha vertical para data atual
  - Dependências como linhas conectoras

#### Componentes específicos:
- Painel de filtros no topo
- Área de cabeçalho com escala temporal
- Coluna de itens à esquerda
- Área principal do gráfico
- Legenda de cores e símbolos

#### Interações:
- Filtrar por iniciativa, período ou nível de detalhe
- Expandir/colapsar níveis hierárquicos
- Zoom na escala temporal
- Visualizar detalhes ao passar o mouse sobre as barras
- Exportar para PDF/imagem