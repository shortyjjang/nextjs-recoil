type ButtonProps = {
    style?: React.CSSProperties;
    className?: string;
    title: string;
}


type PopupProps = {
    title?:string;
    setShow: Function;
    children: React.ReactNode;
    footer?:ButtonProps[],
    action?: Function
}
export default function PopupContainer({children, setShow, footer, title, action}:PopupProps) {
  return (
    <div className="popup-container">
        <div className="popup-back" onClick={() => setShow(false)}></div>
        <div className="popup">
            {title && <h3>{title}</h3>}
            <div className="popup-inner">
                {children}
            </div>
            {footer&& footer.length > 0 && <div className="popup-footer">
                {footer.map(btn => <button key={btn.title} className={btn.className ? btn.className :""} style={btn.style ? btn.style : {}} onClick={() => {
                    btn.className === 'btn-submit' && action ? action()
                    : setShow(false)
                }}>{btn.title}</button>)}
            </div>}
        </div>
        <style jsx>{`
            .popup-container {position:fixed;z-index:11;top:0;left:0;width:100%;height:100%;overflow:auto;background: rgba(0,0,0,0.8);}
            .popup-back {position:absolute;top:0;left:0;width:100%;height:100%;}
            .popup {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-radius: 9px 9px 0 0;
                overflow: hidden;
                background:#fff;
            }
            .popup-inner {padding:30px;}
            h3 {
                font-size: 20px;
                font-weight: 500;
                line-height: 51px;
                border-bottom: 1px solid #d7d7d7;
                background: #fff;
                text-align: center;
            }
            .popup-footer {
                display:flex;
            }
            .popup-footer button {
                width:100%;
                border-radius:0;
            }
        `}</style>
    </div>
  )
}
