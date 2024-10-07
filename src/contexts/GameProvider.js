import { useOkto } from "okto-sdk-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGameAuth } from "./GameAuthProvider";
import {
  convertWalletData,
  findObjectByCid,
  getContractByAddress,
  replaceUri,
} from "@/helpers/convertor";
import {
  GAME_CONTRACT_ABI,
  GAME_CONTRACT_ADDRESS,
  WORLD_ITEM_CONTRACT_ABI,
  WORLD_ITEMS_CONTRACT_ADDRESS,
  WORLD_SPACE_CONTRACT_ABI,
  WORLD_SPACE_CONTRACT_ADDRESS,
} from "@/contracts/conts";
import { encodeFunctionData } from "viem";
import { publicClient } from "@/utils/viemConfig";
import { INITIAL_SPACE_SIZE } from "@/helpers/consts";
import { uploadFile } from "@/utils/lighthouse";
import axios from "axios";

const GameProviderFn = () => {
  const { isAuthenticated, setAuthenticated } = useGameAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [userName, setUserName] = useState(null);
  const [lands, setLands] = useState(null);
  const [userLevels, setUserLevels] = useState(null);
  const [gameLevels, setGameLevels] = useState([]);
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
      setUserName(details.email.split("@")[0]);
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
      console.log(walletsData?.wallets);
      const data = convertWalletData(walletsData?.wallets);
      setWallets(data);
      setAccount(data?.POLYGON_TESTNET_AMOY.address);
    } catch (error) {
      console.log(error);
    }
  };

  const createWorld = useCallback(
    async (name, cid) => {
      const encodedTransferCall = encodeFunctionData({
        abi: WORLD_SPACE_CONTRACT_ABI,
        functionName: "createSpace",
        args: [
          name,
          INITIAL_SPACE_SIZE,
          `https://gateway.lighthouse.storage/ipfs/${cid}`,
        ],
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
    },
    [account]
  );

  const saveWorld = useCallback(
    async (currCid, lands, gameData) => {
      // console.log(lands, account);
      const currGameState = findObjectByCid(lands, currCid);
      console.log(currGameState);

      if (currGameState && account) {
        const newCid = await uploadFile(gameData);
        console.log("new CID : " + newCid);
        const encodedTransferCall = encodeFunctionData({
          abi: WORLD_SPACE_CONTRACT_ABI,
          functionName: "setSpaceURI",
          args: [
            Number(currGameState.identifier),
            `https://gateway.lighthouse.storage/ipfs/${newCid}`,
          ],
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
        await getAllLands();
        return newCid;
      } else {
        console.log("Your are on wrong world url!");
        return null;
      }
    },
    [account]
  );

  const transferNFT = useCallback(
    async (to, tokenID) => {
      console.log(account, to, tokenID);

      if (account) {
        const encodedTransferCall = encodeFunctionData({
          abi: WORLD_SPACE_CONTRACT_ABI,
          functionName: "transferFrom",
          args: [account, to, tokenID],
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
        await getAllLands();
      } else {
        console.log("Your are on wrong world url!");
        return null;
      }
    },
    [account]
  );

  const saveLevelData = useCallback(
    async (levelIndex) => {
      console.log(account, levelIndex);
      if (account) {
        const encodedTransferCall = encodeFunctionData({
          abi: WORLD_ITEM_CONTRACT_ABI,
          functionName: "awardItem",
          args: [account, levelIndex],
        });

        const requestData = {
          network_name: "POLYGON_TESTNET_AMOY",
          transaction: {
            from: account,
            to: WORLD_ITEMS_CONTRACT_ADDRESS,
            data: encodedTransferCall,
            value: "0x0",
          },
        };

        const response = await executeRawTransaction(requestData);
        console.log(response);
        await transactionListener(response.jobId);
        await getAllLands();
      } else {
        console.log("Your are on wrong world url!");
      }
    },
    [account]
  );

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

  const fetchRawTransactionStatus = async (jobId) => {
    const data = await getRawTransactionStatus({ order_id: jobId });

    console.log(data.jobs[0]);
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
        const url = `https://testnets-api.opensea.io/api/v2/chain/amoy/account/${account}/nfts`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log(response.data.nfts); 
        const data = getContractByAddress(
          response.data.nfts,
          WORLD_SPACE_CONTRACT_ADDRESS
        );
        console.log(data);
        setLands(data);
        // console.log(addUriProperty(data));
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      throw error; 
    }
  };

  const getAllLevels = async () => {
    try {
      const res = await publicClient.readContract({
        address: WORLD_ITEMS_CONTRACT_ADDRESS,
        abi: WORLD_ITEM_CONTRACT_ABI,
        functionName: "getAllLevels",
      });
      console.log(res);
      setGameLevels(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserLevels = async () => {
    try {
      if (account) {
        const res = await publicClient.readContract({
          address: WORLD_ITEMS_CONTRACT_ADDRESS,
          abi: WORLD_ITEM_CONTRACT_ABI,
          functionName: "balanceOf",
          args: [account],
        });
        console.log(res);
        setUserLevels(Number(res));
        // setUserLevels(6);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLevels();
  }, [isAuthenticated, setAuthenticated, account]);

  useEffect(() => {
    getAllLevels();
  }, []);

  useEffect(() => {
    getAllLands();
    console.log("all lands call!");
  }, [isAuthenticated, setAuthenticated, account, saveWorld]);

  return {
    fetchUserDetails,
    fetchUserWallets,
    userName,
    userDetails,
    wallets,
    createWorld,
    getAllLands,
    lands,
    account,
    setLands,
    saveWorld,
    userLevels,
    gameLevels,
    saveLevelData,
    fetchRawTransactionStatus,
    transferNFT,
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
