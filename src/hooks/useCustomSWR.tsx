import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api";

type ApiResult<T> = {
  statusCode: number;
  message: string;
  data: T | null;
  success: boolean;
};

type UseApiResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

function useCustomSWR<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (isMounted: boolean) => {
    setLoading(true);
    try {
      const response: AxiosResponse<ApiResult<T>> = await axiosInstance.get(
        `/${url}`
      );
      if (isMounted) {
        setData(response.data.data);
        setError(null);
      }
    } catch (error) {
      if (isMounted) setError(error as Error);
    } finally {
      if (isMounted) setLoading(false);
    }
  };
  useEffect(() => {
    let isMounted = true;
    fetchData(isMounted);

    return () => {
      isMounted = false;
    };
  }, [url]);
  return { data, isLoading: loading, error };
}

export default useCustomSWR;
