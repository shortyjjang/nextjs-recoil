import { useState } from "react";
import { CheckBox } from "../components/form/checkbox";
import Layout from "../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Keypad from "../components/form/keypad";
import axios from 'axios'
import dayjs from "dayjs";
import CheckIcon from "../components/icon/check";

type StepProps = {
    title: string;
    children: React.ReactNode;
    rule?: boolean;
    setStep?: Function;
    step?: number;
}

function Step({title, children, rule, setStep, step}:StepProps) {
    const router = useRouter()
    return(
		<div className="step">
			<h2 className="stit">{title}</h2>
			{children}
			<div className="btn-area">
				<button className="btn-submit" onClick={ () => step && setStep ? setStep(step + 1):router.push('/')} disabled={rule}>{step ? '다음' : '확인'}</button>
			</div>
            <style jsx>{`
                .stit {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 26px;
                }
                .btn-area {
                    position:fixed;
                    bottom:0;left:0;
                    width:100%;
                }
                .btn-area button {
                    width:100%;
                }
            `}</style>
		</div>
    )
}
type TermsProps = {
    type: string;
    check: boolean;
    link: string
}
type DataProps = {
    email: string;
    password: string;
    pin: number | null
}
type CertifyProps = {
    expires: string | null;
    checked: boolean;
    phone: string;
    number: string;
    sended: boolean;
}

