# PLANNING.md - Frontend Complemento Azure DevOps

## Visão Geral

Este documento descreve o planejamento do frontend para o complemento do Azure DevOps, focado em visualização e gerenciamento de iniciativas, pacotes de entrega e épicos para projetos complexos seguindo metodologias ágeis e SAFe.

O sistema será desenvolvido como uma aplicação web local, executada via Docker Compose, sem necessidade de autenticação/autorização, servindo como uma ferramenta de apoio e automação para uso pessoal.

## Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript puro (vanilla)
- **Visualizações Gráficas**: Chart.js
- **Estilo**: CSS personalizado seguindo padrão corporativo (sem frameworks externos)
- **Arquitetura**: SPA (Single Page Application) com arquivos separados por funcionalidade

## Estrutura de Arquivos e Diretórios

```
/frontend
  /assets
    /css
      styles.css
      charts.css
    /js
      main.js
      /components
        menu.js
        dashboard.js
        grid.js
        forms.js
        charts.js
      /pages
        dashboard.js
        iniciativas.js
        pacotes.js
        epicos.js
        gantt.js
        dependencias.js
        capacidade.js
        relatorios.js
        configuracoes.js
      /utils
        api.js
        csv.js
        export.js
  index.html
```

## Layout e Design

O layout do sistema seguirá o padrão de design corporativo com as seguintes características:

- Cabeçalho fixo com título do sistema
- Menu lateral fixo com navegação hierárquica
- Área de conteúdo principal responsiva
- Esquema de cores corporativas:
  - Primário: #005e8a
  - Secundário: #80bc00
  - Texto: #333333
  - Fundo claro: #f5f9fc
  - Bordas: #dce8f1
  - Status: 
    - Success: #30803c (bg: #e0f0d9)
    - Warning: #a86228 (bg: #fcecd2)
    - Danger: #d9534f (bg: #f8d7da)
    - Info: #2d7fc9 (bg: #d1e6f9)## Menu Principal

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
- Confirmação antes de excluir (verificar dependências)### 3. Cadastro de Pacotes de Entrega

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

### 6. Mapa de Dependências

Visualização em forma de grafo das relações entre pacotes de entrega:

- Nós: Pacotes de entrega (retângulos coloridos por status)
- Arestas: Dependências direcionadas (setas)
- Agrupamento: Por iniciativa (áreas coloridas)
- Filtros: Por iniciativa, visualização (caminho crítico)
- Interações: Zoom, arrastar nós, exportar

#### Componentes específicos:
- Painel de filtros no topo
- Área principal do diagrama
- Legenda de cores e símbolos
- Indicadores de progresso nos nós

#### Interações:
- Filtrar por iniciativa 
- Destacar caminho crítico
- Zoom in/out no diagrama
- Arrastar nós para reorganizar
- Exportar para PDF/imagem
- Clicar em um nó leva à tela de detalhes do pacote

### 7. Capacidade vs. Demanda

Gráfico para análise de alocação de recursos:

- Eixo X: Equipes ou períodos (configrável)
- Eixo Y: Unidades de capacidade (pontos, horas)
- Elementos visuais:
  - Barras de capacidade máxima
  - Barras empilhadas de demanda (coloridas por iniciativa)
  - Indicadores de sobrealocação
- Filtros: Por período, iniciativa, modo de visualização
- Exportação para PDF/Excel

#### Componentes específicos:
- Painel de filtros no topo
- Gráfico de barras empilhadas
- Linha de capacidade máxima
- Indicadores de sobrealocação
- Legenda de cores

#### Interações:
- Alternar entre visualização por equipe ou por período
- Filtrar por iniciativa
- Exportar para PDF/Excel
- Visualizar detalhes ao passar o mouse sobre as barras

### 8. Relatório: Status por Iniciativa

Relatório detalhado sobre o status e progresso das iniciativas:

- Cabeçalho com filtros e informações do relatório
- Resumo executivo com contagem por status
- Gráfico de pizza mostrando distribuição por status
- Tabela detalhada com:
  - Código e título da iniciativa
  - Responsável
  - Data de término
  - Status atual
  - Progresso
  - Indicador de saúde
  - Número de pacotes
- Opções de exportação (PDF, Excel)

#### Componentes específicos:
- Painel de filtros no topo
- Cartões de resumo executivo
- Gráfico de pizza
- Tabela principal
- Botões de exportação

#### Interações:
- Filtrar por período, status
- Exportar para PDF/Excel
- Ordenar colunas da tabela
- Clicar em uma linha leva à tela de detalhes da iniciativa

### 9. Relatório: Status por Pacote

Similar ao relatório de iniciativas, mas focado em pacotes de entrega:

- Cabeçalho com filtros (iniciativa, período, status)
- Resumo executivo com contagem por status
- Gráficos de distribuição (por status, por equipe)
- Tabela detalhada com:
  - Código e título do pacote
  - Iniciativa relacionada
  - Equipe responsável
  - Datas de início/término
  - Status atual
  - Progresso
  - Indicador de saúde
  - Capacidade alocada
  - Número de épicos
  - Dependências (entrada/saída)
