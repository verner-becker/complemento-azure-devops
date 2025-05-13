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