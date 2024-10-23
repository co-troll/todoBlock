import { useRouter } from "next/router";
import instance from "../instance";
import { useQuery } from "@tanstack/react-query";

const UserCheck = () => {
    const router = useRouter();
  const getTodoList = useQuery({
    queryKey: ['usercheck'],
    queryFn: async () => {
        const response = await instance({
          method: "get",
          url: 'users/getuid'
        });
        return true
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  if (getTodoList.isError) 
    router.push("/login");
}

export default UserCheck;