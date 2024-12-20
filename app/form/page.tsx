'use server'

import { Department, Problem } from "@prisma/client";
import FormRecord from "./components/formRecord";
import QrTooltip from "./components/qrTooltip";

export
  type UnitDep = {
  value: Department,
  text: String,
}

export
  type UnitIssue = {
  value: Problem,
  text: String,
}

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

  const departments: UnitDep[] = [
    {
      value: "Policlinic",
      text: "Поликлиника",
    },
    {
      value: "Reception",
      text: "Приемное",
    },
    {
      value: "Pulmonology",
      text: "Пульмонология",
    },
    {
      value: "Rehabilitation",
      text: "Реабилитация",
    },
    {
      value: "Reanimation",
      text: "Реанимация",
    },
    {
      value: "Laboratory",
      text: "Лаборатория",
    },
    {
      value: "Neurology",
      text: "Неврология",
    },
    {
      value: "Opp",
      text: "ОПП",
    },
    {
      value: "Pao",
      text: "ПАО",
    },
    {
      value: "Ceo",
      text: "СЭО",
    },
    {
      value: "Therapeutic",
      text: "Терапия",
    },
    {
      value: "Surgical",
      text: "Хирургия",
    },
    {
      value: "Xray",
      text: "Рентгенология",
    },
    {
      value: "Administration",
      text: "Администрация",
    },
    {
      value: "Aho",
      text: "АХО",
    },
  ]

  const problems: UnitIssue[] = [
    {
      value: "IdentificationOfThePatientsIdentity",
      text: "Идентификация личности пациента",
    },
    {
      value: "Collapse",
      text: "Падение",
    },
    {
      value: "PressureSores",
      text: "Пролежни",
    },
    {
      value: "AnEventRelatedToAMedicalDeviceOrProduct",
      text: "Событие, связаное с медицинским оборудованием или изделием",
    },
    {
      value: "ADrugRelatedEvent",
      text: "Событие, связанное с лекарственным средством",
    },
    {
      value: "InfectiousOrParasiticDisease",
      text: "Инфекционное или паразитарное заболевание",
    },
    {
      value: "ISMP",
      text: "ИСМП (инфекции, связанные с медецинской помощью)",
    },
    {
      value: "SurgicalComplications",
      text: "Хирургические осложнения",
    },
    {
      value: "AnotherUndesirableEvent",
      text: "Другое нежелательное событие",
    },
  ]

  return <section className="flex flex-col justify-between p-2 container">
    <FormRecord departments={departments} problems={problems}/>
    {/** qr and tooltip*/}
    <QrTooltip />
  </section>
}

/**
 *     const departments = [
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
 */