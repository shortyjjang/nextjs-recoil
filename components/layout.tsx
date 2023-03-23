import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState} from 'react'

type LayoutProps = {
    type: string;
    children: React.ReactNode;
    title:string | undefined;
}
type HeaderProps = {
    title: string | undefined;
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
const HeaderTitle = ({title}:HeaderProps) => {
    const router = useRouter()
    return(
        <header>
            <button onClick={() => router.back()}>Back</button>
            <h1 className="ptit">{title}</h1>
        </header>
    )
}
export default function Layout({type, children, title}:LayoutProps) {
    return (
        <div>
            {type === 'menu' ? <Navigation />
            : <HeaderTitle title={title}/>}
            {children}
        </div>
    )
}
