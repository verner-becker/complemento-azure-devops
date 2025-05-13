#!/bin/bash

# Script para criar a estrutura de arquivos do frontend
# Parte da tarefa FE-001

# Definir o diretório base do frontend
FRONTEND_DIR="/workspaces/complemento-azure-devops/frontend"

# Remover diretório frontend se existir
echo "Removendo diretório frontend se existir..."
rm -rf "$FRONTEND_DIR"

# Criar estrutura de diretórios base
echo "Criando estrutura de diretórios..."
mkdir -p "$FRONTEND_DIR"
mkdir -p "$FRONTEND_DIR"/assets/css
mkdir -p "$FRONTEND_DIR"/assets/js/components
mkdir -p "$FRONTEND_DIR"/assets/js/pages
mkdir -p "$FRONTEND_DIR"/assets/js/utils

# Criar arquivos CSS
echo "Criando arquivos CSS..."
touch "$FRONTEND_DIR"/assets/css/styles.css
touch "$FRONTEND_DIR"/assets/css/charts.css

# Criar arquivo JavaScript principal
echo "Criando arquivo JavaScript principal..."
touch "$FRONTEND_DIR"/assets/js/main.js

# Criar arquivos de componentes
echo "Criando arquivos de componentes..."
for file in menu dashboard grid forms charts; do
    touch "$FRONTEND_DIR"/assets/js/components/"$file".js
done

# Criar arquivos de páginas
echo "Criando arquivos de páginas..."
for file in dashboard iniciativas pacotes epicos gantt dependencias capacidade relatorios configuracoes; do
    touch "$FRONTEND_DIR"/assets/js/pages/"$file".js
done

# Criar arquivos de utilidades
echo "Criando arquivos de utilidades..."
for file in api csv export; do
    touch "$FRONTEND_DIR"/assets/js/utils/"$file".js
done

# Criar arquivo HTML principal
echo "Criando arquivo HTML principal..."
touch "$FRONTEND_DIR"/index.html

echo "Estrutura de arquivos criada com sucesso!"
echo "Listando estrutura criada:"
tree "$FRONTEND_DIR"
