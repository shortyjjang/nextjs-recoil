import { useRecoilState } from "recoil";
import Layout from "../components/layout";
import { NextPage } from "next";
import { userState } from "../states/user";
import { useState } from "react";
import Password from "../components/form/password";
import Certify from "../components/form/certify";

type DataType = {
    password: string;
}
type CheckType = {
    password: string;
}

const MyPage:NextPage = () => {
    const [user, setUser] = useRecoilState(userState)
    const [data, setData] = useState<DataType>({
        password: ''
    })
    const [check, setCheck] = useState<CheckType>({
        password: ''
    })
    return (
        <Layout type='back'>
        <div className="container profile">
            <p className="info"><small>안녕하세요!</small> <b>{user.email}</b> 님</p>
            <div className="frm">
                <h2 className="stit">기본정보수정</h2>
                <p><label className="label">이메일</label>
                <input type="text" className="text" placeholder="chiandit@gmail.com" value={user.email} 
                    onChange={e => setUser({
                        ...user,
                        email: e.target.value
                    })}
                /></p>
                <Certify 
                    setPhoneNumber={(value:string) => setUser({
                        ...user,
                        phone: value
                    })}
                    complete={() => {
                        
                    }}
                />
                <p><label className="label">이름</label>
                <input type="text" className="text" placeholder="홍길동"/></p>
                <button className="btn-submit">수정</button>
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
                disabled={
                    !(data.password.match(/[,?><!#$%^&*(|)/+=`~@.]/) 
                    && data.password.match(/[a-zA-Z]/) 
                    && data.password.match(/\d/)
                    && data.password.length > 7
                    && data.password === check.password)
                }>수정</button>
            </div>
            <div className="frm">
                <h2 className="stit">간편 비밀번호변경</h2>
                <p><label className="label">모바일 인증</label>
                    <input type="text" className="text" placeholder="인증코드" />
                    <button className="btn-submit btn-code">모바일인증 코드 요청</button>
                </p>
                <p><label className="label">현재 간편 비밀번호를 입력해주세요</label>
                    <input type="password" className="text" placeholder="현재 비밀번호" />
                </p>
                <p><label className="label">새로운 간편 비밀번호를 입력해주세요</label>
                    <input type="password" className="text" placeholder="새로운 비밀번호" />
                </p>
                <button className="btn-submit">수정</button>
                <div className="keypad">
                    <button value="1">1</button>
                    <button value="2">2</button>
                    <button value="3">3</button>
                    <button value="4">4</button>
                    <button value="5">5</button>
                    <button value="6">6</button>
                    <button value="7">7</button>
                    <button value="8">8</button>
                    <button value="9">9</button>
                    <button value="0">0</button>
                    <button className="btn-delete">Delete</button>
                </div>
            </div>
            <ul>
                <li><a href="#">회원탈퇴</a></li>
                <li><a href="#">로그아웃</a></li>
            </ul>
        </div>
        </Layout>
    )
}

export default MyPage