"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetuserList = () =>
  useQuery({
    queryKey: [cashKey.getnewcustomer],
    queryFn: () => services.GetuserList(),
    refetchOnWindowFocus: false,
    enabled:true
  });
export const useGetRoleList = () =>
  useQuery({
    queryKey: [cashKey.getneRole],
    queryFn: () => services.GetRoleList(),
  });

export const useCreateNewcustomer = () =>
  
  useMutation({
    mutationKey: [cashKey.createnewcustomer],
    mutationFn: (data) => services.CreateNewcustomer(data),
    retry: false,


  });
export const useUpdateUserRoleEdit = () =>
  
  useMutation({
    mutationKey: [cashKey.updateUpdateUserRoleEdit],
    mutationFn: (data:any) => services.UpdateUserRoleEdit(data),
    retry: false,


  });
