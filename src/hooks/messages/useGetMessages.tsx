import useCustomSWR from "../useCustomSWR"


function useGetMessages({threadId}: {threadId: string | null}) {
  const { data, isLoading, error } = useCustomSWR<{ messages: IMessage[] }>(
    `messages/${threadId}`
  );

  return { messages: data?.messages, isLoading, error };
}

export default useGetMessages