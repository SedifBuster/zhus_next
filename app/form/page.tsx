'use server'

import FormRecord from "./components/formRecord";
import QrTooltip from "./components/qrTooltip";

export
  default async function Form(
) {

  async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  // Usage example
  const apiUrl = 'https://api.example.com/data'; // Replace with your API URL
  
  fetchData(apiUrl)
    .then(data => console.log('Data received:', data))
    .catch(error => console.error('Error:', error));
    //время сделать с часами
    //оптимизировать страницу таблицы придумать что то с кол-вом получаемых случаев
    //графики? https://ui.shadcn.com/docs/components/chart
    //https://ui.shadcn.com/docs/components/toast
    //прогресс бар при загрузке страницы https://ui.shadcn.com/docs/components/progress

  return (
    <section className="flex flex-col justify-between p-2 container">
      {/** form grid grid-cols-2  gap-22*/}
        <FormRecord />
      {/** qr and tooltip*/}
        <QrTooltip />
    </section>
  )
}