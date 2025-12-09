import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      // we don't wrap the function with try/catch since request above is using "fetch"
      // which does not return an error in the catch block so we need to check as shown below
      if (!response.ok) return null;

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
