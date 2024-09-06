import { Button } from "@/components/ui/button";
import { ZhusTable } from "./components/zhusTable";


export default function Table(
) {
  return (
    <div>
      <h1>КГБУЗ «ВЛАДИВОСТОКСКАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА № 4»</h1>
      <p>ОТЧЕТ ПО НЖС С
        август 30-го 04:02 дня
        по
        сентябрь 6-го 04:02 дня
      </p>
      <Button>получить</Button>
      <ZhusTable />
    </div>
  )
}