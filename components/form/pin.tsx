import React from 'react'
import Keypad from './keypad';

type PinProps = {
    value: string;
    setValue: Function
    complete: Function;
}

export default function Pin({value, setValue, complete}:PinProps) {
  return (
    <>
    <div className="frm">
        <p className="dot">
            <i className={value.length > 0 ? 'current': ''} />
            <i className={value.length > 1 ? 'current': ''} />
            <i className={value.length > 2 ? 'current': ''} />
            <i className={value.length > 3 ? 'current': ''} />
        </p>
    </div>
    <Keypad 
        value={value} 
        setValue={(val:string) =>{
            setValue((value+val).length > 4 ? val : value+val)
            if((value+val).length === 4) complete()
        }} 
    />
    </>
  )
}
