import {ReactNode} from "react";
import {SideBar} from "../../widgets";

export const AdminLayout = (props: { children: ReactNode }) => {

    const {children} = props

    return (
        <div className="grid">
            <div className="col-5 sm:col-6 md:col-4 lg:col-3 p-0" style={{ maxWidth: '300px' }}>
                <SideBar/>
            </div>
            <div className="col-7 sm:col-6 md:col-8 lg:col-9 p-0 pl-4">{children}</div>
        </div>
    );
};