import React from "react";
import { Pagination } from "./Pagination";

export interface Column<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  page: number;
  totalPages: number;
  itemsPerPage: number
  onPageChange: (page: number) => void;
  onSortChange?: (key: keyof T, direction: "asc" | "desc") => void;
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
  onSearchChange?: (query: string) => void;
  emptyMessage?: string;
}

export function Table<T extends object>({
  data,
  columns,
  page,
  totalPages,
  onPageChange,
  onSortChange,
  itemsPerPage,
  sortKey,
  sortDirection,
  onSearchChange,
  emptyMessage = "No records found.",
}: TableProps<T>) {
  return (
    <div className='space-y-6'>
      {/* Search Bar */}
      {onSearchChange && (
        <div className='relative'>
          <input
            type='text'
            placeholder='Search...'
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-active'
          />
        </div>
      )}

      {/* Table */}
      <div className='w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white'>
        <table className='w-full text-sm text-left text-gray-800'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-600 tracking-wider'>
            <tr>
              <th className='px-6 py-4 cursor-pointer select-none hover:text-active transition-colors'>
                Slno.
              </th>
              {columns.map((col, idx) => (
                <th
                  key={String(col.key.toString() + idx)}
                  onClick={() => {
                    if (onSortChange) {
                      const newDirection =
                        sortKey === col.key && sortDirection === "asc"
                          ? "desc"
                          : "asc";
                      onSortChange(col.key, newDirection);
                    }
                  }}
                  className='px-6 py-4 cursor-pointer select-none hover:text-active transition-colors'>
                  <div className='flex items-center'>
                    {col.label}
                    {sortKey === col.key && (
                      <span className='ml-1 text-base'>
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4'>
                    {(page - 1) * itemsPerPage + rowIndex + 1}
                  </td>
                  {columns.map((col, colIndex) => {
                    const value = row[col.key];
                    return (
                      <td
                        key={String(col.key) + colIndex}
                        className='px-6 py-4'>
                        {col.render
                          ? col.render(value, row)
                          : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-6 py-6 text-center text-gray-500'>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-end'>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
