# Complemento Azure DevOps

Sistema complementar para visualização e gerenciamento de iniciativas, pacotes de entrega e épicos para projetos complexos seguindo metodologias ágeis e SAFe.

## Sobre o Projeto

Este projeto é uma aplicação web local que serve como ferramenta de apoio e automação para uso pessoal, focada em:
- Visualização de iniciativas e pacotes de entrega
- Gerenciamento de épicos
- Gráficos e relatórios para acompanhamento de projetos

## Tecnologias

- Frontend: HTML5, CSS3, JavaScript puro (vanilla)
- Visualizações Gráficas: Chart.js
- Estilo: CSS personalizado seguindo padrão corporativo

## Estrutura do Projeto

```
frontend/
  ├── index.html              # Página principal da aplicação
  └── assets/                 # Recursos da aplicação
      ├── css/               # Arquivos de estilo
      │   ├── styles.css     # Estilos globais
      │   └── charts.css     # Estilos específicos para gráficos
      └── js/                # Scripts JavaScript
          ├── main.js        # Script principal e roteamento
          ├── components/    # Componentes reutilizáveis
          ├── pages/        # Scripts específicos de páginas
          └── utils/        # Utilitários e helpers
```

## Progresso de Implementação

### Fase 1 - Estrutura Base ✅
- Configuração inicial do projeto
- Estrutura de diretórios estabelecida
- Arquivos base HTML, CSS e JavaScript criados
- Sistema completo de estilos CSS implementado
  - Variáveis CSS para cores corporativas
  - Layout responsivo e sistema de grid
  - Componentes base estilizados
  - Classes utilitárias para flexibilidade
- Sistema de navegação principal implementado
  - Menu lateral com todas as seções
  - Submenus expansíveis
  - Navegação entre páginas
  - Layout responsivo
- Estrutura base das páginas implementada
  - Container principal para conteúdo
  - Seções para todas as páginas do sistema
  - Sistema de visibilidade e transições
  - Mensagens "Em construção" para páginas pendentes

## Scripts de Automação

### FE-001-passo01.sh
Script para criação automatizada da estrutura inicial do projeto:
- Cria toda a hierarquia de diretórios
- Gera arquivos base necessários
- Configura estrutura seguindo as especificações do projeto

## Próximos Passos

- Implementação dos componentes base
- Desenvolvimento das páginas individuais
- Integração com Chart.js para visualizações
- Implementação do sistema de dados

## Documentação

- `/docs`: Documentação detalhada do projeto
  - `/frontend/planning`: Planejamento e especificações
  - `/frontend/tasks`: Tarefas e implementações
  - `task-completed.md`: Registro de tarefas concluídas
