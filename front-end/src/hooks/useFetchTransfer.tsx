import { useEffect, useState } from "react";

export function useFetchTransfer() {
  const [response, setResponse] = useState({
    success:null,
    isLoading: false,
    data: null,
  });

  const fetchTransferApi = async (data: any) => {
    setResponse({ ...response, isLoading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:9000/hardhat/transfer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResponse({ ...data, isLoading: false, success:true });
      });
    
    //reset data
    setTimeout(() => {
      setResponse({
        success: null,
        isLoading: false,
        data: null,
      });
    }, 500);
  };

  return { response, fetchTransferApi };
}