- Opções de exportação (PDF, Excel)

### 10. Relatório: Progresso de Épicos

Relatório focado no progresso e previsões para épicos:

- Cabeçalho com filtros (pacote, status, responsável)
- Resumo executivo com velocidade média e previsões
- Gráfico burndown mostrando progresso ao longo do tempo
- Gráfico de distribuição por status
- Tabela detalhada com:
  - Código e título do épico
  - Pacote/iniciativa relacionados
  - Responsável
  - Datas de início/término
  - Status atual
  - Progresso
  - Esforço estimado
  - Previsão de conclusão
  - Diferença entre previsão e data planejada
- Opções de exportação (PDF, Excel, CSV)

### 11. Configurações

Tela para ajuste de parâmetros globais do sistema:

- Capacidade base das equipes
- Unidades de medida (story points, horas, dias)
- Ciclos/iterações padrão

## Implementação JavaScript

### Estrutura Principal (main.js)

```javascript
// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegação
    initNavigation();
    
    // Carregar página inicial (Dashboard)
    loadPage('dashboard');
    
    // Inicializar listeners para interações globais
    initGlobalListeners();
});

// Navegação entre páginas
function initNavigation() {
    const menuItems = document.querySelectorAll('[data-section]');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os itens
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Adicionar classe ativa ao item clicado
            this.classList.add('active');
            
            // Carregar a página correspondente
            const section = this.getAttribute('data-section');
            loadPage(section);
        });
    });
}

// Carregamento de páginas
function loadPage(page) {
    // Ocultar todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar a seção selecionada
    const selectedSection = document.getElementById(page);
    if (selectedSection) {
        selectedSection.classList.add('active');
        
        // Carregar dados da API
        loadPageData(page);
    }
}

// Carregamento de dados
function loadPageData(page) {
    // Dependendo da página, chamar a API correspondente
    switch(page) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'iniciativas':
            loadInitiativesData();
            break;
        // Outros casos...
    }
}
```

### Componente de Gráficos (charts.js)

```javascript
// Função para criar gráfico de pizza
function createPieChart(elementId, data, options = {}) {
    const ctx = document.getElementById(elementId).getContext('2d');
    
    return new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom'
            },
            ...options
        }
    });
}

// Função para criar gráfico de barras
function createBarChart(elementId, data, options = {}) {
    const ctx = document.getElementById(elementId).getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            ...options
        }
    });
}

// Função para criar gráfico de Gantt
function createGanttChart(elementId, data) {
    // Implementação mais complexa do gráfico de Gantt
    // usando Chart.js com personalização avançada
}
```

## Comunicação com a API

A comunicação com o backend será feita através de chamadas fetch para a API REST:

```javascript
// Função genérica para chamadas à API
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`/api/${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        showErrorMessage(`Falha na comunicação com o servidor: ${error.message}`);
        return null;
    }
}

// Funções específicas para cada entidade
const API = {
    // Iniciativas
    getInitiatives: () => apiCall('initiatives'),
    getInitiative: (id) => apiCall(`initiatives/${id}`),
    createInitiative: (data) => apiCall('initiatives', 'POST', data),
    updateInitiative: (id, data) => apiCall(`initiatives/${id}`, 'PUT', data),
    deleteInitiative: (id) => apiCall(`initiatives/${id}`, 'DELETE'),
    
    // Pacotes
    getPackages: () => apiCall('packages'),
    // ... outros métodos
    
    // Relatórios
    getInitiativeReport: (params) => apiCall(`reports/initiatives?${new URLSearchParams(params)}`),
    // ... outros métodos
};
```

## Próximos Passos e Melhorias Futuras

Funcionalidades planejadas para versões futuras (não incluídas no MVP):

1. **Personalização de visualizações**
   - Cores para diferentes estados
   - Ajustes de escala de tempo para o Gantt
   - Configuração de campos visíveis

2. **Templates de relatórios**
   - Criação de templates customizados
   - Configuração de cabeçalhos e rodapés
   - Salvamento de filtros frequentes

3. **Dashboards personalizados**
   - Criação de painéis customizados
   - Widgets configuráveis
   - Salvamento de múltiplas visões

4. **Rastreamento de OKRs**
   - Cadastro de objetivos e resultados-chave
   - Vinculação com iniciativas e pacotes
   - Visualização de progresso

## Responsividade

O design será otimizado inicialmente para desktop, mas incluirá:

- Layout responsivo para telas maiores que 768px
- Media queries básicas para adaptar o menu lateral em telas menores
- Ajuste de tamanhos de fonte e espaçamentos

Para uma experiência móvel completa, é recomendada uma implementação futura específica para dispositivos móveis, dado o caráter complexo das visualizações e interações.