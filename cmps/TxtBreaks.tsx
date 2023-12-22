import React from 'react'

interface TxtBreaksProps {
    str: string
}

export function TxtBreaks({ str }: TxtBreaksProps) {
    const lines = str.split('\n')
    return lines.map((line, index) => (
        <React.Fragment key={line + index}>
            {line}
            {index !== lines.length - 1 && <br />}
        </React.Fragment>
    ))
}