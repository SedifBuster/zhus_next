'use client'

import { ZhusTable } from "./zhusTable";
import { IZhus } from "../page";
import { useState } from "react";


export function ZhusJournal({onFetchedData}: {onFetchedData: IZhus[]}) {

    const [fetchedData] = useState<IZhus[]>(onFetchedData)

    return <div className="container mx-auto flex flex-col items-center">
       <h1 className="font-bold text-lg">КГБУЗ «ВЛАДИВОСТОКСКАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА № 4»</h1>
       {/**поменять тут */}
      <p className="p-2">ОТЧЕТ ПО НЖС С
        август 30-го 04:02 дня
        по
        сентябрь 6-го 04:02 дня
      </p>
        <ZhusTable onFetchData={fetchedData}/>
    </div>
}