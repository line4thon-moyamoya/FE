import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/common/BackButton/BackButton";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { login } from "../../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingRef = useRef(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isSubmittingRef.current) return;

    if (!email.trim() || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    isSubmittingRef.current = true;
    setIsLoading(true);

    try {
      const result = await login(email, password);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("childId", String(result.selectedChildId));
      navigate("/home");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;
      alert(message ?? "로그인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex pt-15 pl-6">
        <BackButton />
      </div>

      <div className="flex flex-col pl-6">
        <p className="text-2xl font-normal font-jua leading-9 text-[#241F48] mt-6">
          다시 만나서 반가워요
        </p>
        {/* 입력창 */}
        <div className="flex flex-col gap-4 mt-6 mb-[387px]">
          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="이메일을 입력해주세요."
          />
          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <Button
          text={isLoading ? "로그인 중..." : "로그인"}
          onClick={handleLogin}
        />
      </div>
    </div>
  );
}
