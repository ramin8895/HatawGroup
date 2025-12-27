"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";
import { GetuserDetail } from "./service";

export const useGetuserList = () =>
  useQuery({
    queryKey: [cashKey.getnewcustomer],
    queryFn: () => services.GetuserList(),
    refetchOnWindowFocus: false,
    enabled: true,
  });
export const useGetuserDetail = (Id?: string) =>
  useQuery({
    queryKey: [cashKey.getnewcustomer, Id],
    queryFn: () => GetuserDetail(Id!),
    enabled: !!Id, // فقط وقتی Id موجوده اجرا شه
    refetchOnWindowFocus: false,
  });;

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
    mutationFn: (data: any) => services.UpdateUserRoleEdit(data),
    retry: false,
  });
