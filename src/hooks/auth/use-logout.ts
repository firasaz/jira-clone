import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const res = await client.api.auth.logout["$post"]();
      return await res.json();
    },
    // refetch the client data to clear the session data in the frontend
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });

  return mutation;
};
