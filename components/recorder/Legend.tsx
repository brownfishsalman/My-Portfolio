/** The printed channel legend over the lanes at the top of the roll. */
export function Legend() {
  return (
    <div className="legend bleed-band" role="presentation">
      <div />
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
