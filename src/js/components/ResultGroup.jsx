import React from 'react'
import { ResultRow } from './ResultRow'

export const ResultGroup = ({ timezoneName, dateInYourTimeZone, dateInUtc, unixTimeStamp }) => (
  <div>
    <ResultRow
      label={timezoneName}
      className="cleanDate"
      result={dateInYourTimeZone}
      placeholder='Date will display here'
    />
    <ResultRow
      label='UTC'
      className="cleanDateUtc"
      result={dateInUtc}
      placeholder='Date will display here'
    />
    <ResultRow
      label='Unix'
      className="convertedDateUnix"
      result={unixTimeStamp}
      placeholder='Timestamp will display here'
    />
  </div>
)
