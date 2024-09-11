import { TableCell, TableRow } from "@/components/ui/table";


export
  function DepartmentTable(

) {
  return  <TableRow className="">
    <TableCell className="font-medium">дата</TableCell>
    <TableCell>имя пациента</TableCell>
    <TableCell>место нежелательного события</TableCell>
    <TableCell>вид нежелательного события</TableCell>
    <TableCell>причина возникновения неж события</TableCell>
    <TableCell>описание обстоятельств</TableCell>
    <TableCell>принятые меры</TableCell>
    <TableCell>примечание</TableCell>
    <TableCell>ответственный</TableCell>
    <TableCell>комментарий</TableCell>
  </TableRow>
}