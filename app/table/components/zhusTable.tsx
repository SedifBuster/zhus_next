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

export function ZhusTable({onFetchData}: {onFetchData: IZhus[]}) {

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

  const finalArr = onSetDeps()

  console.log(finalArr) //лекарственным и лекарсвтенным


    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Отделения</TableHead>
            <TableHead className="text-center">Падение</TableHead>
            <TableHead className="text-center">Пролежни</TableHead>
            <TableHead className="text-center">Идентификация личности пациента</TableHead>
            <TableHead className="text-center">Событие, связанное с медицинским оборудованием или изделием</TableHead>
            <TableHead className="text-center">Событие, связанное с лекартсвенным средством</TableHead>
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
              finalArr.map((task: any) => (
                <TableRow key={task.department}>
                  <TableCell className="font-medium">{task.department}</TableCell>
                  <TableCell className="text-center">
                    {
                      task.logs
                        .filter((log: IZhus) => log.event === 'Падение').length
                    }
                  </TableCell>

                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Пролежни').length}
                  </TableCell>

                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Идентификация личности пациента').length}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием').length}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством').length}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание').length}
                  </TableCell>

                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)').length}
                  </TableCell>

                  <TableCell className="text-center">
                    {task.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие').length}
                  </TableCell>

                  <TableCell className="text-center">
                    {task.logs.length}
                  </TableCell>
                </TableRow>
              )
            )
            :
            ''
            /**onFetchData.map((task:IZhus) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.department}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.date.toString()}</TableCell>
              <TableCell>{task.place}</TableCell>
              <TableCell>{task.event}</TableCell>
              <TableCell>{task.circs}</TableCell>
              <TableCell>{task.gauge}</TableCell>
              <TableCell>{task.note}</TableCell>
              <TableCell>{task.liable}</TableCell>
              <TableCell>{task.cause}</TableCell>
            </TableRow>
          ))*/}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  