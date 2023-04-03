import { useState } from "react";
import Layout from "../components/layout";
import Tab from "../components/tab";
import PopupContainer from "../components/popup";

export default function Staking() {
    const [showPopup, setShowPopup] = useState<boolean>(false)
    return (
        <Layout type="back" title="스테이킹">
            <Tab menu={[
                {
                    title: '상품목록',
                    component: <ul className="staking-list">
                    <li className="staking-item">
                        <h3>Platinum</h3>
                        <p>최소수량 <b className="value">200 PAN</b></p>
                        <p>스테이킹기간 <b className="value">730일</b></p>
                        <p className="rate">만기 이자율 <b className="value">54%</b></p>
                        <p className="fee">해지 수수료 <b className="value">-54%</b></p>
                        <button className="btn-submit" onClick={() => setShowPopup(true)}>신청</button>
                    </li>
                    <li className="staking-item">
                        <h3>GOLD(24개월)</h3>
                        <p>최소수량 <b className="value">200 PAN</b></p>
                        <p>스테이킹기간 <b className="value">730일</b></p>
                        <p className="rate">만기 이자율 <b className="value">54%</b></p>
                        <p className="fee">해지 수수료 <b className="value">-54%</b></p>
                        <button className="btn-submit" data-type="gold">신청</button>
                    </li>
                    <li className="staking-item">
                        <h3>BRONZE(12개월)</h3>
                        <p>최소수량 <b className="value">100 PAN</b></p>
                        <p>스테이킹기간 <b className="value">360일</b></p>
                        <p className="rate">만기 이자율 <b className="value">20%</b></p>
                        <p className="fee">해지 수수료 <b className="value">-20%</b></p>
                        <button className="btn-submit" data-type="bronze">신청</button>
                    </li>
                    <li className="staking-item">
                        <h3>SILVER(6개월)</h3>
                        <p>최소수량 <b className="value">50 PAN</b></p>
                        <p>스테이킹기간 <b className="value">180일</b></p>
                        <p className="rate">만기 이자율 <b className="value">10%</b></p>
                        <p className="fee">해지 수수료 <b className="value">-10%</b></p>
                        <button className="btn-submit" data-type="silver">신청</button>
                    </li>
                </ul>
                },
                {
                    title: '가입정보',
                    component: <ul className="staking-detail">
                    <li className="staking-item">
                        <h3>GOLD(24개월) <small>(Basic Interest 18.88%+Double preminum 5%)</small></h3>
                        <p>신청수량 <b className="value">200 CDT</b></p>
                        <p>신청일 <span className="value">2020-06-04</span></p>
                        <p>만기일 <span className="value">2020-09-02</span></p>
                        <p className="rate">만기 이자율 <b className="value">5%</b></p>
                        <p>총 수령액 <b className="value">200 CDT</b></p>
                        <p className="rate">오늘까지 이자 <b className="value">12.0000 CDT</b></p>
                        <p className="fee">해지 수수료 <b className="value">-5%</b></p>
                        <p>해지시 입금수량 <b className="value">95.0000 CDT</b></p>
                        <button className="btn-submit">해지</button>
                    </li>
                </ul>
                }
            ]}></Tab>
            {showPopup && <PopupContainer 
                title="스테이킹 신청" 
                setShow={(visible:boolean) => setShowPopup(visible)}
                footer={[
                    {
                        title: '취소',
                        className: 'btn-cancel',
                    },
                    {
                        title: '신청하기',
                        className: 'btn-submit',
                    }
                ]}
                action={() => {
                }}
            >
                    <div className="staking-list">
                        <h3>Platinum <small>(Basic Interest 18.88%+Double preminum 5%)</small></h3>
                        <p>최소수량 <b className="value">200 PAN</b></p>
                        <p>스테이킹기간 <b className="value">730일</b></p>
                        <p className="rate">만기 이자율 <b className="value">54%</b></p>
                        <p className="fee">해지 수수료 <b className="value">-54%</b></p>
                    </div>
                    <div className="frm">
                        <input type="text" className="text" placeholder="스테이킹 수량(CDT)" />
                        <small className="comment">신청가능 수량: 487,2347.000 CDT</small>
                    </div>
            </PopupContainer>}
            <style jsx>{`
                .staking-item {position:relative;padding:19px 16px 70px;border:1px solid #d7d7d7;border-radius:3px;}
                .staking-item+.staking-item {margin-top:12px;}
                .staking-item .btn-submit {width:calc(100% - 32px);position:absolute;bottom:16px;left:16px;height:36px;}
                .staking-list p, .staking-item p {position:relative;font-size:12px;line-height:20px;color:#707070;padding-left:10px;}
                .staking-list p:after, .staking-item p:after {content:'';clear:both;display:block;}
                .staking-list p:before, .staking-item p:before {content:'';position:absolute;top:50%;left:2px;width:3px;height:3px;border-radius:100%;background:#707070;margin-top:-2px;}
                .staking-list .value, .staking-item .value {float:right;color:#4876ef;}
                .staking-list .rate b, .staking-item .rate b {color:#ff0100;}
                .staking-list .fee b, .staking-item .fee b {color:#2e3092;}
                .staking-list h3, .staking-item h3 {font-size:13px;font-weight:500;padding-bottom:10px;}
                .staking-list h3 small, .staking-item h3 small {font-size:12px;display:block;font-weight:300;}
                .frm {margin-top:20px;}
                .frm input {width:100%;}
            `}</style>
        </Layout>
    )
}
