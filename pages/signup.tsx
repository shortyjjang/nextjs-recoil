import { useState } from "react";
import { CheckBox } from "../components/form/checkbox";
import Layout from "../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
// import axios from 'axios'
import axios from "axios";
import { userState } from "../states/user";
import { useRecoilState } from "recoil";
import { NextPage } from "next";
import Password from "../components/form/password";
import Certify from "../components/form/certify";
import Pin from "../components/form/pin";

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
    pin: string;
    phone: string
}
const Signup:NextPage = () => {
    const [user, setUser] = useRecoilState(userState)
    const router = useRouter()
    const [step, setStep] = useState<number>(4)
    const [data, setData] = useState<DataProps>({
        password: '',
        email: '',
        pin: '',
        phone:''
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
    const [pinCheck, setPinCheck] = useState<string>('')
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
    const completeJoin = async () => {
        const body = {
            ...user,
            ...data,
        }
        const request = await axios.post('', body)
        if(request.data.result === 'ok') {
            setStep(7)
            setUser(body)
            router.push('/')
        }else{
            alert('회원가입이 정상적으로 처리되지않았습니다.')
            setStep(1)
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
                    <Password 
                        setCheckPassword={(value:string) => setPassword(value)} 
                        setPassword={(value:string) => setData({
                            ...data,
                            password: value
                        })} 
                        password={data.password} 
                        checkPassword={password} 
                        style={{marginTop: '40px'}}
                    />
                </Step>}
                {step === 4 && <Step title="본인인증을 해주세요" step={step}
                    setStep={setStep}
                >
                    <Certify 
                        setPhoneNumber={(value:string) => setData({
                            ...data,
                            phone: value
                        })}
                        complete={() => {
                            setStep(5)
                        }}
                    />
                </Step>}
                {step === 5 && <Step title="간편비밀번호를 입력해주세요" step={step}
                    setStep={setStep}
                >
                    <Pin value={data.pin} 
                        complete={() => setStep(6)}
                        setValue={(value:string) => setData({
                            ...data,
                            pin: value
                        })}
                    />
                </Step>}
                {step === 6 && <Step title="간편비밀번호를 다시 입력해주세요" step={step}
                    setStep={setStep}
                >
                    <Pin value={pinCheck} 
                        complete={() => {
                            if(data.pin !== pinCheck) {
                                alert('간편비밀번호가 일치하지 않습니다.')
                                setPinCheck('')
                                return;
                            }
                            completeJoin()
                        }}
                        setValue={(value:string) => setPinCheck(value)}
                    />
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
                .dot {display:flex;justify-content:center;padding-top:20px;}
                .dot i+i {margin-left:30px;}
                .dot .current {background:#000;}
                .dot i {display:block;width:15px;height:15px;background:var(--colorGray);border-radius:100%;}
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
                .frm .certification {display:block;position:relative;}
                .frm .certification .iti {display:block;}
                .frm .certification+.btn-submit+.check-certification {margin-top:7px;}
                .frm .certification+.btn-submit {position:absolute;top:10px;right:10px;line-height:30px;font-size:11px;width:auto;padding:0 10px;}
                .frm .certification .btn-check, .frm .check-certification .btn-check {font-size:12px;line-height:20px;width:53px;text-align:center;position:absolute;top:50%;margin-top:-10px;right:15px;border-radius:2px;}
                .frm .check-certification {position:relative;display: block;}
                .frm .certification+.check-certification {margin-top:7px;display:none;}
                .frm .check-certification small {position:absolute;right:16px;top:50%;margin-top:-10px;color: #4876ef;}
                .success {
                    position: relative;
                    text-align: center;
                    color: #898989;
                    padding-top: 40px;
                }
            `}</style>
        </Layout>
    )
}

export default Signup