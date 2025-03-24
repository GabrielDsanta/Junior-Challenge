import Toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Nome é obrigatório"),
  breed: z.enum(["elf", "man", "sauron", "dwarf"], {
    message: "Raça inválida",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function Login() {
  const navigate = useNavigate();
  const { signIn, signup } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
  });

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    reset();
  };

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { success } = await signIn({
        email: data.email,
        password: data.password,
      });
      if (success) {
        Toast.success("Usuário autenticado com sucesso!");
        navigate("/home");
      } else {
        Toast.error("E-mail e/ou senha inválidos");
      }
    } catch (error) {
      Toast.error("Erro ao autenticar");
    }
  };

  const handleRegister: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const { success } = await signup({
        email: data.email,
        password: data.password,
        breed: data.breed,
        name: data.name,
      });
      if (success) {
        Toast.success("Usuário registrado com sucesso!");
        navigate("/home");
      } else {
        Toast.error("Erro ao registrar");
      }
    } catch (error) {
      Toast.error("Erro ao registrar");
    }
  };

  const onSubmit: SubmitHandler<LoginFormData | RegisterFormData> = (data) => {
    if (isRegistering) {
      handleRegister(data as RegisterFormData);
    } else {
      handleLogin(data as LoginFormData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" />

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Cadastro" : "Login"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.root && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.root.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Raça
              </label>
              <select
                {...register("breed")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Selecione uma raça
                </option>
                <option value="elf">Elfo</option>
                <option value="dwarf">Anão</option>
                <option value="man">Humano</option>
                <option value="sauron">Sauron</option>
              </select>
              {errors.root && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.root.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isRegistering ? "Registrar" : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegistering ? "Já tem uma conta? " : "Ainda não tem uma conta? "}
          <button
            onClick={toggleForm}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {isRegistering ? "Faça login" : "Registre-se"}
          </button>
        </p>
      </div>
    </div>
  );
}
