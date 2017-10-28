import React from 'react'

export const ResultRow = ({ label, className, result, placeholder }) => (
  <p><strong>{label + ': '}</strong><span className={className}>{result ? result : placeholder}</span></p>
)
