"use client"

import { useReactTable } from "@tanstack/react-table";

import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";

interface Props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    isPending?: boolean,
    onRowClick?: (row: TData) => void
}

export function Table<TData, TValue>({ columns, data, isPending, onRowClick }: Props<TData, TValue>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-hidden rounded-md border">
        <ShadcnTable>
            <TableHeader>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="bg-zinc-50 hover:bg-zinc-50"
                        >
                            {
                                headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-[14px] text-zinc-700 p-[15px]"
                                        >
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                        </TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    ))
                }
            </TableHeader>

            <TableBody>
                {
                    isPending
                        ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                                    Đang tải dữ liệu . . .
                                </TableCell>
                            </TableRow>
                        ) :
                        table.getRowModel().rows?.length
                            ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        onClick={() => onRowClick?.(row.original)}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-transparent cursor-pointer"
                                    >
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className="text-[14px] p-[15px]"
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            )
                            : (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                                        Danh sách rỗng.
                                    </TableCell>
                                </TableRow>
                            )
                }
            </TableBody>
        </ShadcnTable>
    </div>
  )
}