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
    - Info: #2d7fc9 (bg: #d1e6f9)