import CheckIcon from "../icon/check";
type StyleProps = {
    background?: string;
    boxShadow?: string;
}

type CheckboxProps = {
    check: boolean;
    setCheck: Function;
    size: number;
    defaultStyle: StyleProps;
    checked: StyleProps;
}
export function CheckBox({check, setCheck, size, defaultStyle, checked}:CheckboxProps){
    return(
        <button onClick={() => setCheck(!check)}
            style={check 
                ? checked
                : defaultStyle
            }
        >
            {check 
                ? <CheckIcon color="#fff" size={size*0.75}/>
                : <CheckIcon color={defaultStyle.background ? "#fff":"var(--colorGray)"} size={size*0.75}/>
            }
            <style jsx>{`
                button {
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 100%;
                    display:inline-flex;
                    justify-content:center;
                    align-items:center;
                    vertical-align:middle;
                    margin-top:-0.2rem;
                }
            `}</style>
        </button>
    )
}