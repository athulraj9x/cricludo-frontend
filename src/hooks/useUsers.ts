import useSWRMutation from "swr/mutation";
import { GetRequest } from "@/lib/fetcher";
import { API_URL } from "@/lib/config";



export function useMasterAgentsByAdmin() {
  return useSWRMutation(`${API_URL}/user/types`, GetRequest);
}

export function useAgentsByMaster(masterId:string) {
  return useSWRMutation(`${API_URL}/user/agents?masterId=${masterId}`, GetRequest);
}
