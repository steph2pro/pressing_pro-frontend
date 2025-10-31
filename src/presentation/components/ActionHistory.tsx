"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { History } from "@/types";
import { AdminAction } from "../../data2/models/AdminAction";



// Définition des colonnes de la table
const columns: ColumnDef<AdminAction>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    id: "time",
    header: "Heure",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return format(date, "HH:mm:ss");
    },
  },
  {
    accessorKey: "actionType",
    header: "Type d'Action",
  },
  {
    accessorKey: "adminUsername",
    header: "Administrateur",
  },
  {
    accessorKey: "reason",
    header: "Raison",
    cell: ({ getValue }) => getValue() || "Aucune",
  },
];

interface AdminActionHistoryProps {
  history?: AdminAction[];
}

const ActionHistory: React.FC<AdminActionHistoryProps> = ({ history = [] }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: history,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-4">
      {/* Filtre global sur l'administrateur */}
      <div className="mb-4">
        <Input
          placeholder="Filtrer par administrateur..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {/* Affichage de la table */}
      <Table className="text-gray-600 dark:text-gray-300">
        <TableHeader className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-gray-500"
              >
                Aucun historique trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>
        <span className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default ActionHistory;
