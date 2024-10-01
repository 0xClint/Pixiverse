import { useOkto } from "okto-sdk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useGameAuth } from "./GameAuthProvider";
import { convertWalletData, findObjectByCid } from "@/helpers/convertor";
import {
  GAME_CONTRACT_ABI,
  GAME_CONTRACT_ADDRESS,
  WORLD_SPACE_CONTRACT_ABI,
  WORLD_SPACE_CONTRACT_ADDRESS,
} from "@/contracts/conts";
import { encodeFunctionData } from "viem";
import { publicClient } from "@/utils/viemConfig";
import { INITIAL_SPACE_SIZE } from "@/helpers/consts";
import { uploadFile } from "@/utils/lighthouse";

const GameProviderFn = () => {
  const { isAuthenticated, setAuthenticated } = useGameAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [lands, setLands] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [account, setAccount] = useState("");
  const {
    getUserDetails,
    executeRawTransaction,
    createWallet,
    getWallets,
    getRawTransactionStatus,
    orderHistory,
  } = useOkto();

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      console.log(details);
      setUserDetails(details);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserWallets = async () => {
    try {
      await createWallet();
    } catch (error) {
      console.log(error);
    }
    try {
      const walletsData = await getWallets();
      // console.log(walletsData?.wallets);
      const data = convertWalletData(walletsData?.wallets);
      setWallets(data);
      setAccount(data?.POLYGON_TESTNET_AMOY.address);
    } catch (error) {
      console.log(error);
    }
  };

  const createWorld = async (name, cid) => {
    const encodedTransferCall = encodeFunctionData({
      abi: WORLD_SPACE_CONTRACT_ABI,
      functionName: "createSpace",
      args: [name, INITIAL_SPACE_SIZE, cid],
    });
    if (account) {
      const requestData = {
        network_name: "POLYGON_TESTNET_AMOY",
        transaction: {
          from: account,
          to: WORLD_SPACE_CONTRACT_ADDRESS,
          data: encodedTransferCall,
          value: "0x0",
        },
      };

      const response = await executeRawTransaction(requestData);
      console.log(response);
      await transactionListener(response.jobId);
    } else {
      console.log("account not found!");
    }
  };

  const SaveWorld = async (currCid, gameData) => {
    const currGameState = findObjectByCid(lands, currCid);

    if (currGameState && account) {
      const newCid = await uploadFile(gameData);

      const encodedTransferCall = encodeFunctionData({
        abi: WORLD_SPACE_CONTRACT_ABI,
        functionName: "setSpaceURI",
        args: [Number(currGameState.spaceId), newCid],
      });

      const requestData = {
        network_name: "POLYGON_TESTNET_AMOY",
        transaction: {
          from: account,
          to: WORLD_SPACE_CONTRACT_ADDRESS,
          data: encodedTransferCall,
          value: "0x0",
        },
      };

      const response = await executeRawTransaction(requestData);
      console.log(response);
      await transactionListener(response.jobId);
    } else {
      console.log("Your are on wrong world url!");
    }
  };

  const transactionListener = (job_id) => {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const data = await getRawTransactionStatus({ order_id: job_id });

          console.log("RUNNING...");

          if (data.jobs[0] && data.jobs[0].status === "PUBLISHED") {
            console.log("SUCCESS received, stopping interval.");
            console.log(data.jobs[0]);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve("Transaction successful");
          }
        } catch (error) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          reject("Error in transaction listener: " + error);
        }
      }, 3000);

      const timeoutId = setTimeout(() => {
        console.log("END! Stopping interval.");
        clearInterval(intervalId);
        reject("Transaction timed out after 50 seconds");
      }, 50000);
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [isAuthenticated, setAuthenticated]);

  useEffect(() => {
    fetchUserWallets();
  }, [isAuthenticated, setAuthenticated]);

  //**********************getter****************** */
  const getAllLands = async () => {
    try {
      if (account) {
        const res = await publicClient.readContract({
          address: WORLD_SPACE_CONTRACT_ADDRESS,
          abi: WORLD_SPACE_CONTRACT_ABI,
          functionName: "getAllSpacesDetails",
          args: [account],
        });
        setLands(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLands();
  }, [isAuthenticated, setAuthenticated, account, SaveWorld, createWorld]);

  return {
    fetchUserDetails,
    fetchUserWallets,
    wallets,
    createWorld,
    getAllLands,
    lands,
    setLands,
    SaveWorld,
  };
};

const GameContext = createContext(null);

export const GameContextProvider = ({ children }) => {
  return (
    <GameContext.Provider value={GameProviderFn()}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
