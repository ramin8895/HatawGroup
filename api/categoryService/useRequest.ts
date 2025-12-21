"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetCategory = () =>
  useQuery({
    queryKey: [cashKey.getdefinecategory],
    queryFn: () => services.GetCategory(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useCreateCategory = () =>
  useMutation({
    mutationKey: [cashKey.createdefinecategory],
    mutationFn: (data) => services.CreateCategory(data),
    retry: false,
  });

export const useUpdateCategory = () =>
  useMutation({
    mutationKey: [cashKey.updatedefinecategory],
    mutationFn: (data) => services.CreateUpdate(data),
    retry: false,
  });

export const useDeleteCategory = (id?:number) =>
  useQuery({
    queryKey: [cashKey.deletedefinecategory],
    queryFn: () => services.DeleteCategory(id),
    refetchOnWindowFocus: false,
    enabled: id != undefined,
  });
