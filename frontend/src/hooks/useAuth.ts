import { useCallback } from "react";
import { SignInVariables, SignUpVariables } from "../types/auth";
import { AuthService } from "../services/AuthService";
import { Local } from "../services/Local";

export const useAuth = () => {
  const signup = useCallback(async (variables: SignUpVariables) => {
    const response = await AuthService.signUp(variables);

    if (response.success) {
      Local.setJWT(response.data.token);
      return { success: true, Message: "Usuário cadastrado com sucesso!" };
    }
    return { success: false, Erro: response.error };
  }, []);

  const signIn = useCallback(async (variables: SignInVariables) => {
    const response = await AuthService.signIn(variables);

    if (response.success) {
      await Local.setJWT(response.data.token);
      return { success: true, Message: "Usuário fez login com sucesso!" };
    }
    return { success: false, Erro: response.error };
  }, []);

  const checkJWT = useCallback(async () => {
    const response = await AuthService.checkJWT();

    if (response.success) {
      return { success: true, data: response.data.user };
    }
    return { success: false };
  }, []);

  return {
    signup,
    signIn,
    checkJWT
  };
};
