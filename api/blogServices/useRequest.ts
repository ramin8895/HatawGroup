"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetBlogList= (data: { id_dist: any; date?: any }) =>
  useQuery({
    queryKey: [cashKey.getblog],
    queryFn: () => services.GetBlogList(data),
    refetchOnWindowFocus: false,
    enabled: !!data.id_dist || false,
  });

export const useBlogCreate = (data:Blog) =>
  useMutation({
    mutationKey: [cashKey.updateblog],
    mutationFn: () => services.CreateBlog(data),
  });
