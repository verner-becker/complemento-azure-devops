## Implementação dos Serviços

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