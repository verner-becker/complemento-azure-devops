## Modelos de Domínio

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
- ProgressReportDTO