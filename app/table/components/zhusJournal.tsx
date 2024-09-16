'use client'

import { Button } from "@/components/ui/button";
import { ZhusTable } from "./zhusTable";
import { IZhus } from "../page";
import { useState } from "react";


export function ZhusJournal({onFetchedData}: {onFetchedData: IZhus[]}) {

    const [fetchedData] = useState<IZhus[]>(onFetchedData)

    return <div className="">
       <h1>КГБУЗ «ВЛАДИВОСТОКСКАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА № 4»</h1>
      <p>ОТЧЕТ ПО НЖС С
        август 30-го 04:02 дня
        по
        сентябрь 6-го 04:02 дня
      </p>
      <Button>получить</Button>
        <ZhusTable onFetchData={fetchedData}/>
    </div>
}