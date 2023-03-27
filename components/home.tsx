import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "../states/user";
import Layout from "./layout";

export default function Home() {
    const user = useRecoilValue(userState)
    return (
        <Layout type="menu">
            <div className="container index">
                <div className="total">
                    <p className="email">{user.email}</p>
                    <p className="amount"><label>Total CHAINDIT</label>
                    <b>957,120.</b>5784 CDT
                    <Link href="total.html"><span className="more"><span>more</span></span></Link></p>
                </div>
                <ul className="menu">
                    <li><Link href="send.html"><span className="send">보내기</span></Link></li>
                    <li><Link href="receive.html"><span className="receive">받기</span></Link></li>
                </ul>
            </div>
            <style jsx>{`
            
                .index {max-width:300px;margin:0 auto;}
                .index .total {position:relative;box-shadow:0 9px 11px rgba(0,0,0,0.13);overflow:hidden;padding:24px;border-radius:9px;}
                .index .total:before {content:'';position:absolute;top:-15px;left:-25px;background:url('../images/logo-simbol.png') no-repeat;width:302px;height:138px;background-size:contain;opacity:0.1;}
                .index .total .email {position:relative;font-size:12px;margin-bottom:64px;}
                .index .total .more {display:inline-block;padding:5px;vertical-align:middle;}
                .index .total .more span {font-size:9px;display:inline-block;line-height:14px;padding:0 10px;background:rgba(0,0,0,0.3);border-radius:7px;color:#fff;}
                .index .menu {padding-top:36px;}
                .index .menu span {position:relative;color:#1b1b1b;display:block;font-weight:500;padding:14px 40px 14px 20px;border:1px solid #848484;border-radius:3px;}
                .index .menu span:before {content:'';position:absolute;top:50%;right:19px;margin-top:-9px;height:16px;width:20px;background:no-repeat 50% 50%;background-size:contain;}
                .index .menu span.send:before {background-image:url('../images/ic-send.png');}
                .index .menu span.receive:before {background-image:url('../images/ic-receive.png');}
                .index .menu li+li {margin-top:10px;}
                .index [name="pin"]+.btn-submit {margin-top:15px;}

            `}</style>
        </Layout>
    )
}
