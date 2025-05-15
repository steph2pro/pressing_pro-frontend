import Course from "./Cours";
import UserPorps from "./User";

type UserCourse = {
    
    id: number;
    userId: number;
    courseId: number;
    progress: number;
    status: string;
    user?: UserPorps;
    course?: Course;
}

export default UserCourse;