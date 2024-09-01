import { useState, useEffect } from "react";
import DirectorPanel from "@/components/layouts/DirectorPanel";
import ViewerPanel from "@/components/layouts/ViewerPanel";

const Home = () => {
    const [userRole, setUserRole] = useState<"director" | "viewer">('viewer'); // Inicializa como null

    useEffect(() => {
        // Função para buscar o papel do usuário do backend
        const fetchUserRole = async () => {
            try {
                const response = await fetch("http://localhost:3000/userRole", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Inclui cookies na requisição, se necessário
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar o papel do usuário");
                }

                const data = await response.json();
                setUserRole(data.role); // Atualiza o estado com o papel recebido do backend
            } catch (error) {
                console.error("Erro ao buscar o papel do usuário:", error);
            }
        };

        fetchUserRole();
    }, []);

    // Renderiza o painel apropriado com base no papel do usuário
    return userRole === "director" ? <DirectorPanel /> : <ViewerPanel />;
};

export default Home;
