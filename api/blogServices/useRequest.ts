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

export const useBlogUploadImage = () =>
  useMutation({
    mutationKey: ["upload-blog-image"],
    mutationFn: ({ id, file }: { id: number; file: File }) => 
      services.UploadBlogImage({ id, file }),
  });

export const useGetBlogDetail = (id: number) =>
  useQuery({
    queryKey: [cashKey.getblog, id], // یا هر کلید مشخص دیگری برای جزئیات
    queryFn: () => services.GetBlogById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });