import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import Badge from '../common/Badge';

export default function DataTable({ data, columns, onRowClick }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sortCol === col.key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col.key);
      setSortDir('asc');
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortCol) return 0;
    const va = a[sortCol], vb = b[sortCol];
    const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-subtle bg-bg-dark/50">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`px-4 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap
                  ${col.sortable ? 'cursor-pointer hover:text-text-light select-none' : ''}`}
              >
                <div className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && (
                    <span className="text-text-muted/50">
                      {sortCol === col.key
                        ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        : <ChevronsUpDown size={12} />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id || i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border-subtle/50 transition-colors
                ${onRowClick ? 'cursor-pointer hover:bg-bg-card-hover' : ''}
                ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-card/60'}`}
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3.5 text-text-light whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <p className="text-sm">No results found</p>
        </div>
      )}
    </div>
  );
}
