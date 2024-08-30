import FormRecord from "./components/formRecord";
import QrTooltip from "./components/qrTooltip";

export
  default function Form(
) {
  return (
    <section className="grid grid-cols-2 gap-22">
      {/** form*/}
        <FormRecord />
      {/** qr and tooltip*/}
      <div>
        <QrTooltip />
      </div>
    </section>
  )
}