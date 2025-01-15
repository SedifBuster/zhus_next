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

  console.log(logs)

  return  <><TableRow className="bg-green-200">
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
  {
    logs
    ?
    logs.map((log) => {
      return <TableRow className="bg-green-50" key={log.id}>
      <TableCell className="font-medium">{log.date.toString()}</TableCell>
      <TableCell>{log.name} и дата рождения</TableCell>
      <TableCell>{log.place}</TableCell>
      <TableCell>{log.event}</TableCell>
      <TableCell>{log.cause}</TableCell>
      <TableCell>{log.circs}</TableCell>
      <TableCell>{log.gauge}</TableCell>
      <TableCell>{log.note}</TableCell>
      <TableCell>{log.liable}</TableCell>
      <TableCell>{log.comment}</TableCell>
    </TableRow>
    })

    :
    'событий не обнаружено'
  }

  </>

}