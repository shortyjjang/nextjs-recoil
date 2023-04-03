import { useState } from "react";

type MenuType = {
    title: string;
    component: React.ReactElement
}

type TabProps = {
    menu: MenuType[],
    defaultTab?:number
}

export default function Tab({menu, defaultTab}:TabProps) {
    const [activeTab, setActiveTab] = useState(defaultTab ? defaultTab : 0)
    return (
        <div className="tab-container">
            <div className="tab">{menu.map((m,idx) => <button key={`tab${idx}`} className={activeTab === idx ? 'current' : ''} onClick={() => setActiveTab(idx)}>{m.title}</button>)}</div>
            {menu[activeTab].component}
            <style jsx>{`
                .tab-container {padding-top:50px;}
                .tab {position:fixed;background:#fff;top:50px;left:0;width:100%;border-bottom:1px solid #e6e8ec;z-index: 9;display:flex;}
                .tab button {width:100%;color:var(--colorDeepGray);height:49px;text-align:center;}
                .tab button.current {box-shadow:inset 0 -2px 0 var(--colorPoint),0 1px 0 var(--colorPoint);color:var(--colorDarkGray);}
            `}</style>
        </div>
    )
}
