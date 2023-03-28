import React from 'react'
import CheckIcon from '../icon/check';

type PasswordProps = {
    password: string;
    checkPassword: string;
    setCheckPassword: Function;
    setPassword:Function;
    style?:React.CSSProperties
}


export default function Password({password, checkPassword, setCheckPassword, setPassword, style }:PasswordProps) {
  return (
    <div className="frm" style={style ? style : {}}>
        <p>
            <input type="password" className="text" placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            {password.length > 0 && <button className="remove" onClick={() => setPassword('')}><span className="material-symbols-outlined">close</span></button>}
            <span className={`check ${password.match(/[a-zA-Z]/)  ? 'on': ''}`} data-pw="en"><CheckIcon size={15} color={password.match(/[a-zA-Z]/) ? '#111' :'var(--colorGray)'} /> 영문포함</span>
            <span className={`check ${password.match(/\d/) ? 'on': ''}`} data-pw="num"><CheckIcon size={15} color={password.match(/\d/) ? '#111' :'var(--colorGray)'} /> 숫자포함</span>
            <span className={`check ${password.match(/[,?><!#$%^&*(|)/+=`~@.]/) ? 'on': ''}`} data-pw="emo"><CheckIcon size={15} color={password.match(/[,?><!#$%^&*(|)/+=`~@.]/) ? '#111' :'var(--colorGray)'} /> 특수문자포함</span>
            <span className={`check ${password.length > 7 ? 'on': ''}`} data-pw="min"><CheckIcon size={15} color={password.length > 7 ? '#111' :'var(--colorGray)'} /> 8자리이상</span>
        </p>
        <p><input type="password" className="text" placeholder="비밀번호 확인"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
        /></p>
        <style>{`
            input {width:100%;}
            p {position:relative;}
            p+p {margin-top:15px;}
            .remove {position:absolute;right:10px;top:50%;background:var(--colorGray);border-radius:100%;color:#fff;width:24px;height:24px;display:flex;justify-content:center;align-items:center;margin-top:-25px;}
        `}</style>
    </div>
  )
}
