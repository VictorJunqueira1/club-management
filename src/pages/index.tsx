import DirectorPanel from "@/components/layouts/DirectorPanel";
import ViewerPanel from "@/components/layouts/ViewerPanel";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const Home = () => {
    const [userRole, setUserRole] = useState<"director" | "viewer">('director')

    return (
        <>
            <Sidebar />
            {userRole === "director" ? <DirectorPanel /> : <ViewerPanel />}
        </>
    );
}

export default Home;