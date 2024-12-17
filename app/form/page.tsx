'use server'

import FormRecord from "./components/formRecord";
import QrTooltip from "./components/qrTooltip";

//post

export
  default async function Form(
) {

  async function onPostData(url: string): Promise<any[]> {
    try {
      const response = await fetch(url, {
        method: 'POST',
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

  //const result = await onPostData('/api/logs')

  const departments = [
    'Поликлиника',
    'Приемное',
    'Пульмонология',
    'Реабилитация',
    'Реанимация',
    'Лаборатория',
    'Неврология',
    'ОПП',
    'ПАО',
    'СЭО',
    'Терапия',
    'Хирургия',
    'Рентгенология',
    'Администрация',
    'АХО',
  ]

  const problems = [
    'Идентификация личности пациента',
    'Падение',
    'Пролежни',
    'Событие, связаное с медицинским оборудованием или изделием',
    'Событие, связанное с лекарственным средством',
    'Инфекционное или паразитарное заболевание',
    'ИСМП (инфекции, связанные с медецинской помощью)',
    'Хирургические осложнения',//расхождение швов, повышенный демилий, еще что то
    'Другое нежелательное событие',
  ]

  return <section className="flex flex-col justify-between p-2 container">
    <FormRecord />
    {/** qr and tooltip*/}
    <QrTooltip />
  </section>
}