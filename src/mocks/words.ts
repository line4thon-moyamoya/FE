import type { Word } from "../types/word";
import savings from "../assets/icons/words/savings.svg";
import bankbook from "../assets/icons/words/bankbook.svg";
import receipt from "../assets/icons/words/receipt.svg";
import fireTruck from "../assets/icons/words/fire-truck.svg";
import courage from "../assets/icons/words/courage.svg";
import recycling from "../assets/icons/words/recycling.svg";

export const MOCK_WORDS: Word[] = [
  {
    id: "savings",
    word: "적금",
    image: savings,
    bgColor: "#FFE4EC",
    meaning: "돈을 정해진 날마다 조금씩 모으는 거야.",
  },
  {
    id: "bankbook",
    word: "통장",
    image: bankbook,
    bgColor: "#EEEAFF",
    meaning: "은행에 맡긴 돈이 얼마인지 적어 두는 작은 책이야.",
  },
  {
    id: "receipt",
    word: "영수증",
    image: receipt,
    bgColor: "#E3F5D6",
    meaning: "물건을 산 내용과 값을 적어 주는 종이야.",
  },
  {
    id: "fire-truck",
    word: "소방차",
    image: fireTruck,
    bgColor: "#E3EEFF",
    meaning: "불을 끄러 달려가는 자동차야.",
  },
  {
    id: "courage",
    word: "용기",
    image: courage,
    bgColor: "#FFF2C7",
    meaning: "무섭거나 어려워도 해 보려는 씩씩한 마음이야.",
  },
  {
    id: "reuse",
    word: "재활용",
    image: recycling,
    bgColor: "#E3F5D6",
    meaning: "다 쓴 물건을 다시 쓸 수 있게 만드는 거야.",
  },
];

export const findWord = (id: string) => MOCK_WORDS.find((w) => w.id === id);
