import { useRecoilState } from "recoil";
import Layout from "../components/layout";
import { NextPage } from "next";
import { userState } from "../states/user";
import { useState } from "react";
import Password from "../components/form/password";
import Certify from "../components/form/certify";
import Pin from "../components/form/pin";
import Link from "next/link";

type DataType = {
    password: string;
    pin:string;
    phone:string;
    email:string;
    name:string;
}
type CheckType = {
    password: string;
    pin:string;
}

const MyPage:NextPage = () => {
    const [user, setUser] = useRecoilState(userState)
    const [data, setData] = useState<DataType>({
        password: '',
        pin:'',
        phone:'',
        email:'',
        name:''
    })
    const [check, setCheck] = useState<CheckType>({
        password: '',
        pin:''
    })
    const logout = () => {
        setUser({
            email: '',
            password: '',
            pin: '',
            phone: '',
            total: 0
        })
    }
    return (
        <Layout type='back' title="마이페이지">
        <div className="container profile">
            <p className="info"><small>안녕하세요!</small> <b>{user.email}</b> 님</p>
            <div className="frm">
                <h2 className="stit">기본정보수정</h2>
                <p><label className="label">이메일</label>
                <input type="text" className="text" placeholder="chiandit@gmail.com" value={user.email} 
                    onChange={e => setData({
                        ...data,
                        email: e.target.value
                    })}
                /></p>
                <p><label className="label">휴대전화번호</label>
                    <Certify 
                    setPhoneNumber={(value:string) => setData({
                        ...data,
                        phone: value
                    })}
                    complete={() => {
                    }}
                /></p>
                <p><label className="label">이름</label>
                <input type="text" className="text" placeholder="홍길동" name={data.name}
                onChange={e => setData({...data, name:e.target.value})}/></p>
                <button className="btn-submit" onClick={() => {
                    setUser({
                        ...user,
                        email: data.email,
                        phone: data.phone
                    })
                }}>수정</button>
            </div>
            <div className="frm">
                <h2 className="stit">비밀번호변경</h2>
                <Password 
                    setCheckPassword={(value:string) => setCheck({
                        ...check,
                        password: value
                    })} 
                    setPassword={(value:string) => setData({
                        ...data,
                        password: value
                    })} 
                    password={data.password} 
                    checkPassword={check.password} 
                />
                <button className="btn-submit" 
                    onClick={() => setUser({...user, password: data.password})}
                    disabled={
                        !(data.password.match(/[,?><!#$%^&*(|)/+=`~@.]/) 
                        && data.password.match(/[a-zA-Z]/) 
                        && data.password.match(/\d/)
                        && data.password.length > 7
                        && data.password === check.password)
                    }
                >수정</button>
            </div>
            <div className="frm">
                <h2 className="stit">간편 비밀번호변경</h2>
                <p><Certify 
                    setPhoneNumber={(value:string) => setUser({
                        ...user,
                        phone: value
                    })}
                    complete={() => {
                        
                    }}
                /></p>
                <p><label className="label">현재 간편 비밀번호를 입력해주세요</label>
                    <Pin value={data.pin}
                        setValue={(value:string) => setData({
                            ...data,
                            pin: value
                        })}
                        textbox={true}
                        complete={() => {}} 
                    />
                </p>
                <p><label className="label">새로운 간편 비밀번호를 입력해주세요</label>
                    <Pin value={check.pin}
                        setValue={(value:string) => setCheck({
                            ...check,
                            pin: value
                        })}
                        textbox={true}
                        complete={() => {}} 
                    />
                </p>
                <button className="btn-submit" onClick={() => {
                    setUser({...user, pin: data.pin})
                }}>수정</button>
            </div>
            <ul>
                <li><Link href="/">회원탈퇴</Link></li>
                <li><button onClick={logout}>로그아웃</button></li>
            </ul>
        </div>
        <style jsx>{`
            .profile input {width:100%;}
            .profile .frm p+p {margin-top:15px;}
            .profile .btn-submit {width:100%;}
            .profile .frm {padding:24px 0;position:relative;}
            .profile .stit {padding-bottom:16px;text-align:left;}
            .profile .info {position:relative;color:#4876ef;text-align:center;font-size:17px;padding-bottom:32px;}
            .profile .info:before {content:'';margin:0 auto 17px;width:60px;height:60px;display:block;border-radius:100%;background:#4876ef;}
            .profile .info:after {content:'';position:absolute;top:30px;left:50%;width:40px;height:19px;background:url('../images/logo-simbol.png') no-repeat;background-size:contain;margin:-10px 0 0 -20px}
            .profile .info small {display:block;font-size:14px;}
            .profile ul {position:relative;}
            .profile .frm:before, .profile ul:before {content:'';position:absolute;top:0;left:50%;width:100vw;transform:translateX(-50%);border-top:4px solid #d9d9d9;}
            .profile .frm .btn-code {position:absolute;top: 36px;right:10px;margin: 0;line-height: 30px;width: auto;padding: 0 10px;font-size: 11px;}
            .profile.show_keypad .keypad {display:block;}
            .profile.show_keypad ul {padding-bottom:230px;}
            .profile li a {position:relative;display:block;padding:14px 30px 14px 23px;color:#363636;border-bottom:1px solid #d9d9d9;}
            .profile li a:after {content:'';position:absolute;transform: rotate(180deg);opacity: 0.6;top:50%;right:23px;margin-top:-6px;width:7px;height:12px;background:url('../images/ic-back.png') no-repeat 50% 50%;background-size:contain;}
            .profile .btn-submit {margin-top:24px;}    
            .frm .label {display:block;padding:6px 0;font-weight:bold;}    
        `}</style>
        </Layout>
    )
}

export default MyPage