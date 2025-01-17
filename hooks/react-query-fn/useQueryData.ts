import { useQuery } from "@tanstack/react-query";

export function useQueryData<T>({
  tags,
  fetcher,
  placeholderData,
}: {
  tags: string[];
  fetcher: (dataInput?: any) => Promise<any>;
  placeholderData?: any;
}) {
  const queriesRes = useQuery({
    queryKey: tags,
    queryFn: fetcher,
    placeholderData,
  });

  return { ...queriesRes };
}
