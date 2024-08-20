import DirectorPanel from "@/components/layouts/DirectorPanel";
import ViewerPanel from "@/components/layouts/ViewerPanel";
import { useState } from "react";

const Home = () => {
    const [userRole, setUserRole] = useState<"director" | "viewer">('director')

    return userRole === "director" ? <DirectorPanel /> : <ViewerPanel />
}

export default Home;