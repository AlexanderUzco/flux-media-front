import { useState, useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

type TFetchFunction = () => Promise<AxiosResponse>;
type TDependencies = unknown[];

export const useFetch = (
  fetchFunction: TFetchFunction,
  dependency: TDependencies
) => {
  const [data, setData] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetchFunction(); // Utiliza tu instancia de Axios para hacer la solicitud GET
        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            // La solicitud fue realizada pero el servidor respondió con un código de estado que indica un error
            setError(`${error.response.status} - ${error.response.statusText}`);
          } else if (error.request) {
            // La solicitud fue realizada pero no se recibió ninguna respuesta
            setError('No se recibió ninguna respuesta del servidor');
          } else {
            // Ocurrió un error al configurar la solicitud
            setError('Ocurrió un error al realizar la solicitud');
          }
        }

        if (error instanceof Error) {
          // Ocurrió un error en la solicitud
          setError(error.message);
        }

        setIsPending(false);
      }
    };

    fetchData();
  }, [fetchFunction, dependency]);

  return { data, isPending, error };
};
