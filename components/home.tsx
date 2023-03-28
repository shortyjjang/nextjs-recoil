import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "../states/user";
import Layout from "./layout";
import { changePriceFormat } from "../lib/common";

export default function Home() {
    const user = useRecoilValue(userState)
    return (
        <Layout type="menu">
            <div className="container index">
                <div className="total">
                    <p className="email">{user.email}</p>
                    <p className="amount"><label>Total CHAINDIT</label>
                    <b>{changePriceFormat(Math.ceil(user.total))}</b>{user.total - Math.ceil(user.total) !== 0 ? (user.total - Math.ceil(user.total)).toString().replace('0.','.') :''} CDT{" "}
                    <span className="more"><Link href="total.html">more</Link></span></p>
                </div>
                <ul className="menu">
                    <li><Link href="send.html"><span>보내기 <i className="material-symbols-outlined">upload</i></span></Link></li>
                    <li><Link href="receive.html"><span>받기 <i className="material-symbols-outlined">download</i></span></Link></li>
                </ul>
            </div>
            <style jsx>{`
            
                .index {max-width:300px;margin:0 auto;}
                .index .total {position:relative;box-shadow:0 9px 11px rgba(0,0,0,0.13);overflow:hidden;padding:24px;border-radius:9px;background:var(--colorPoint);color:#fff;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:1/0.6}
                .index .total .email {position:relative;font-size:12px;}
                .index .total .more {display:inline-block;padding:5px;vertical-align:baseline;font-size:9px;display:inline-block;line-height:14px;padding:0 10px;background:rgba(0,0,0,0.3);border-radius:7px;color:#fff;}
                .total {color:#fff;background:#4876ef;border-radius:4px;padding:17px;}
                .total label {display:block;font-size:12px;font-weight:bold;text-align:left;}
                .total b {font-size:23px;}                
                .index .menu {padding-top:36px;}
                .index .menu span {position:relative;color:#1b1b1b;display:flex;font-weight:500;padding:14px 20px;border:1px solid #848484;border-radius:3px;justify-content:space-between;align-items:center;}
                .index .menu i {color:var(--colorPoint)}
                .index .menu li+li {margin-top:10px;}
                .index [name="pin"]+.btn-submit {margin-top:15px;}

            `}</style>
        </Layout>
    )
}
