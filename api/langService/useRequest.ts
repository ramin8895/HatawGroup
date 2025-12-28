"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetlang = () =>
  useQuery({
    queryKey: [cashKey.getlang],
    queryFn: () => services.GetLangList(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useGetlangById = (id?: number) => {
  return useQuery({
    queryKey: ["get-lang-by-id", id],
    queryFn: () => services.GetLangGetById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateLang = () =>
  useMutation({
    mutationKey: [cashKey.createlang],
    mutationFn: (data: any) => services.Createlang(data),
    retry: false,
  });

export const useUpdateLang = () =>
  useMutation({
    mutationKey: [cashKey.updatelang],
    mutationFn: (id: any, data: any) => services.UpdateLang(id, data),
    retry: false,
  });

export const useDeleteLang = (id?: number) =>
  useQuery({
    queryKey: [cashKey.deletelang],
    queryFn: () => services.DeleteLangGetById(id),
    refetchOnWindowFocus: false,
    enabled: id != undefined,
  });
