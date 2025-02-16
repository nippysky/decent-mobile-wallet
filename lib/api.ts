import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "https://decentroneum.com";
const API_KEY = "IF-ONLY-DECETN-WILL-KNOW-WHAT-BEEN-qazwsxcdeplmoknijb-THROUGH";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "API-KEY": API_KEY,
  },
});

// Function to make GET requests
const fetchData = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make POST requests
const postData = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make PUT requests
const putData = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make DELETE requests
const deleteData = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Custom hook to fetch data using React Query
export const useFetchData = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url),
  });
};

// Custom hook for POST requests
export const usePostData = <
  TVariables = Record<string, any>,
  TResponse = unknown
>(
  url: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponse, unknown, TVariables>({
    mutationFn: (data: TVariables) => postData(url, data),
    mutationKey: ["post", url],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [url] });
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error: mutation.error,
  };
};

// Custom hook for PUT requests
export const usePutData = <
  TVariables = Record<string, any>,
  TResponse = unknown
>(
  url: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponse, unknown, TVariables>({
    mutationFn: (data: TVariables) => putData(url, data),
    mutationKey: ["put", url],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [url] });
    },
    onError: (error) => {
      console.error("Error updating data:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error: mutation.error,
  };
};

// Custom hook for DELETE requests
export const useDeleteData = <TResponse = unknown>(url: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponse, unknown>({
    mutationFn: () => deleteData(url),
    mutationKey: ["delete", url],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [url] });
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    error: mutation.error,
  };
};

export default apiClient;
