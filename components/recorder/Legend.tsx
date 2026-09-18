type Cell = { label: string; value: string };

type Props = { cells: Cell[] };

/** The printed chart header: record metadata on the left, channel legend over the lanes. */
export function Legend({ cells }: Props) {
  return (
    <div className="legend bleed-band" role="presentation">
      <div className="legend-cells">
        {cells.map((c) => (
          <div key={c.label} className="legend-cell">
            {c.label} <b>{c.value}</b>
          </div>
        ))}
      </div>
      <div />
      <div className="legend-lanes">
        <div className="legend-lane" data-ch="1">
          CH1 scroll rate
        </div>
        <div className="legend-lane" data-ch="2">
          CH2 section
        </div>
        <div className="legend-lane" data-ch="3">
          CH3 progress
        </div>
      </div>
    </div>
  );
}
