// src/pages/auth/SignupPage.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const signupSchema = z.object({
  name: z.string().min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  function handleSignup(data: SignupFormData) {
    console.log("Dados do Cadastro:", data);
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-cyan-500">Plenno</h1>
      <h2 className="text-2xl font-bold text-center text-gray-800">Crie sua conta</h2>

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo</label>
          <input id="name" type="text" {...register("name")} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
          <input id="email" type="email" {...register("email")} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
          <input id="password" type="password" {...register("password")} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500" />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full py-3 font-semibold text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors">
          Criar Conta
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Já tem uma conta?{" "}
        <Link to="/login" className="font-medium text-cyan-500 hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
