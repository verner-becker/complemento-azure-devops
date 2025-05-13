## Menu Principal

O menu lateral será estruturado da seguinte forma:

1. **Dashboard**
   - Visão geral com os principais indicadores e resumos

2. **Cadastros**
   - Iniciativas (tela mestre-detalhe com CRUD completo)
   - Pacotes de Entrega (tela mestre-detalhe com CRUD completo)
   - Épicos (tela mestre-detalhe com CRUD completo)

3. **Visualizações**
   - Gráfico de Gantt
   - Mapa de dependências entre pacotes de entrega
   - Capacidade vs. demanda

4. **Relatórios**
   - Status por iniciativa
   - Status por pacote
   - Progresso de épicos

5. **Configurações**
   - Parâmetros do sistema (capacidade de equipes, unidades de medida, etc.)

## Telas Principais

### 1. Dashboard

Página inicial do sistema com visão geral do projeto, contendo:

- Resumo quantitativo (total de iniciativas, pacotes e épicos)
- Gráfico de status (percentual de itens por status)
- Mini Gráfico de Gantt com próximas entregas
- Indicadores de saúde do projeto (itens atrasados, dependências bloqueadas)
- Lista de "Atenção Imediata" para itens prioritários

#### Componentes específicos:
- **Cartões de estatísticas** - Mostrando contagens totais
- **Gráficos de pizza** - Mostrando distribuição por status
- **Mini Gantt** - Visualização resumida do cronograma
- **Tabela de itens em atenção** - Lista de itens críticos

#### Interações:
- Clicar em um item da lista de atenção leva à tela de detalhes do item
- Clicar em um cartão de estatística filtra a lista correspondente
- Atualização de dados via API ao carregar a página

### 2. Cadastro de Iniciativas

Tela para gerenciamento de iniciativas, com layout mestre-detalhe:

**Grid Superior (listagem)**:
- Colunas: ID, Código, Título, Status, Data Fim, Progresso
- Botões de ação: Novo, Importar

**Painel de Detalhes (formulário)**:
- Campos:
  - Código (texto curto)
  - Título (texto longo)
  - Descrição (área de texto)
  - Status (dropdown)
  - Data Início (data)
  - Data Fim (data)
  - Responsável (texto)
  - Progresso (número)
- Botões: Salvar, Cancelar, Excluir

#### Interações:
- Seleção de linha no grid carrega os detalhes no painel inferior
- Botão "Novo" limpa o formulário para nova entrada
- Botão "Importar" abre modal para upload de CSV
- Validação de dados antes de salvar (datas, campos obrigatórios)
- Confirmação antes de excluir (verificar dependências)