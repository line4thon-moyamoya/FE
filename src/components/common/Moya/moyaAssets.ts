import type { MoyaLook, MoyaMood } from "../../../types/moya";

import defaultGreeting from "../../../assets/images/moya/default/moya_greeting.webp";
import defaultExplain from "../../../assets/images/moya/default/moya_explain.webp";
import defaultCurious from "../../../assets/images/moya/default/moya_curious.webp";
import defaultConfused from "../../../assets/images/moya/default/moya_confused.webp";
import defaultExcited from "../../../assets/images/moya/default/moya_excited.webp";

import carGreeting from "../../../assets/images/moya/car/moya_car_greeting.webp";
import carExplain from "../../../assets/images/moya/car/moya_car_explain.webp";
import carCurious from "../../../assets/images/moya/car/moya_car_curious.webp";
import carConfused from "../../../assets/images/moya/car/moya_car_confused.webp";
import carExcited from "../../../assets/images/moya/car/moya_car_excited.webp";

import princessGreeting from "../../../assets/images/moya/princess/moya_princess_greeting.webp";
import princessExplain from "../../../assets/images/moya/princess/moya_princess_explain.webp";
import princessCurious from "../../../assets/images/moya/princess/moya_princess_curious.webp";
import princessConfused from "../../../assets/images/moya/princess/moya_princess_confused.webp";
import princessExcited from "../../../assets/images/moya/princess/moya_princess_excited.webp";

export const MOYA_IMAGES: Record<MoyaLook, Record<MoyaMood, string>> = {
  default: {
    greeting: defaultGreeting,
    explain: defaultExplain,
    curious: defaultCurious,
    confused: defaultConfused,
    excited: defaultExcited,
  },
  car: {
    greeting: carGreeting,
    explain: carExplain,
    curious: carCurious,
    confused: carConfused,
    excited: carExcited,
  },
  princess: {
    greeting: princessGreeting,
    explain: princessExplain,
    curious: princessCurious,
    confused: princessConfused,
    excited: princessExcited,
  },
};

export const MOYA_ALT: Record<MoyaMood, string> = {
  greeting: "인사하는 모야",
  explain: "설명하는 모야",
  curious: "궁금해하는 모야",
  confused: "당황한 모야",
  excited: "신난 모야",
};
