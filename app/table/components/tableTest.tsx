"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
  ExpandedState,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Fragment, HTMLProps, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { IFArray, IZhus } from "../page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DepartmentTable } from "./departmentTable"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    subRows: []
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    subRows: []
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    subRows: []
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    subRows: []
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
    subRows: []
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  subRows: []
}

export type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: 'relationship' | 'complicated' | 'single'
    subRows?: Person[]
  }

interface IFinal {
  department: string,
  logs: IZhus[],
  collapse: IZhus[],
  pressureSores: IZhus[],
  identificationOfThePatientsIdentity: IZhus[],
  anEventRelatedToAMedicalDeviceOrProduct: IZhus[],
  aDrugRelatedEvent: IZhus[],
  infectiousOrParasiticDisease: IZhus[],
  iSMP: IZhus[],
  surgicalComplications: IZhus[],
  anotherUndesirableEvent: IZhus[],
}

export function TableTest(
  {
    finalArr,
  } : {
    finalArr: IFArray[]
  }
) {

//change data to table fit data
  const onFitFinalArrToTable = (arr: IFArray[]) => {
    return arr.map((row) => {
      return {
        ...row,
        collapse: row.logs.filter((log) => log.event === 'Падение' || log.event === 'Collapse'),
        pressureSores: row.logs.filter((log) => log.event === 'Пролежни' || log.event === 'PressureSores'),
        identificationOfThePatientsIdentity: row.logs.filter((log) => log.event === 'Идентификация личности пациента' || log.event === 'IdentificationOfThePatientsIdentity'),
        anEventRelatedToAMedicalDeviceOrProduct: row.logs.filter((log) => log.event === 'Событие, связаное с медицинским оборудованием или изделием' || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct'),
        aDrugRelatedEvent: row.logs.filter((log) => log.event === 'Событие, связанное с лекартсвенным средством' || log.event === 'Событие, связанное с лекарственным средством' || log.event === 'ADrugRelatedEvent'),
        infectiousOrParasiticDisease: row.logs.filter((log) => log.event === 'Инфекционное или паразитарное заболевание' || log.event === 'InfectiousOrParasiticDisease'),
        iSMP: row.logs.filter((log) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)' || log.event === 'ISMP'),
        surgicalComplications: row.logs.filter((log) => log.event === 'Хирургические осложнения' || log.event === 'SurgicalComplications'),
        anotherUndesirableEvent: row.logs.filter((log) => log.event === 'Другое нежелательное событие' || log.event === 'AnotherUndesirableEvent'),
      }
    })
  }
  const [isFinal, setFinal] = useState<IFinal[]>([])
  useEffect(() => {
    if(onFitFinalArrToTable(finalArr))
      setFinal(onFitFinalArrToTable(finalArr))
  },[finalArr])

  console.log(isFinal)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const rerender = useReducer(() => ({}), {})[1]

    //bad, maybe exists a better solution
    const onSetupDepNameToRu = (depName: string) => {
        switch (depName) {
          case 'Surgical':
            return 'Хирургия'
          case 'Pulmonology':
            return 'Пульмонология'
          case 'Policlinic':
            return 'Поликлиника'
          case 'Therapeutic':
            return 'Терапия'
          case 'Reception':
            return 'Приемное'
          case 'Neurology':
            return 'Неврология'
          case 'Rehabilitation':
            return 'Реабилитация'
          case 'Laboratory':
            return 'Лаборатория'
          case 'Xray':
            return 'Рентгенология'
          case 'Reanimation':
            return 'Реанимация'
          case 'Administration':
            return 'Администрация'
          case 'Opp':
            return 'ОПП'
          case 'Pao':
            return 'ПАО'
          case 'Ceo':
            return 'СЭО'
          case 'Aho':
            return 'АХО' 
          default:
            return depName
        }
      }


  const columns = useMemo<ColumnDef<IFinal>[]>(
    () => [
      {
        accessorKey: 'department',
        header: ({ table }) => (
          <>
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {/*table.getIsAllRowsExpanded() ? '👇' : '👉'*/}
            </button>{' '}
            Отделение
          </>
        ),
        cell: ({ row }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div className="text-start font-medium ">
              {/*row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}
                  className="pl-2"
                >
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )*/}{' '}
                          <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? onSetupDepNameToRu(row.getValue('department')) : ''
            }
            {row.groupingColumnId}
            </button>
            </div>
          </div>
        ),
        //getGroupingValue: row => `AS`,
        footer: props => props.column.id,
      },
      //{
      //  accessorKey: 'collapse',
      //  id: 'lastName',
      //  cell: info => info.getValue(),
      //  header: () => <>Падение</>,
      //  footer: props => props.column.id,
      //},
      {
        accessorKey: 'collapse',
        header: () => 'Падение',
        cell: ({row}) => (<DropdownMenu >
          <DropdownMenuTrigger>
             <div className="select-none">{row.getValue<string>('collapse').length}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100vw]" side="bottom" avoidCollisions={true} align="center">
            <DropdownMenuLabel>{onSetupDepNameToRu(row.getValue('department'))}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DepartmentTable logs={row.getValue('collapse')}/>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
           
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'pressureSores',
        header: () => 'Пролежни',
        cell: ({row}) => (
          <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger> <div>{row.getValue<string>('pressureSores').length}</div></AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
              <DepartmentTable logs={row.getValue('pressureSores')}/>
            </AccordionContent>
          </AccordionItem>
          </Accordion>
           
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'identificationOfThePatientsIdentity',
        header: () => 'Идентификация личности пациента',
        cell: ({row}) => (
          <Drawer>
  <DrawerTrigger><div>{row.getValue<string>('identificationOfThePatientsIdentity').length}</div></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DepartmentTable logs={row.getValue('identificationOfThePatientsIdentity')}/>
    <DrawerFooter>
     
      <DrawerClose>
      close
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
          
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'anEventRelatedToAMedicalDeviceOrProduct',
        header: () => 'Событие, связанное с медицинским оборудованием или изделием',
        cell: ({row}) => (
          <>{row.getValue<string>('anEventRelatedToAMedicalDeviceOrProduct').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'aDrugRelatedEvent',
        header: () => 'Событие, связанное с лекарственным средством',
        cell: ({row}) => (
          <>{row.getValue<string>('aDrugRelatedEvent').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'infectiousOrParasiticDisease',
        header: () => 'Инфекционное или паразитарное заболевание',
        cell: ({row}) => (
          <>{row.getValue<string>('infectiousOrParasiticDisease').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'iSMP',
        header: () => 'ИСМП (инфекции, связанные с медицинской помощью)',
        cell: ({row}) => (
          <>{row.getValue<string>('iSMP').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'surgicalComplications',
        header: () => 'Хирургические осложнения',
        cell: ({row}) => (
          <>{row.getValue<string>('surgicalComplications').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'anotherUndesirableEvent',
        header: () => 'Другое',
        cell: ({row}) => (
          <>{row.getValue<string>('anotherUndesirableEvent').length}</>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'logs',
        header: () => 'Всего',
        cell: ({row}) => (
          <>{row.getValue<string>('logs').length}</>
        ),
        footer: props => props.column.id,
      },
    ],
    []
  )
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data: isFinal,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    //getSubRows: row => row.logs,
    getExpandedRowModel: getExpandedRowModel(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: () => true,
  })

  return (
    <div className="w-full ">
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row, arrName: '' })}

                    </td>
                  </tr>
                )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/** 
         *  <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
         * 
        */}
       
      </div>
     {
     /* 
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button>Refresh Data</button>
      </div>
      <label>Expanded State:</label>
      <pre>{JSON.stringify(expanded, null, 2)}</pre>
      <label>Row Selection State:</label>
      <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
    </div>
    */
    }
    </div>
  )
}

  function Filter({
    column,
    table,
  }: {
    column: Column<any, any>
    table: any
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    return typeof firstValue === 'number' ? (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
    ) : (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="w-36 border shadow rounded"
      />
    )
  }

  const renderSubComponent = ({ row, arrName }: { row: Row<IFinal>; arrName?: string }) => {
    return (
      <div style={{ fontSize: '10px' }}>
        <code>{JSON.stringify(row, null, 2)}</code>
        
      </div>
    )
  }
//<code>{JSON.stringify(row.original, null, 2)}</code>
//<DepartmentTable logs={row.getValue(arrName)} />