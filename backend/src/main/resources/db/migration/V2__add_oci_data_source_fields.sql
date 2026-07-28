ALTER TABLE data_source_configs ADD COLUMN region VARCHAR(100);
ALTER TABLE data_source_configs ADD COLUMN compartment_id VARCHAR(255);
ALTER TABLE data_source_configs ADD COLUMN profile VARCHAR(100);
ALTER TABLE data_source_configs ADD COLUMN config_file VARCHAR(500);
ALTER TABLE data_source_configs ADD COLUMN default_metric_namespace VARCHAR(255);
ALTER TABLE data_source_configs ADD COLUMN include_subcompartments BOOLEAN NOT NULL DEFAULT FALSE;
