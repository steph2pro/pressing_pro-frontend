
import { useQuery } from "@tanstack/react-query";
import UserApi from "../../../data/datasources/UserApi";

export const useGetAllUsers = (userApi: UserApi) => {
  const query = useQuery({
      queryKey: ['allusers'],
      queryFn: userApi.fetchUsers,
    });
  return query;
};
