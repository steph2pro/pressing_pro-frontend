import Interest from "./Interest";
import UserPorps from "./User";

type UserInterest = {
    userId: number;
    interestId: number;
    user?: UserPorps;
    interest?: Interest;
}

export default UserInterest;