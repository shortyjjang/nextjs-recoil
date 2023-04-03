import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

type LayoutProps = {
    type: string;
    children: React.ReactNode;
    title?:string;
    action?:Function;
}
export default function Layout({type, children, title, action}:LayoutProps) {
    const router = useRouter()
    return (
        <>
        <header>
            {type !== 'menu' ? <button 
                onClick={() => action? action():router.back()}
                className={type === 'back' ? 'back': 'close'}
                title={type === 'back' ? '뒤로가기': '닫기'}
            >
                {type === 'back' ? <span className="material-symbols-outlined">arrow_back_ios</span>: <span className="material-symbols-outlined">close</span>}
            </button>
            :<button></button>}
            <h1 className="ptit">{title ? title :<Link href="/" style={{display:'flex',alignItems:'center'}}><span className="logo">MY WALLET</span></Link>}</h1>
            <Link href="/mypage"><span className="material-symbols-outlined mypage">person</span></Link>
            <Head>
                <title>{title ? `${title} - MyWallet`:'MyWallet'}</title>
            </Head>
        </header>
        <div>{children}</div>
        {type === 'menu' && <ul id="naviation">
            <li><Link href="/" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">home</span>홈</Link></li>
            <li><Link href="/inout" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">sync_alt</span>입출금</Link></li>
            <li><Link href="/exchange" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">currency_exchange</span>교환</Link></li>
            <li><Link href="/staking" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">database</span>스테이킹</Link></li>
            <li><Link href="/purchases" style={{paddingBottom: '10px', display: 'block'}}><span className="material-symbols-outlined">article</span>거래내역</Link></li>
        </ul>}
        <style jsx>{`
            header {display:flex;justify-content:space-between;}
            .logo {color:var(--colorPoint);font-weight:800;font-size:1rem;letter-spacing:0.2rem;display:grid;}
            button {aspect-ratio:1/1;width:49px;}
            .back span, .close span {font-size:18px;}
            .mypage {display:flex;aspect-ratio:1/1;width:49px;align-items:center;justify-content:center;}
            #naviation {position:fixed;bottom:0;left:0;width:100%;z-index: 10;box-shadow:0 2px 30px rgba(0,0,0,0.2);background:#fff;display:flex;font-size:9px;}
            #naviation li {width:100%;text-align:center;}
            #naviation span {display:block;padding:10px 0 5px;}
            .ptit {
                text-align: center;
                line-height: 49px;
                font-size: 17px;
                font-weight: 500;
            }
            div {padding:70px 20px 0;}
        `}</style>
        </>
    )
}
