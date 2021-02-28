import React, { useState } from 'react'
import { Schema } from '../types'
import { Context } from '../context'
import { Level } from './Level'

interface Props {
  data: Object
  schema: Schema
  onChange: (path: string[], value: any) => void
}

export const Wrapper = ({ data, schema, onChange }: Props) => {
  const [currentColorPicker, setCurrentColorPicker] = useState(null)

  return (
    <div className="konfi" style={{ fontFamily: 'monospace' }}>
      <p>{'{'}</p>
      <Context.Provider value={{ currentColorPicker, setCurrentColorPicker }}>
        <Level data={data} schema={schema} onChange={onChange} />
      </Context.Provider>
      <p>{'}'}</p>
    </div>
  )
}
