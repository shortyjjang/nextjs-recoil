import Link from "next/link"
import {useState} from 'react'
type LoginData = {
    email: string;
    password: string;
}
export default function Login() {
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    })
    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }
    return (
        <div className="container login">
            <h1 className="ptit">MY WALLET</h1>
            <form onSubmit={handleLogin} className="frm">
                <p><input type="text" className="text" value={data?.email} placeholder="이메일" onChange={e => setData({...data, email: e.target.value})} /></p>
                <p><input type="password" className="text" value={data?.password} placeholder="비밀번호" onChange={e => setData({...data, password: e.target.value})} /></p>
                <button className="btn-submit" type="submit">로그인</button>
            </form>
            <div className="other-way">
                <div className="help">
                    <Link href="/find_id">아이디찾기</Link>
                    <span></span>
                    <Link href="/find_password">비밀번호찾기</Link>
                    <span></span>
                    <Link href="/signup">회원가입</Link>
                </div>
                <Link href="/login_simple" style={{color: 'var(--colorPoint)'}}>간편번호로 로그인하기</Link>
            </div>
            <style jsx>{`
                .container {display:flex;height:100vh;width:100%;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:30px;}
                .ptit {color:var(--colorPoint);font-weight:800;font-size:2rem;padding-bottom:44px;}
                .frm {width:100%;max-width:400px;}
                .frm input, .frm button {width:100%;display:block;margin-bottom:10px;}
                .help {display:flex;padding:10px 0 30px;align-items:center;}
                .help span {margin:0 12px;width:1px;height:12px;background:var(--colorGray)}
                .lang {display:flex;justify-content:center;}
            `}</style>
        </div>
    )
}
