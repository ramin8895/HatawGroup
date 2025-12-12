"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetDefineCategory = () =>
  useQuery({
    queryKey: [cashKey.getdefinecategory],
    queryFn: () => services.GetDefineCategory(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useCreateDefineCategory = () =>
  useMutation({
    mutationKey: [cashKey.createdefinecategory],
    mutationFn: (data) => services.CreateDefineCategory(data),
    retry: false,
  });
