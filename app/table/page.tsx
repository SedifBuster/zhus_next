'use server'

import { ZhusJournal } from "./components/zhusJournal";

export interface IZhus {
  id: number
  department: string
  name: string
  date: Date | string
  place: string
  event: string
  circs: string
  gauge: string
  note: string
  liable: string
  cause: string
  comment: null | string
}

export default async function Table(
) {

  async function onFetchData(url: string): Promise<IZhus[]> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()

      return data;
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error;
    }
  }

  const result = await onFetchData('http://192.168.0.148:5100/log')

  return <ZhusJournal onFetchedData={result}/>
}