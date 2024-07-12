import { XMLParser } from 'fast-xml-parser';
import type { DataField, DataRow } from './types';
import { readFileSync } from 'fs';

export function prepareXml<TRow extends DataRow>(filePath: string): { fields: DataField[], rows: TRow[], defaults: Record<string, number> } {
  const file = readFileSync(filePath, "utf-8");
  const xml = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    attributeNamePrefix: "",
  });
  
  const result = xml.parse(file);
  const fields = result.param.fields.field as DataField[];
  const rows = result.param.rows.row as TRow[];
  const defaults: Record<string, number> = {};

  for(const field of fields) {
    if(typeof field.defaultValue !== 'number') {
      continue;
    }

    defaults[field.name] = field.defaultValue;
  }

  return { fields, rows, defaults }
}

export function mapXml<R>(data: string, mapper: <T extends DataRow>(row: T) => R): Record<number, R> {
  const xml = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    attributeNamePrefix: "",
  });
  
  const result = xml.parse(data);
  const fields = result.param.fields.field as DataField[];
  const rows = result.param.rows.row as DataRow[];
  const record: Record<string, R> = {};
  const defaults: Record<string, number> = {};

  for(const field of fields) {
    if(typeof field.defaultValue !== 'number') {
      continue;
    }

    defaults[field.name] = field.defaultValue;
  }

  for(let i = 0; i < rows.length; i++) {
    const row = rows[i]

    record[row.id] = mapper(row);
  }

  return record;
}