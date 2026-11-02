import type { MoyaLook, MoyaMood } from "../../../types/moya";

import defaultGreeting from "../../../assets/images/moya/default/moya_greeting.png";
import defaultExplain from "../../../assets/images/moya/default/moya_explain.png";
import defaultCurious from "../../../assets/images/moya/default/moya_curious.png";
import defaultConfused from "../../../assets/images/moya/default/moya_confused.png";
import defaultExcited from "../../../assets/images/moya/default/moya_excited.png";

import carGreeting from "../../../assets/images/moya/car/moya_car_greeting.png";
import carExplain from "../../../assets/images/moya/car/moya_car_explain.png";
import carCurious from "../../../assets/images/moya/car/moya_car_curious.png";
import carConfused from "../../../assets/images/moya/car/moya_car_confused.png";
import carExcited from "../../../assets/images/moya/car/moya_car_excited.png";

import princessGreeting from "../../../assets/images/moya/princess/moya_princess_greeting.png";
import princessExplain from "../../../assets/images/moya/princess/moya_princess_explain.png";
import princessCurious from "../../../assets/images/moya/princess/moya_princess_curious.png";
import princessConfused from "../../../assets/images/moya/princess/moya_princess_confused.png";
import princessExcited from "../../../assets/images/moya/princess/moya_princess_excited.png";

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
