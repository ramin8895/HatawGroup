"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { services, cashKey } from ".";

export const useGetEvents = () =>
  useQuery({
    queryKey: [cashKey.getevent],
    queryFn: () => services.GetEvents(),
    refetchOnWindowFocus: false,
    enabled: true,
  });
export const useGetEventById = (id?: number) =>
  useQuery({
    queryKey: [cashKey.getevent],
    queryFn: () => services.GetEventGetById(id),
    refetchOnWindowFocus: false,
    enabled: id != undefined,
  });
export const useGetEventActiveEventsBymode = () =>
  useQuery({
    queryKey: [cashKey.geteventactiveeventsbymode],
    queryFn: () => services.GetEventActiveEventsBymode(),
    refetchOnWindowFocus: false,
    enabled: true,
  });

export const useCreateEvents = () =>
  useMutation({
    mutationKey: [cashKey.createevent],
    mutationFn: (data: EventType) => services.CreateEvents(data),
    retry: false,
  });
export const useUpdateEvents = () =>
  useMutation({
    mutationKey: [cashKey.createevent],
    mutationFn: (data: EventType) => services.CreateEvents(data),
    retry: false,
  });
// export const useDeleteEvents = () =>
//   useMutation({
//     mutationKey: [cashKey.createevent],
//     mutationFn: (id: number) => services.DeleteEvents(id),
//     retry: false,
//   });

export const useDeleteEvents = (id?: number) =>
  useQuery({
    queryKey: [cashKey.deleteevent],
    queryFn: () => services.DeleteEvents(id),
    refetchOnWindowFocus: false,
    enabled: id != undefined,
  });
