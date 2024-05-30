// Table.tsx
import React from "react";

interface Product {
  id: number;
  nombre: string;
  precioCosto: number;
  precioVenta: number;
  cantidad: number;
  descripcion: string | null;
  
  createdById: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: Product[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  console.log("datos de la tabla",data)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            {columns.map((column,index) => (
              <th
                key={index}
                className="border-b border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="border-b border-gray-300 px-4 py-2 text-sm text-gray-700"
                >
                  {row[column.accessor as keyof Product]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatCell(value: string | number | Date | null): React.ReactNode {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // o cualquier formato de fecha que prefieras
  }
  return value !== null && value !== undefined ? value.toString() : null;
}


export default Table;
