import React, { useState } from 'react'
import Keypad from './keypad';

type PinProps = {
    value: string;
    setValue: Function
    complete: Function;
    textbox?:boolean
}

export default function Pin({value, setValue, complete, textbox}:PinProps) {
    const [defaultKeypad, setDefaultKeyPad] = useState<boolean>(textbox ? false: true)
    return (
        <>
        <div className="frm">
            {textbox ? <input type="password" 
                onClick={() => setDefaultKeyPad(true)}
                readOnly
                value={value} 
            /> :<p className="dot">
                <i className={value.length > 0 ? 'current': ''} />
                <i className={value.length > 1 ? 'current': ''} />
                <i className={value.length > 2 ? 'current': ''} />
                <i className={value.length > 3 ? 'current': ''} />
            </p>}
        </div>
        {defaultKeypad && <Keypad 
            value={value} 
            setValue={(val:string) =>{
                setValue((value+val).length > 4 ? val : value+val)
            }} 
            complete={() => {
                if(value.length === 4) {
                    complete()
                    if(textbox) setDefaultKeyPad(false)
                }
            }}
        />}
        <style jsx>{`
            input {width:100%;}
            .dot {display:flex;justify-content:center;padding-top:20px;}
            .dot i+i {margin-left:30px;}
            .dot .current {background:#000;}
            .dot i {display:block;width:15px;height:15px;background:var(--colorGray);border-radius:100%;}
        `}</style>
        </>
    )
}
