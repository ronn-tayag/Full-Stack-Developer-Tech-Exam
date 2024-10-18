import { useEffect, useState } from "react";

export function useFetchWalletInfo() {

  const [response, setResponse] = useState({
        success:null,
        address: "",
        balance: "0.0",
        gasLimit:0
    })

    const fetchWalletApi = async() => {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        fetch("http://localhost:9000/hardhat/owner-info/", requestOptions)
          .then((response) => response.json())
          .then((data) => setResponse({...data, success:true}));
    }
    
    return { response, fetchWalletApi };
}