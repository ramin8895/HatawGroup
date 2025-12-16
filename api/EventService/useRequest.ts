"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetEvents = () =>
  useQuery({
    queryKey: [cashKey.getevent],
    queryFn: () => services.GetEvents(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useCreateEvents = () =>
  useMutation({
    mutationKey: [cashKey.createevent],
    mutationFn: (data:EventType) => services.CreateEvents(data),
    retry: false,
  });
