import { useEffect, useState } from "react";

const noop = () => {};
const defaultConfig = {
  onSuccess: noop,
  onError: noop,
};

const useQuery = (fn, config = defaultConfig) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: "",
  });
  const { onSuccess, onError } = config;

  const runQuery = () => {
    if (!fn) return;

    setState((s) => ({ ...s, isLoading: true }));
    fn()
      .then((data) => {
        setState({
          data,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: "",
        });
        onSuccess(data);
      })
      .catch((error) => {
        setState({
          data: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: error.message || "Failed to fetch",
        });
        onError(error);
      });
  };

  useEffect(runQuery, []);

  return { ...state, refetch: runQuery };
};

export default useQuery;
