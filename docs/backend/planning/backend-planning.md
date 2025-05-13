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
## Modelo de Dados

### Tabelas Principais

#### 1. Initiative

```sql
CREATE TABLE initiative (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL,
  start_date DATE,
  end_date DATE,
  responsible VARCHAR(100),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Package

```sql
CREATE TABLE package (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  initiative_id INTEGER REFERENCES initiative(id),
  status VARCHAR(20) NOT NULL,
  start_date DATE,
  end_date DATE,
  team VARCHAR(100),
  allocated_capacity NUMERIC(10,2),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Epic

```sql
CREATE TABLE epic (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  package_id INTEGER REFERENCES package(id),
  status VARCHAR(20) NOT NULL,
  start_date DATE,
  end_date DATE,
  responsible VARCHAR(100),
  progress INTEGER DEFAULT 0,
  effort NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. PackageDependency

```sql
CREATE TABLE package_dependency (
  id SERIAL PRIMARY KEY,
  source_package_id INTEGER REFERENCES package(id),
  target_package_id INTEGER REFERENCES package(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_dependency UNIQUE (source_package_id, target_package_id),
  CONSTRAINT not_self_dependency CHECK (source_package_id != target_package_id)
);
```

#### 5. Configuration

```sql
CREATE TABLE configuration (
  id SERIAL PRIMARY KEY,
  config_key VARCHAR(50) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## APIs REST

### 1. Iniciativas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/initiatives | Lista todas as iniciativas |
| GET | /api/initiatives/{id} | Obtém uma iniciativa específica |
| POST | /api/initiatives | Cria uma nova iniciativa |
| PUT | /api/initiatives/{id} | Atualiza uma iniciativa existente |
| DELETE | /api/initiatives/{id} | Remove uma iniciativa (com verificação de dependências) |
| GET | /api/initiatives/{id}/packages | Lista pacotes vinculados a uma iniciativa |

### 2. Pacotes de Entrega

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/packages | Lista todos os pacotes de entrega |
| GET | /api/packages/{id} | Obtém um pacote específico |
| POST | /api/packages | Cria um novo pacote |
| PUT | /api/packages/{id} | Atualiza um pacote existente |
| DELETE | /api/packages/{id} | Remove um pacote (com verificação de dependências) |
| GET | /api/packages/{id}/epics | Lista épicos vinculados a um pacote |
| GET | /api/packages/{id}/dependencies | Lista dependências de um pacote |
| POST | /api/packages/{id}/dependencies | Adiciona uma dependência a um pacote |
| DELETE | /api/packages/{id}/dependencies/{dependencyId} | Remove uma dependência |

### 3. Épicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/epics | Lista todos os épicos |
| GET | /api/epics/{id} | Obtém um épico específico |
| POST | /api/epics | Cria um novo épico |
| PUT | /api/epics/{id} | Atualiza um épico existente |
| DELETE | /api/epics/{id} | Remove um épico |
| PUT | /api/epics/{id}/progress | Atualiza o progresso de um épico |

### 4. Relatórios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/reports/initiatives | Relatório de status por iniciativa |
| GET | /api/reports/packages | Relatório de status por pacote |
| GET | /api/reports/epics | Relatório de progresso de épicos |
| GET | /api/reports/gantt | Dados para gráfico de Gantt |
| GET | /api/reports/dependencies | Dados para mapa de dependências |
| GET | /api/reports/capacity | Dados para gráfico de capacidade vs. demanda |

### 5. Importação/Exportação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/import/csv | Importa dados de CSV |
| GET | /api/export/initiatives/csv | Exporta iniciativas para CSV |
| GET | /api/export/packages/csv | Exporta pacotes para CSV |
| GET | /api/export/epics/csv | Exporta épicos para CSV |
| GET | /api/export/report/{reportType}/pdf | Exporta relatório para PDF |
| GET | /api/export/report/{reportType}/xlsx | Exporta relatório para Excel |

### 6. Configurações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/configurations | Lista todas as configurações |
| GET | /api/configurations/{key} | Obtém uma configuração específica |
| PUT | /api/configurations/{key} | Atualiza uma configuração |
| POST | /api/configurations | Cria uma nova configuração |## Modelos de Domínio

### Initiative

```java
public class Initiative {
    private Long id;
    private String code;
    private String title;
    private String description;
    private String status; // Enum: "NOT_STARTED", "PLANNED", "IN_PROGRESS", "COMPLETED"
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsible;
    private Integer progress; // 0-100%
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Relacionamentos (não armazenados diretamente)
    private List<Package> packages;
}
```

### Package

```java
public class Package {
    private Long id;
    private String code;
    private String title;
    private String description;
    private Long initiativeId;
    private String status; // Enum: "NOT_STARTED", "PLANNED", "IN_DEVELOPMENT", "TESTING", "COMPLETED"
    private LocalDate startDate;
    private LocalDate endDate;
    private String team;
    private BigDecimal allocatedCapacity;
    private Integer progress; // 0-100%
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Relacionamentos (não armazenados diretamente)
    private Initiative initiative;
    private List<Epic> epics;
    private List<Package> dependencies; // Pacotes dos quais este depende
    private List<Package> dependents; // Pacotes que dependem deste
}
```

### Epic

```java
public class Epic {
    private Long id;
    private String code;
    private String title;
    private String description;
    private Long packageId;
    private String status; // Enum: "NOT_STARTED", "IN_PROGRESS", "BLOCKED", "COMPLETED"
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsible;
    private Integer progress; // 0-100%
    private BigDecimal effort;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Relacionamentos (não armazenados diretamente)
    private Package packageObj;
}
```

### PackageDependency

```java
public class PackageDependency {
    private Long id;
    private Long sourcePackageId;
    private Long targetPackageId;
    private LocalDateTime createdAt;
    
    // Relacionamentos (não armazenados diretamente)
    private Package sourcePackage;
    private Package targetPackage;
}
```

### Configuration

```java
public class Configuration {
    private Long id;
    private String configKey;
    private String configValue;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

## DTOs (Data Transfer Objects)

Para cada entidade principal, serão criados DTOs correspondentes para transferência de dados entre as camadas:

- InitiativeDTO
- PackageDTO
- EpicDTO
- DependencyDTO
- ConfigurationDTO

Além desses, serão criados DTOs específicos para os diferentes relatórios e visualizações:

- GanttDataDTO
- DependencyMapDTO
- CapacityDemandDTO
- StatusReportDTO
- ProgressReportDTO## Implementação dos Serviços

### InitiativeService

```java
@Service
public class InitiativeService {
    private final InitiativeRepository initiativeRepository;
    private final PackageRepository packageRepository;
    
    // Injeção de dependências via construtor
    
    public List<Initiative> findAll() {
        return initiativeRepository.findAll();
    }
    
    public Initiative findById(Long id) {
        return initiativeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Initiative not found with id: " + id));
    }
    
    public Initiative save(Initiative initiative) {
        // Validação e lógica de negócios
        return initiativeRepository.save(initiative);
    }
    
    public Initiative update(Long id, Initiative initiative) {
        // Validação e lógica de negócios
        Initiative existingInitiative = findById(id);
        // Atualizar campos
        return initiativeRepository.save(existingInitiative);
    }
    
    public void delete(Long id) {
        Initiative initiative = findById(id);
        
        // Verificar dependências
        if (packageRepository.countByInitiativeId(id) > 0) {
            throw new ValidationException("Cannot delete initiative with associated packages");
        }
        
        initiativeRepository.delete(initiative);
    }
    
    public List<Package> findPackagesByInitiativeId(Long initiativeId) {
        if (!initiativeRepository.existsById(initiativeId)) {
            throw new ResourceNotFoundException("Initiative not found with id: " + initiativeId);
        }
        
        return packageRepository.findByInitiativeId(initiativeId);
    }
    
    // Métodos adicionais para cálculos de progresso, status, etc.
    public void updateProgress(Long id, Integer progress) {
        // Validação e atualização de progresso
    }
}
```

Os outros serviços (PackageService, EpicService, etc.) seguirão padrão semelhante, implementando as operações CRUD básicas e regras de negócio específicas de cada entidade.

### ReportService

```java
@Service
public class ReportService {
    private final InitiativeRepository initiativeRepository;
    private final PackageRepository packageRepository;
    private final EpicRepository epicRepository;
    
    // Injeção de dependências via construtor
    
    public StatusReportDTO generateInitiativeStatusReport(LocalDate startDate, LocalDate endDate) {
        List<Initiative> initiatives = initiativeRepository.findByDateRange(startDate, endDate);
        
        // Processar dados para o relatório
        StatusReportDTO report = new StatusReportDTO();
        // Preencher relatório com estatísticas, indicadores, etc.
        
        return report;
    }
    
    public StatusReportDTO generatePackageStatusReport(LocalDate startDate, LocalDate endDate) {
        // Lógica similar ao relatório de iniciativas
    }
    
    public ProgressReportDTO generateEpicProgressReport(LocalDate startDate, LocalDate endDate) {
        // Lógica para gerar relatório de progresso de épicos
    }
    
    public GanttDataDTO generateGanttData() {
        // Buscar dados necessários para o gráfico de Gantt
        List<Initiative> initiatives = initiativeRepository.findAll();
        List<Package> packages = packageRepository.findAll();
        List<Epic> epics = epicRepository.findAll();
        
        // Processar dados para formato esperado pelo frontend
        GanttDataDTO ganttData = new GanttDataDTO();
        // Preencher dados do Gantt
        
        return ganttData;
    }
    
    public DependencyMapDTO generateDependencyMap() {
        // Lógica para gerar dados do mapa de dependências
    }
    
    public CapacityDemandDTO generateCapacityDemandData() {
        // Lógica para gerar dados do gráfico de capacidade vs. demanda
    }
}
```

### ImportExportService

```java
@Service
public class ImportExportService {
    private final InitiativeRepository initiativeRepository;
    private final PackageRepository packageRepository;
    private final EpicRepository epicRepository;
    
    // Injeção de dependências via construtor
    
    public void importFromCsv(MultipartFile file, String entityType) {
        try {
            // Parsear CSV
            List<String[]> rows = parseCsv(file);
            
            switch (entityType) {
                case "initiatives":
                    importInitiatives(rows);
                    break;
                case "packages":
                    importPackages(rows);
                    break;
                case "epics":
                    importEpics(rows);
                    break;
                default:
                    throw new ValidationException("Unsupported entity type: " + entityType);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to import data", e);
        }
    }
    
    private void importInitiatives(List<String[]> rows) {
        // Lógica para importar iniciativas
    }
    
    private void importPackages(List<String[]> rows) {
        // Lógica para importar pacotes
    }
    
    private void importEpics(List<String[]> rows) {
        // Lógica para importar épicos
    }
    
    public byte[] exportToCsv(String entityType) {
        switch (entityType) {
            case "initiatives":
                return exportInitiativesToCsv();
            case "packages":
                return exportPackagesToCsv();
            case "epics":
                return exportEpicsToCsv();
            default:
                throw new ValidationException("Unsupported entity type: " + entityType);
        }
    }
    
    private byte[] exportInitiativesToCsv() {
        // Lógica para exportar iniciativas para CSV
    }
    
    // Métodos similares para outras entidades
    
    public byte[] exportReportToPdf(String reportType, Map<String, Object> params) {
        // Lógica para exportar relatório para PDF
    }
    
    public byte[] exportReportToExcel(String reportType, Map<String, Object> params) {
        // Lógica para exportar relatório para Excel
    }
}
```

## Controllers

### InitiativeController

```java
@RestController
@RequestMapping("/api/initiatives")
public class InitiativeController {
    private final InitiativeService initiativeService;
    
    // Injeção de dependências via construtor
    
    @GetMapping
    public ResponseEntity<List<InitiativeDTO>> findAll() {
        List<Initiative> initiatives = initiativeService.findAll();
        List<InitiativeDTO> initiativeDTOs = initiatives.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(initiativeDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InitiativeDTO> findById(@PathVariable Long id) {
        Initiative initiative = initiativeService.findById(id);
        return ResponseEntity.ok(convertToDTO(initiative));
    }
    
    @PostMapping
    public ResponseEntity<InitiativeDTO> create(@RequestBody @Valid InitiativeDTO initiativeDTO) {
        Initiative initiative = convertToEntity(initiativeDTO);
        Initiative savedInitiative = initiativeService.save(initiative);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedInitiative));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InitiativeDTO> update(@PathVariable Long id, @RequestBody @Valid InitiativeDTO initiativeDTO) {
        Initiative initiative = convertToEntity(initiativeDTO);
        Initiative updatedInitiative = initiativeService.update(id, initiative);
        return ResponseEntity.ok(convertToDTO(updatedInitiative));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        initiativeService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}/packages")
    public ResponseEntity<List<PackageDTO>> findPackagesByInitiativeId(@PathVariable Long id) {
        List<Package> packages = initiativeService.findPackagesByInitiativeId(id);
        List<PackageDTO> packageDTOs = packages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(packageDTOs);
    }
    
    // Métodos de conversão entre entidades e DTOs
    private InitiativeDTO convertToDTO(Initiative initiative) {
        // Lógica de conversão
    }
    
    private Initiative convertToEntity(InitiativeDTO initiativeDTO) {
        // Lógica de conversão
    }
    
    private PackageDTO convertToDTO(Package packageObj) {
        // Lógica de conversão
    }
}
```

### ReportController

```java
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;
    
    // Injeção de dependências via construtor
    
    @GetMapping("/initiatives")
    public ResponseEntity<StatusReportDTO> generateInitiativeReport(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String status) {
        
        // Definir valores padrão se não fornecidos
        startDate = startDate != null ? startDate : LocalDate.now().minusMonths(3);
        endDate = endDate != null ? endDate : LocalDate.now().plusMonths(9);
        
        StatusReportDTO report = reportService.generateInitiativeStatusReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/packages")
    public ResponseEntity<StatusReportDTO> generatePackageReport(
            @RequestParam(required = false) Long initiativeId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String status) {
        
        // Definir valores padrão e lógica similar
        
        StatusReportDTO report = reportService.generatePackageStatusReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/epics")
    public ResponseEntity<ProgressReportDTO> generateEpicReport(
            @RequestParam(required = false) Long packageId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String status) {
        
        // Definir valores padrão e lógica similar
        
        ProgressReportDTO report = reportService.generateEpicProgressReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }
    
    @GetMapping("/gantt")
    public ResponseEntity<GanttDataDTO> generateGanttData(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String level) {
        
        GanttDataDTO ganttData = reportService.generateGanttData();
        return ResponseEntity.ok(ganttData);
    }
    
    @GetMapping("/dependencies")
    public ResponseEntity<DependencyMapDTO> generateDependencyMap(
            @RequestParam(required = false) Long initiativeId) {
        
        DependencyMapDTO dependencyMap = reportService.generateDependencyMap();
        return ResponseEntity.ok(dependencyMap);
    }
    
    @GetMapping("/capacity")
    public ResponseEntity<CapacityDemandDTO> generateCapacityDemandData(
            @RequestParam(required = false) String period,
            @RequestParam(required = false) String groupBy) {
        
        CapacityDemandDTO capacityDemandData = reportService.generateCapacityDemandData();
        return ResponseEntity.ok(capacityDemandData);
    }
}
```

## Configuração Docker

### Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/agility-companion-backend.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/agility_companion
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=postgres
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=agility_companion
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## Configuração Spring Boot

### application.properties

```properties
# Configurações do Datasource
spring.datasource.url=jdbc:postgresql://localhost:5432/agility_companion
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true

# Server
server.port=8080
server.servlet.context-path=/

# Logging
logging.level.root=INFO
logging.level.com.agilitycompanion=DEBUG
logging.level.org.springframework.web=INFO
logging.level.org.hibernate=INFO

# CORS
cors.allowed-origins=http://localhost:3000
```

## Padrões de Implementação

1. **Padrão Repository**: Utilização do Spring Data JPA para implementação automática dos repositórios, com métodos personalizados quando necessário.

2. **Padrão Service**: Separação da lógica de negócios em serviços, mantendo os controllers focados apenas na manipulação de requisições HTTP.

3. **Padrão DTO**: Uso de DTOs para transferência de dados entre as camadas, evitando exposição direta das entidades.

4. **Tratamento Centralizado de Exceções**: Implementação de um manipulador global de exceções para padronizar as respostas de erro.

5. **Validação de Dados**: Utilização de Bean Validation para validação de dados nos DTOs.

## Verificações de Integridade

1. **Exclusão de Iniciativas**: Verificar se não existem pacotes de entrega vinculados antes de excluir.

2. **Exclusão de Pacotes**: Verificar se não existem épicos vinculados antes de excluir.

3. **Dependências Circulares**: Evitar a criação de dependências circulares entre pacotes.

4. **Validação de Datas**: Garantir que a data de término seja posterior à data de início.

5. **Progresso**: Validar que o valor do progresso esteja entre 0 e 100.

## Próximos Passos e Melhorias Futuras

1. **Autenticação e Autorização**: Implementar JWT ou OAuth2 para segurança, se necessário no futuro.

2. **Cache**: Adicionar cache para melhorar o desempenho de operações frequentes de leitura.

3. **Testes Unitários e de Integração**: Aumentar a cobertura de testes para garantir a robustez do sistema.

4. **Documentação Swagger/OpenAPI**: Melhorar a documentação da API com exemplos e descrições detalhadas.

5. **Sincronização com Azure DevOps**: Implementar integração com a API do Azure DevOps para sincronização automática de dados.

6. **Notificações**: Adicionar sistema de notificações para alertar sobre prazos, dependências bloqueadas, etc.

7. **Auditoria**: Implementar auditoria de mudanças nas entidades principais.

## Conclusão

Este plano de backend fornece uma estrutura sólida para o desenvolvimento do complemento ao Azure DevOps, priorizando a simplicidade e a facilidade de manutenção. A arquitetura baseada em Spring Boot, com separação clara entre as camadas de controle, serviço e persistência, permite um desenvolvimento ágil e extensível.

O sistema pode ser executado localmente via Docker Compose, tornando-o fácil de configurar e usar, sem a necessidade de infraestrutura complexa. Os endpoints REST fornecem todas as funcionalidades necessárias para suportar o frontend, incluindo operações CRUD básicas e geração de dados para visualizações e relatórios.

A abordagem MVP permite focar inicialmente nas funcionalidades essenciais, com um caminho claro para melhorias e extensões futuras conforme necessário.