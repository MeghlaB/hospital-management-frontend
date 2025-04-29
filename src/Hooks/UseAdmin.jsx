import React from "react";
import UseAuth from "./UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequire from "./UseAxiosSequir";

function UseAdmin() {
  const { user } = UseAuth();
  const axiosSequire = useAxiosSequire();
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosSequire.get(`/users/admin/${user?.email}`);
      console.log(res.data);
      return res?.data?.admin;
    },
  });
  return [isAdmin];
}

export default UseAdmin;
