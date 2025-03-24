import { Gem } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import { Local } from "../services/Local";
import { wait } from "../utils/time";

export const SplashScreen: FC = () => {
  const { checkJWT } = useAuth();
  const navigate = useNavigate();

  useQuery("checkUser", async () => {
    const JWT = await Local.get("JWT");
    await wait(2);
    if (JWT) {
      const { success } = await checkJWT();
      if (success) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  });

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <div className="flex items-center gap-2">
        <Gem color="#163172" className="w-12 h-12" />
        <h1 className="text-3xl font-bold text-[#163172]">Anéis Místicos</h1>
      </div>
      <div
        className="w-8 h-8 border-2 border-solid rounded-full animate-spin mt-5"
        style={{ borderTopColor: "#163172" }}
      ></div>
    </div>
  );
};
