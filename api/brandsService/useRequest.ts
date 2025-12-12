"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetBrands = () =>
  useQuery({
    queryKey: [cashKey.getbrands],
    queryFn: () => services.Getbrands(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useCreatebrands = () =>
  useMutation({
    mutationKey: [cashKey.createbrands],
    mutationFn: (data) => services.Createbrands(data),
    retry: false,
  });
