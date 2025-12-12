"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";
import { DeletePersonel } from "@/api/personelService/service";

export const useGetPersonel = (data: any) =>
  useQuery({
    queryKey: [cashKey.getpersonel],
    queryFn: () => services.GetPersonel(data),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });
export const useGetShiftPersonel = (data: any) =>
  useQuery({
    queryKey: [cashKey.getshiftpersonel, data],
    queryFn: () => services.GetShiftPersonel(data),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });

export const useCreatePersonel = (data: {
  name_personel: any;
  service_job: any;
  id_dist: any;
}) =>
  useMutation({
    mutationKey: [cashKey.createpersonel],
    mutationFn: () => services.CreatePersonel(data),
  });
export const useDeletePersonel = (data: { id_personel: any; id_dist: any }) =>
  useMutation({
    mutationKey: [cashKey.deletespersonal],
    mutationFn: () => services.DeletePersonel(data),
  });

export const useUpdateShiftPersonel = (data: {
  working_times: any;
  id_dist: number;
  id_personel: number;
}) =>
  useMutation({
    mutationKey: [cashKey.updateshiftpersonel],
    mutationFn: () => services.UpdateShiftPersonel(data),
  });
