import React, { useEffect, useState } from 'react';
import { TransportManager, TransportConfig } from '@nftechie/smart-rpc';

export default function Home() {
  const [latestBlockhash, setLatestBlockhash] = useState("");

  useEffect(() => {
    let transports: TransportConfig[] = [{
      rate_limit: 50,
      weight: 50,
      blacklist: [],
      url: 'https://bold-winter-brook.solana-mainnet.quiknode.pro/039710b0695699c8b2849d5903a9735260339476/',
      enable_smart_disable: false,
      enable_failover: false,
      max_retries: 0,
    },
    {
      rate_limit: 50,
      weight: 50,
      blacklist: ['getTokenLargestAccounts'],
      url: 'https://api.mainnet-beta.solana.com',
      enable_smart_disable: true,
      enable_failover: true,
      max_retries: 0,
    }];

    const transportManager = new TransportManager(transports);
    const smartConnection = transportManager.smartConnection;
    
    const fetchData = async () => {
        try {
            const resp = await smartConnection.getLatestBlockhash();
            setLatestBlockhash(resp.blockhash.toString());
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error appropriately
        }
    };

    // Set up the interval
    const intervalId = setInterval(fetchData, 1000); // fetchData every 1000 milliseconds (1 second)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>
        Welcome to Smart RPC!
      </h1>

      <p>
        Latest blockhash: {latestBlockhash}
      </p>
    </>
  );
}
