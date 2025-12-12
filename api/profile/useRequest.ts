"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

// export const useGetNewcustomer = () =>
//   useQuery({
//     queryKey: [cashKey.getnewcustomer],
//     queryFn: () => services.GetNewcustomer(),
//     refetchOnWindowFocus: false,
//     enabled:true
//   });

export const useUploadImage = () =>
  useMutation({
    mutationKey: [cashKey.updateprofileImage],
    mutationFn: (formData: FormData) => services.PutUpdateUserIamge(formData),
  });
export const useUploadHeaderImage = () =>
  useMutation({
    mutationKey: [cashKey.updateheaderImage],
    mutationFn: (formData: FormData) => services.PutImageHeader(formData),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationKey: [cashKey.updateprofile],
    mutationFn: (data: any) => services.PutUpdateUser(data),
  });

export const useGetUserData = (id: number | null) =>
  useQuery({
    queryKey: [cashKey.getuserdata, id],
    queryFn: () => services.GetUser(id),
    enabled: !!id,
  });
