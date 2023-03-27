type KeypadProps = {
    value: string;
    setValue: Function
    complete?: Function
    rule?: boolean;
}
export default function Keypad({value,setValue, complete, rule}:KeypadProps) {
  return (
    <div className="keypad">
        <button type="button" value="1" onClick={() => setValue('1')}>1</button>
        <button type="button" value="2" onClick={() => setValue('2')}>2</button>
        <button type="button" value="3" onClick={() => setValue('3')}>3</button>
        <button type="button" value="4" onClick={() => setValue('4')}>4</button>
        <button type="button" value="5" onClick={() => setValue('5')}>5</button>
        <button type="button" value="6" onClick={() => setValue('6')}>6</button>
        <button type="button" value="7" onClick={() => setValue('7')}>7</button>
        <button type="button" value="8" onClick={() => setValue('8')}>8</button>
        <button type="button" value="9" onClick={() => setValue('9')}>9</button>
        <button type="button" className="btn-delete" onClick={() => setValue('')}>Delete</button>
        <button type="button" value="0" onClick={() => setValue('0')}>0</button>
        {complete && <button type="button" className="btn-submit" onClick={() => complete()} disabled={rule}>다음</button>}
        <style jsx>{`
            .keypad {position:fixed;bottom:-1px;right:0;border-top:1px solid #acacac;background:#fff;width:100%;width:calc(100% + 1px);font-size:0;text-align:center;z-index:1;display:grid;grid-template-columns:repeat(3, 1fr);}
            .keypad button {height:66px;text-align:center;}
            .keypad button:not(.btn-submit) {border-bottom:1px solid #acacac;border-left:1px solid #acacac;background:none;font-size:23px;font-weight:500;}
            .keypad .btn-submit {border-radius:0;}
            .keypad .btn-rearrange {position:absolute;bottom:0;left:0;background:#4876ef;color:#fff;font-weight:bold;font-size:13px;}
            .keypad .btn-delete:before {content:'';position:absolute;width:27px;height:18px;background:url('../images/ic-delete.png') no-repeat 50% 50%;background-size:contain;top:50%;left:50%;margin:-9px 0 0 -14px;}
        `}</style>
    </div>
  )
}
