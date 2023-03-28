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
}
export default function Certify({ complete, setPhoneNumber}:CertifyProps) {
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
  return (
    <>
      <div className="frm">
          <p><span className="certification">
              <input type="text" className="text" value={certify.phone} readOnly placeholder="휴대전화번호" />
              <button className="btn-check" onClick={() => setExpires(180)}>{certify.send ? '재인증' : '본인인증'}</button>
          </span></p>
          {certify.send && expires > 0 && 
          <p><span className="check-certification"><input type="tel" className="text" placeholder="인증번호" readOnly value={certify.number} /><small>{Math.floor(expires/60)}:
          {expires - Math.floor(expires/60) * 60 < 1 
              ? 60 : <>
              {expires - Math.floor(expires/60) * 60 < 10 && '0'}
              {expires - Math.floor(expires/60) * 60}
              </>
          }</small></span></p>}
      </div>
      {certify.send ?
      <Keypad 
          value={certify.number} 
          setValue={(val:string) => setCertify({
              ...certify,
              number: certify.number+val
          })} 
          complete={() => {
            complete()
            setPhoneNumber(certify.phone)
          }} 
          rule={(!certify.number || expires < 1) ? true : false}
      />: 
      <Keypad 
          value={certify.phone} 
          setValue={(val:string) => certify.phone.length < 11 && setCertify({
              ...certify,
              phone: val ? certify.phone+val : ''
          })} 
          complete={() => {
            setExpires(180)
            setCertify({
                ...certify,
                send: true,
            })
            startExpires()
          }}
          rule={certify.phone.length < 11 ? true: false}
      />}
        <style>{`
        
            .frm .certification, .frm .dot {display:block;position:relative;}
            .frm .certification .iti {display:block;}
            .frm .certification+.btn-submit+.check-certification {margin-top:7px;}
            .frm .certification+.btn-submit {position:absolute;top:10px;right:10px;line-height:30px;font-size:11px;width:auto;padding:0 10px;}
            .frm .certification .btn-check, .frm .check-certification .btn-check {font-size:12px;line-height:20px;width:53px;text-align:center;position:absolute;top:50%;margin-top:-10px;right:15px;border-radius:2px;}
            .frm .check-certification {position:relative;display: block;}
            .frm .certification+.check-certification {margin-top:7px;display:none;}
            .frm .check-certification small {position:absolute;right:16px;top:50%;margin-top:-10px;color: #4876ef;}
        `}</style>
    </>
  )
}