export default function Signup() {
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const [data, setData] = useState<DataProps>({
        password: '',
        email: '',
        pin: null
    })
    const [certify, setCertify] = useState<CertifyProps>({
        number: '',
        checked: false,
        expires: null,
        phone: '',
        sended: false
    })
    const [password, setPassword] = useState<string>('')
    const [terms, setTerms] = useState<TermsProps[]>([
        {
            type: '개인정보 수집 및 이용 동의(필수)',
            check: false,
            link: 'privacy'
        },
        {
            type: '개인정보처리방침(필수)',
            check: false,
            link: 'privacy'
        },
        {
            type: '서비스 이용약관(필수)',
            check: false,
            link: 'privacy'
        },
        {
            type: '컨텐츠 이용약관(필수)',
            check: false,
            link: 'privacy'
        },
        {
            type: '이메일가입 개인정보취급방침(필수)',
            check: false,
            link: 'privacy'
        }
    ])
    const handleTerms = (type:string) => {
        let newTerms: TermsProps[] = []
        if(type === 'all') {
            if(!terms.find(term => !term.check)) {
                terms.forEach(term => {
                    newTerms.push({
                        ...term,
                        check: !term.check
                    })
                })
            }else{
                terms.forEach(term => {
                    if(!term.check) {
                        newTerms.push({
                            ...term,
                            check: !term.check
                        })
                    }else newTerms.push(term)
                })
            }

        }else{
            terms.forEach(term => {
                if(term.type === type) {
                    newTerms.push({
                        ...term,
                        check: !term.check
                    })
                }else newTerms.push(term)
            })
        }
        setTerms(newTerms)
    }
    const requestCertify = async () => {
        if(certify.sended && dayjs().diff(dayjs(certify.expires), 'second') > 0) {
            const body = {
                phone: certify.phone,
                token: certify.number
            }
            await axios.post('/휴대폰인증번호확인', body)
            setCertify({
                ...certify,
                checked:true,
            })
        }else{
            const body = {
                phone: certify.phone
            }
            await axios.post('/휴대폰인증요청', body)
            setCertify({
                ...certify,
                sended:true,
                expires: dayjs().add(3,'minutes').format('YYYY-MM-DD hh:mm:ss'),
            })
        }
    }
    return (
        <Layout type={step === 7 ? 'menu': "back"} title="회원가입" action={() => step ===  1 ? router.back() : setStep(step - 1)}>
            <div className="container signup">
                {step === 1 && <Step title="이용약관에 동의해주세요" 
                    step={step} 
                    rule={terms.filter(term => !term.check).length > 0}
                    setStep={setStep}
                >
                    <dl className="policy">
                        <dt><CheckBox size={20} 
                            checked={{background: 'var(--colorPoint)'}} 
                            defaultStyle={{background: 'var(--colorGray)'}} 
                            setCheck={() => handleTerms('all')} 
                            check={!terms.find(term => !term.check)}
                        /> <span onClick={() => handleTerms('all')} style={{cursor:'pointer'}}>전체동의</span></dt>
                        <dd><ul>
                            {terms.map(term => <li key={term.type}>
                                <CheckBox size={20} 
                                    checked={{background: 'var(--colorPoint)'}} 
                                    defaultStyle={{boxShadow: 'inset 0 0 0 1px var(--colorGray)'}} 
                                    setCheck={() => handleTerms(term.type)} 
                                    check={term.check}
                                /> <Link href={term.link}>{term.type}</Link>
                            </li>)}
                        </ul></dd>
                    </dl>
                </Step>}
                {step === 2 && <Step title="이메일주소를 입력해주세요" 
                    step={step}
                    rule={(!data.email || !data.email.includes('@') ||  !data.email.includes('.'))}
                    setStep={setStep}
                >
                    <div className="frm">
                        <p><input type="text" className="text"
                            onKeyDown={(e) => 
                                e.key.match(
                                    /[,?><!#$%^&*(|)/+=`~]/
                                ) && e.preventDefault()
                            }
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    email: e.target.value
                                })
                            }} value={data.email}
                            placeholder="ex) chiaindit@gmail.com" 
                        /></p>
                    </div>
                </Step>}
                {step === 3 && <Step title="비밀번호를 입력해주세요" step={step}
                    rule={!(data.password.match(/[,?><!#$%^&*(|)/+=`~@.]/) 
                    && data.password.match(/[a-zA-Z]/) 
                    && data.password.match(/\d/)
                    && data.password.length > 7
                    && data.password === password) }
                    setStep={setStep}
                >
                    <div className="frm">
                        <p>
                            <input type="password" className="text" placeholder="비밀번호" 
                            value={data.password}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    password: e.target.value
                                })
                            }}/>
                            {data.password.length > 0 && <button className="remove" onClick={() =>{ 
                                setData({
                                    ...data,
                                    password: ''
                                });
                                setPassword('')
                            }}><span className="material-symbols-outlined">close</span></button>}
                            <span className={`check ${data.password.match(/[a-zA-Z]/)  ? 'on': ''}`} data-pw="en"><CheckIcon size={15} color={data.password.match(/[a-zA-Z]/) ? '#111' :'var(--colorGray)'} /> 영문포함</span>
                            <span className={`check ${data.password.match(/\d/) ? 'on': ''}`} data-pw="num"><CheckIcon size={15} color={data.password.match(/\d/) ? '#111' :'var(--colorGray)'} /> 숫자포함</span>
                            <span className={`check ${data.password.match(/[,?><!#$%^&*(|)/+=`~@.]/) ? 'on': ''}`} data-pw="emo"><CheckIcon size={15} color={data.password.match(/[,?><!#$%^&*(|)/+=`~@.]/) ? '#111' :'var(--colorGray)'} /> 특수문자포함</span>
                            <span className={`check ${data.password.length > 7 ? 'on': ''}`} data-pw="min"><CheckIcon size={15} color={data.password.length > 7 ? '#111' :'var(--colorGray)'} /> 8자리이상</span>
                        </p>
                        <p><input type="password" className="text" placeholder="비밀번호 확인"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /></p>
                    </div>
                </Step>}
                {step === 4 && <Step title="본인인증을 해주세요" step={step}
                    setStep={setStep}
                >
                    <div className="frm">
                        <p><span className="certification">
                            <input type="text" className="text" value={certify.phone} readOnly placeholder="휴대전화번호" />
                            <button className="btn-check">본인인증</button>
                        </span></p>
                        {certify.sended && <p><span className="check-certification"><input type="tel" className="text" placeholder="인증번호" /><small>2:58</small></span></p>}
                    </div>
                    <Keypad 
                        value={certify.sended ? certify.number : certify.phone} 
                        setValue={(val:string) => 
                            setCertify(certify.sended ? {
                                ...certify,
                                number: val
                            }:{
                                ...certify,
                                phone: val
                            })
                        }
                        complete={requestCertify}
                        rule={certify.sended ? !certify.number : !certify.phone}
                    />
                </Step>}
                {step === 5 && <Step title="간편비밀번호를 입력해주세요" step={step}
                    setStep={setStep}
                >
                    <div className="frm">
                        <p className="dot">
                            <span className="placeholder">•</span><span className="placeholder">•</span><span className="placeholder">•</span><span className="placeholder">•</span>
                            <input type="tel" className="text" />
                        </p>
                    </div>
                </Step>}
                {step === 6 && <Step title="간편비밀번호를 다시 입력해주세요" step={step}
                    setStep={setStep}
                >
                    <div className="frm">
                        <p className="dot">
                            <span className="placeholder">•</span><span className="placeholder">•</span><span className="placeholder">•</span><span className="placeholder">•</span>
                            <input type="tel" className="text" />
                        </p>
                    </div>
                </Step>}
                {step === 7 && <Step title="가입완료">
                    <p className="success">
                        <span className="material-symbols-outlined">check</span>
                        CHAINDIT Wallet<br />
                        회원가입이 완료되었습니다
                    </p>
                </Step>}
            </div>
            <style jsx>{`
                .stit {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 26px;
                }
                .frm .remove {position:absolute;right:10px;top:50%;background:var(--colorGray);border-radius:100%;color:#fff;width:24px;height:24px;display:flex;justify-content:center;align-items:center;margin-top:-25px;}
                .material-symbols-outlined {font-size:16px;}
                .frm .check {display:inline-block;line-height:24px;color:#d9d9d9;font-size:12px;}
                .frm .check.on {color:#1b1b1b;}
                .frm .check+.check {margin-left:4px;}
                .signup {padding:90px 30px 30px;}
                .signup .frm {padding-top:40px;}
                .signup .frm input {width:100%;}
                .signup .frm p {position:relative;}
                .signup .frm p+p {margin-top:15px;}
                .signup .policy {border:1px solid #d2d2d2;border-radius:4px;margin-top:40px}
                .signup .policy dd {padding:12px 0;}
                .signup .policy li {position:relative;color:#1b1b1b;display:block;padding:10px 25px 10px 14px;}
                .signup .policy input {position:absolute;top:50%;left:14px;margin-top:-10px;}
                .signup .policy dt {position:relative;padding:10px 0 10px 14px;border-bottom:1px solid #d2d2d2;}
                .signup .policy li:after {content:'';position:absolute;transform: rotate(45deg);opacity: 0.6;top:50%;right:16px;margin-top:-6px;width:7px;height:7px;border:solid #d2d2d2;border-width:1px 1px 0 0;}

            `}</style>
        </Layout>
    )
}
