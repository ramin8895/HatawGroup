"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetNewcustomer = () =>
  useQuery({
    queryKey: [cashKey.getnewcustomer],
    queryFn: () => services.GetNewcustomer(),
    refetchOnWindowFocus: false,
    enabled:true
  });

export const useCreateNewcustomer = () =>
  
  useMutation({
    mutationKey: [cashKey.createnewcustomer],
    mutationFn: (data) => services.CreateNewcustomer(data),
    retry: false,


  });
