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