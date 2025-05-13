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