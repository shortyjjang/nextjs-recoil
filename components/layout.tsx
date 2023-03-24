import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState} from 'react'

type LayoutProps = {
    type: string;
    children: React.ReactNode;
    title?:string;
    action?:Function;
}
type HeaderProps = {
    title: string | undefined;
    type: string
    action:Function | null;
}

const Navigation = () => {
    const [menu, showMenu] = useState<boolean>(false)
    return(
        <>
            <header>
                <button onClick={() => showMenu(!menu)}>Open Menu</button>
                <h1 className="ptit"><Link href="/">MY WALLET</Link></h1>
                <Link href="/">user</Link>
            </header>
            {menu && <ul id="naviation">
                <li><Link href="/" className="home">홈</Link></li>
                <li><Link href="/inout" className="inout">입출금</Link></li>
                <li><Link href="/exchange" className="exchange">교환</Link></li>
                <li><Link href="/staking" className="staking">스테이킹</Link></li>
                <li><Link href="/purchases" className="purchases">거래내역</Link></li>
            </ul>}
        </>
    )
}
const HeaderTitle = ({title, type, action}:HeaderProps) => {
    const router = useRouter()
    return(
        <header>
            {type === 'back' 
                ? <button onClick={() => action? action():router.back()} title="뒤로가기" className='back'><span className="material-symbols-outlined">arrow_back_ios</span></button>
                : <button onClick={() => action? action():router.back()} title="닫기" className='close'><span className="material-symbols-outlined">close</span></button>
            }
            <h1 className="ptit">{title}</h1>
            <style jsx>{`
                .ptit {
                    text-align: center;
                    line-height: 49px;
                    font-size: 17px;
                    font-weight: 500;
                }
                .back, .close {position:absolute;top:0;left:0;height:100%;aspect-ratio:1/1;}
                .close {left:auto;right:0;}
            `}</style>
        </header>
    )
}
export default function Layout({type, children, title, action}:LayoutProps) {
    return (
        <div>
            {type === 'menu' ? <Navigation />
            : <HeaderTitle title={title} type={type} action={action?action:null} />}
            {children}
        </div>
    )
}
