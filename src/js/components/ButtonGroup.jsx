import React from 'react'

export const ButtonGroup = ({ submitFn, resetFn }) => (
<div id="buttonGroup">
  <p>
    <button onClick={submitFn} id="submit" type="submit" className="btn btn-primary">Convert</button>
    <button onClick={resetFn} id="reset" type="reset" className="btn btn-warning">Reset</button>
  </p>
</div>
)

