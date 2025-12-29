"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetEventUser = (id: any) =>
  useQuery({
    queryKey: [cashKey.getevent],
    queryFn: () => services.GetEventUser(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });


export const useAddEventUser = () => {
  return useMutation({
    mutationFn: (data: { codeEvent: string }) => services.AddEventUser(data),
    // onSuccess: () => { ... }
  });
};