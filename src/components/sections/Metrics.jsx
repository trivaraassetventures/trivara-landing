const ITEMS = [
  ['Estructura', 'Holding company'],
  ['Sede', 'Larnaca, Chipre'],
  ['Registro', 'HE 478995'],
  ['Filial', 'ARINX Arcum Intelligence X'],
  ['Socio estratégico', 'Vantage'],
  ['Plataformas', 'MT4 · MT5 · TradingView'],
  ['Marco', 'MiFID II 2(1)(d)'],
]

export default function Metrics() {
  // duplicate the list for a seamless marquee loop
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="metrics" aria-hidden="true">
      <div className="metrics__track">
        {loop.map(([label, value], i) => (
          <span className="metrics__item" key={i}>
            <i>◆</i>
            {label}
            <b>{value}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
