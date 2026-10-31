import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton/BackButton";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <BackButton />
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
        <Button text="로그인" onClick={() => navigate("/home")} />
      </div>
    </div>
  );
}
