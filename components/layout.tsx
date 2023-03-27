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
                <button onClick={() => showMenu(!menu)} className='btn-menu' title="Open Menu"></button>
                <h1 className="ptit"><Link href="/" style={{display:'flex',alignItems:'center'}}>MY WALLET</Link></h1>
                <Link href="/"><span className="material-symbols-outlined">person</span></Link>
            </header>
            {menu && <ul id="naviation">
                <li><Link href="/" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">home</span>홈</Link></li>
                <li><Link href="/inout" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">sync_alt</span>입출금</Link></li>
                <li><Link href="/exchange" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">currency_exchange</span>교환</Link></li>
                <li><Link href="/staking" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">database</span>스테이킹</Link></li>
                <li><Link href="/purchases" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">article</span>거래내역</Link></li>
            </ul>}
            <style jsx>{`
                header {display:flex;justify-content:space-between;}
                h1 {color:var(--colorPoint);font-weight:800;font-size:1rem;letter-spacing:0.2rem;display:grid;}
                .btn-menu {padding:15px 10px;}
                .btn-menu:before,.btn-menu:after {content:'';display:block;width:17px;height:5px;border:solid #111;border-width:1.5px 0;}
                .btn-menu:after {border-width:0 0 1.5px;}
                .material-symbols-outlined {padding:10px;}
                #naviation {position:fixed;bottom:0;left:0;width:100%;z-index: 10;box-shadow:0 2px 30px rgba(0,0,0,0.2);background:#fff;display:flex;font-size:9px;}
                #naviation li {width:100%;text-align:center;}
                #naviation span {display:block;margin-bottom:-5px;}
                
            `}</style>
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
