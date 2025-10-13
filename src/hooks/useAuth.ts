import useSWRMutation from "swr/mutation";
import { GetRequest, PostRequest } from "@/lib/fetcher";
import { API_URL } from "@/lib/config";



export function useLogin() {
  return useSWRMutation(`${API_URL}/auth/login`, PostRequest);
}

export function useSignup() {
  return useSWRMutation(`${API_URL}/auth/signup`, PostRequest);
}

export function useLogout() {
  return useSWRMutation(`${API_URL}/auth/logout`, GetRequest);
}

export function useVerifyEmail() {
  return useSWRMutation(`${API_URL}/auth/verify-email`, PostRequest);
}

export function useResendVerification() {
  return useSWRMutation(`${API_URL}/auth/resend-verification`, PostRequest);
}

export function useUpdatePassword(){
  return useSWRMutation(`${API_URL}/auth/update-password`, PostRequest);
}