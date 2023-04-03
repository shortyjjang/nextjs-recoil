import { useState } from 'react'
import Keypad from './keypad'

type CertifyType = {
  checked: boolean;
  phone: string;
  number: string;
  send: boolean;
}
type CertifyProps = {
  complete:Function;
  setPhoneNumber: Function;
  keypad?:boolean;
}
export default function Certify({ complete, setPhoneNumber, keypad}:CertifyProps) {
  const [certify, setCertify] = useState<CertifyType>({
      number: '',
      checked: false,
      phone: '',
      send: false
  })
  const [expires, setExpires] = useState<number>(0)
  const startExpires = () => {
      const timer = setInterval(() => setExpires(expires - 1),1000)
      expires < 1 && clearInterval(timer)
      return () => {
          clearInterval(timer)
      }
  }
  const sendCerfyNum = () => {
    complete()
  }
  const authenticate = () =>{
    setPhoneNumber(certify.phone)
    setExpires(180)
    setCertify({
        ...certify,
        send: true,
    })
    startExpires()
  }
  return (
    <>
      <div className="frm">
          <p><span className="certification">
              <input type="text" className="text" value={certify.phone} 
                readOnly={keypad ? true : false}
                onChange={(e) => setCertify({
                  ...certify,
                  phone: e.target.value
                })} 
                placeholder="휴대전화번호" 
              />
              <button className="btn-submit btn-check" 
                onClick={() => certify.send ? setExpires(180): authenticate()} 
                disabled={certify.phone.length < 11 ? true: false}
              >{certify.send ? '인증번호재요청' : '본인인증번호요청'}</button>
          </span></p>
          {certify.send && expires > 0 && 
          <p><span className="check-certification">
            <input type="tel" className="text" placeholder="인증번호" 
              readOnly={keypad ? true : false} 
              value={certify.number} 
              onChange={e => setCertify({
                  ...certify,
                  number: e.target.value
              })} 
            />
            {certify.number.length > 5 ? <button className="btn-submit btn-check" 
              onClick={() => sendCerfyNum()} 
              disabled={(!certify.number || expires < 1) ? true : false}
            >본인인증</button>
          : <small>{Math.floor(expires/60)}:
          {expires - Math.floor(expires/60) * 60 < 1 
              ? 60 : <>
              {expires - Math.floor(expires/60) * 60 < 10 && '0'}
              {expires - Math.floor(expires/60) * 60}
              </>
          }</small>}
          </span></p>}
      </div>
      {keypad && (certify.send ?
      <Keypad 
          value={certify.number} 
          setValue={(val:string) => setCertify({
              ...certify,
              number: certify.number+val
          })} 
          complete={sendCerfyNum} 
          rule={(!certify.number || expires < 1) ? true : false}
      />: 
      <Keypad 
          value={certify.phone} 
          setValue={(val:string) => certify.phone.length < 11 && setCertify({
              ...certify,
              phone: val ? certify.phone+val : ''
          })} 
          complete={authenticate}
          rule={certify.phone.length < 11 ? true: false}
      />)}
        <style jsx>{`
          .frm p+p {margin-top:10px}
          .frm input {width:100%}
          .frm .certification, .frm .dot {display:block;position:relative;}
          .frm .certification .iti {display:block;}
          .frm .certification+.btn-submit+.check-certification {margin-top:7px;}
          .frm .certification+.btn-submit {position:absolute;top:10px;right:10px;line-height:30px;font-size:11px;width:auto;padding:0 10px;}
          .frm .certification .btn-check, .frm .check-certification .btn-check {font-size:12px;font-weight:400;height:20px;min-width:50px;text-align:center;position:absolute;top:50%;margin-top:-10px;right:15px;border-radius:2px;padding:0 5px;}
          .frm .check-certification {position:relative;display: block;}
          .frm .certification+.check-certification {margin-top:7px;display:none;}
          .frm .check-certification small {position:absolute;right:16px;top:50%;margin-top:-10px;color: #4876ef;}
        `}</style>
    </>
  )
}
