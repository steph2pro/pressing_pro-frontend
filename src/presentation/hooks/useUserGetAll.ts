
import { useGetAllUsers } from "../../domain/usecases/users/useUserGetAll";
import UserApi from '../../data/datasources/UserApi';

function useUserGetAll() {
  const userApi = new UserApi()
  const userQuery = useGetAllUsers(userApi);
console.log("userQuery", userQuery);
  return {
    userQuery,
  };
}

export default useUserGetAll;
