"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetEventUser = () =>
  useQuery({
    queryKey: [cashKey.getevent],
    queryFn: (id) => services.GetEventUser(id),
    refetchOnWindowFocus: false,
    enabled: true,
  });
