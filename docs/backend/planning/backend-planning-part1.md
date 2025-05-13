# PLANNING.md - Backend Complemento Azure DevOps

## Visão Geral

Este documento descreve o planejamento do backend para o complemento do Azure DevOps, incluindo a API REST baseada em Spring Boot e o banco de dados PostgreSQL. A API fornecerá suporte para o gerenciamento e visualização de iniciativas, pacotes de entrega e épicos para projetos complexos seguindo metodologias ágeis e SAFe.

O backend será desenvolvido como um microserviço sem autenticação/autorização, executado via Docker Compose, servindo como ferramenta de apoio para uso pessoal.

## Tecnologias

- **Framework**: Spring Boot (versão mais recente)
- **Banco de Dados**: PostgreSQL (versão atual)
- **Linguagem**: Java
- **Contêinerização**: Docker Compose
- **Documentação da API**: Swagger/OpenAPI

## Estrutura do Projeto

```
/backend
  /src
    /main
      /java
        /com/agilitycompanion
          /controller
            InitiativeController.java
            PackageController.java
            EpicController.java
            ReportController.java
            ConfigurationController.java
          /model
            Initiative.java
            Package.java
            Epic.java
            PackageDependency.java
            Configuration.java
          /repository
            InitiativeRepository.java
            PackageRepository.java
            EpicRepository.java
            PackageDependencyRepository.java
            ConfigurationRepository.java
          /service
            InitiativeService.java
            PackageService.java
            EpicService.java
            ReportService.java
            ConfigurationService.java
            ImportExportService.java
          /dto
            InitiativeDTO.java
            PackageDTO.java
            EpicDTO.java
            DependencyDTO.java
            ReportDTO.java
          /exception
            GlobalExceptionHandler.java
            ResourceNotFoundException.java
            ValidationException.java
          /config
            SwaggerConfig.java
            CorsConfig.java
          Application.java
      /resources
        application.properties
        application-dev.properties
        application-prod.properties
        /db/migration
          V1__init.sql
  pom.xml
  Dockerfile
```