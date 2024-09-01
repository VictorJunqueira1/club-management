"use client";

import { z } from "zod";
import "@/app/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Importação do useRouter
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    username: z.string().email("Email inválido").min(2, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.string().min(1, "Papel é obrigatório")
});

type FormSchemaType = z.infer<typeof formSchema>;

const Login: React.FC = () => {
    const router = useRouter(); // Inicializa o hook useRouter
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            role: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        // Fazendo a requisição para o backend
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Login bem-sucedido:", data);
                router.push("/");
            })
            .catch((error) => {
                console.error("Erro durante o login:", error);
                // Adicione aqui o tratamento de erros
            });
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side: Login form */}
            <motion.div
                className="flex-1 flex items-center justify-center bg-white text-black p-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs">
                        <div className="mb-4">
                            <h1 className="mb-4 text-4xl font-bold text-center">Login</h1>
                            <p className="text-center text-lg">Faça parte da família Home Adventure!</p>
                        </div>
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira seu email" className="py-5 border border-gray-400 placeholder:text-gray-500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira sua senha" type="password" className="py-5 border border-gray-400 placeholder:text-gray-500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Papel</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full border border-gray-400 py-5">
                                                    <SelectValue placeholder="Selecione seu papel" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="responsable">Pai/Responsável</SelectItem>
                                                    <SelectItem value="director">Diretoria</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" variant={"default"} className="py-5">Entrar</Button>
                    </form>
                </Form>
            </motion.div>

            {/* Right side: Desbravadores Symbol */}
            <motion.div
                className="hidden lg:flex lg:flex-2 lg:bg-blue-600 lg:items-center lg:justify-center lg:p-12"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                        <Image alt="Logo dos Desbravadores" src="/images/logo-desbravadores.png" width={200} height={200} />
                    </div>
                    <p className="text-lg text-center">
                        Unidos em uma missão de aventura e crescimento pessoal.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;