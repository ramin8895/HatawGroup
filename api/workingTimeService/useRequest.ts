"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";
import { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}
export const useGetWorkingTime = (id_dist: number) =>
  useQuery({
    queryKey: [cashKey.getworkingtime],
    queryFn: () => services.GetWorkingTime(id_dist),
    refetchOnWindowFocus: false,
    enabled: !!id_dist || false,
  });

export const useCreateWorkingTime = (
  data: {
    working_times: any;
    id_dist: number;
  },
  options?: {
    onSuccess?: () => void;
    onError?: (error: AxiosError<ErrorResponse>) => void;
  }
) =>
  useMutation({
    mutationKey: [cashKey.updateworkingtime],
    mutationFn: () => services.CreateWorkingTime(data),
    ...options,
    retry: false,
  });
