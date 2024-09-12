import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IZhus } from "../page";


export
  function DepartmentTable(
  {
    logs
  } : {
  logs?: IZhus[]
  }
) {
  return  <><TableRow className="">
    <TableHead className="font-medium">дата</TableHead>
    <TableHead>имя пациента и дата рождения</TableHead>
    <TableHead>место нежелательного события</TableHead>
    <TableHead>вид нежелательного события</TableHead>
    <TableHead>причина возникновения неж события</TableHead>
    <TableHead>описание обстоятельств</TableHead>
    <TableHead>принятые меры</TableHead>
    <TableHead>примечание</TableHead>
    <TableHead>ответственный</TableHead>
    <TableHead>комментарий</TableHead>
  </TableRow>
  <TableRow className="">
    <TableCell className="font-medium">дата</TableCell>
    <TableCell>имя пациента и дата рождения</TableCell>
    <TableCell>место нежелательного события</TableCell>
    <TableCell>вид нежелательного события</TableCell>
    <TableCell>причина возникновения неж события</TableCell>
    <TableCell>описание обстоятельств</TableCell>
    <TableCell>принятые меры</TableCell>
    <TableCell>примечание</TableCell>
    <TableCell>ответственный</TableCell>
    <TableCell>комментарий</TableCell>
  </TableRow>
  </>

}