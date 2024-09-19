import { useState, useEffect } from "react";
import DirectorPanel from "@/components/layouts/DirectorPanel";
import ViewerPanel from "@/components/layouts/ViewerPanel";

const Home = () => {
    const [userRole, setUserRole] = useState<"director" | "viewer">('viewer'); // Inicializa como "viewer"
    const [email, setEmail] = useState<string | null>(null); // Estado para armazenar o nome de usuário

    useEffect(() => {
        // Função para buscar o nome de usuário (por exemplo, de um estado global, auth ou localStorage)
        const fetchemail = () => {
            // Aqui você pode buscar o nome de usuário de onde ele está armazenado (localStorage, autenticação, etc.)
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        };

        fetchemail();
    }, []);

    useEffect(() => {
        // Função para buscar o papel do usuário do backend
        const fetchUserRole = async (email: string) => {
            try {
                const response = await fetch("http://localhost:8000/userRole", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }), // Envia o nome de usuário no corpo da requisição
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

        // Só faz a requisição se o nome de usuário estiver disponível
        if (email) {
            fetchUserRole(email);
        }
    }, [email]); // Dependência no username para fazer a requisição

    // Renderiza o painel apropriado com base no papel do usuário
    return userRole === "director" ? <DirectorPanel /> : <ViewerPanel />;
};

export default Home;