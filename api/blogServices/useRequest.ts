"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetBlogList= () =>
  useQuery({
    queryKey: [cashKey.getblog],
    queryFn: () => services.GetBlogList(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useBlogCreate = () =>
  useMutation({
    mutationKey: [cashKey.updateblog],
    mutationFn: (data:Blog) => services.CreateBlog(data),
  });
