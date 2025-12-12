"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetServiceList = (data: any) =>
  useQuery({
    queryKey: [cashKey.getservicelist],
    queryFn: () => services.GetServiceList(data),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });

export const useCreateServiceList = (data: {
  title: string;
  id_dist: number;
}) =>
  useMutation({
    mutationKey: [cashKey.createservicelist],
    mutationFn: () => services.CreateServiceList(data),
  });

export const useUpdateServiceList = () =>
  useMutation({
    mutationKey: [cashKey.updateservicelist],
    mutationFn: (data) => services.UpdateServiceList(data),
  });

// service Sub
export const useGetSubServiceList = (data: {
  id_dist: any;
  code_service: any;
}) =>
  useQuery({
    queryKey: [cashKey.getsubservicelist],
    queryFn: () => services.GetSubServiceList(data),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });
export const useCreateSubServiceList = () =>
  useMutation({
    mutationKey: [cashKey.createsubservice],
    mutationFn: (formData: any) => services.CreateSubServiceList(formData),
  });

export const useDeleteServiceList = (data: {
  codeService: string;
  id_dist: number;
}) =>
  useMutation({
    mutationKey: [cashKey.deleteservicelist],
    mutationFn: () => services.DeleteServiceList(data),
  });
