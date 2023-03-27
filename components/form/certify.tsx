import React from 'react'

export default function Certify() {
  return (
    <>
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
