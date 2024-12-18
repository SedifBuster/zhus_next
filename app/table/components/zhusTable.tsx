'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IZhus } from "../page"
import { DepartmentTable } from "./departmentTable"
import { Dispatch, SetStateAction, useState } from "react"
import clsx from "clsx"

export
  function ZhusTable({
    onFetchData
  }: {
    onFetchData: IZhus[]
  }
) {
  const namesSet = new Set()
  let depsNamesArr: string[] | unknown[] = []

  const onFilterDataByDep = (data: IZhus[], dep: string | unknown) => {
    let result = data.filter(log => log.department === dep)

    return {department: dep, logs: [...result]}
  }

  const onSetDepsNames = (data: IZhus[]) => {
    for(let i = 0; i < data.length; i++) {
      namesSet.add(data[i].department)
    }
   return depsNamesArr = Array.from(namesSet)
  }

  onSetDepsNames(onFetchData)

  const onSetDeps = () => {
    let arr = []
    for(let i = 0; i < depsNamesArr.length; i++) {
      arr.push(onFilterDataByDep(onFetchData, depsNamesArr[i])) 
    }

    return arr
  }

  let finalArr = onSetDeps()

  const onClickCell = (
    logs: IZhus[], onChangeLogs: Dispatch<SetStateAction<IZhus[] | undefined>>,
    trigger: boolean, onChangeTrigger: Dispatch<SetStateAction<boolean>>
    ) => {

    if(trigger) {
      onChangeTrigger(!trigger)
      onChangeLogs([])
    }
    else {
      if(logs.length !== 0)
      onChangeTrigger(true)
      onChangeLogs(logs)
    }

  }

  return (
    <Table>
      <TableCaption>Лист нежелательных событий.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Отделения</TableHead>
          <TableHead className="text-center">Падение</TableHead>
          <TableHead className="text-center">Пролежни</TableHead>
          <TableHead className="text-center">Идентификация личности пациента</TableHead>
          <TableHead className="text-center">Событие, связанное с медицинским оборудованием или изделием</TableHead>
          <TableHead className="text-center">Событие, связанное с лекарственным средством</TableHead>
          <TableHead className="text-center">Инфекционное или паразитарное заболевание</TableHead>
          <TableHead className="text-center">ИСМП (инфекции, связанные с медицинской помощью)</TableHead>
          <TableHead>Другое</TableHead>
          <TableHead className="text-right">Всего</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          finalArr
          ?
          finalArr.map((task: any) => {

            const [isOpen, setOpen] = useState<boolean>(false)
            const [isDepFilter, setDepFilter] = useState<IZhus[]>()

            let reabEng = finalArr.filter(log => log.department === "Reabilitation")[0]
            if(reabEng)
              if(task.department === "Реабилитация")
                task.logs = [...task.logs,...reabEng.logs]

            let OPMP = finalArr.filter(log => log.department === "ОПМП")[0]
            if(OPMP)
              if(task.department === "ОПП")
                task.logs = [...task.logs, ...OPMP.logs]

            if(task.department !== 'ОПМП' && task.department !== 'Reabilitation')

            return <>
              <TableRow key={task.department}>

                <TableCell className="font-medium">
                  {task.department}
                </TableCell>

                <TableCell className={clsx("text-center hover:bg-green-600 hover:text-white cursor-pointer", isDepFilter && isDepFilter[0]? isDepFilter[0].event === 'Падение' && 'bg-green-600 text-white' : '')}
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Падение'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Падение').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Пролежни'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Пролежни').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Идентификация личности пациента'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Идентификация личности пациента').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                    || log.event === 'Событие, связанное с лекарственным средством'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                                                   || log.event === 'Событие, связанное с лекарственным средством').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие'), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие').length}
                </TableCell>

                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs, setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.length}
                </TableCell>

              </TableRow>

              {
                isOpen
                ?
                <DepartmentTable logs={isDepFilter}/>
                :
                null
              }
              </>
              }
            )
            :
            'Случаев не найдено'
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Итого</TableCell>
          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Падение').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Пролежни').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Идентификация личности пациента').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                                              || log.event === 'Событие, связанное с лекарственным средством').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Другое нежелательное событие').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    )
  }