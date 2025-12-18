"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetCurrentReservations = (data: { id_dist: any; date?: any }) =>
  useQuery({
    queryKey: [cashKey.getblog],
    queryFn: () => services.GetCurrentReservations(data),
    refetchOnWindowFocus: false,
    enabled: !!data.id_dist || false,
  });

export const useUpdateCurrentReservation = (data: {
  isActive: any;
  id_dist: any;
  id: any;
}) =>
  useMutation({
    mutationKey: [cashKey.updateblog],
    mutationFn: () => services.PutCurrentReservations(data),
  });
