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

export const useGetEventById = (id?: number) => {
  return useQuery({
    queryKey: ["get-event-by-id", id],
    queryFn: () => services.GetEventGetById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

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

export const useCreateEventsScore = () =>
  useMutation({
    mutationKey: [cashKey.createeventscore],
    mutationFn: (data: any) => services.CreateEventsScore(data),
    retry: false,
  });


  export const useGetEventScoreById = (id?: number) => {
  return useQuery({
    queryKey: ["get-event-by-id-score", id],
    queryFn: () => services.GetEventScoreGetById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

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
