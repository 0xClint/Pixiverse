import App from "@/App";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Land = () => {
  // https://gateway.lighthouse.storage/ipfs/
  const router = useRouter();
  const [gameData, setGameData] = useState(null);
  const fetchGameData = async () => {
    const cid = router.query.id;
    if (cid) {
      console.log(router.query.id);
      const res = await axios.get(
        `https://gateway.lighthouse.storage/ipfs/${cid}/`
      );
      console.log(res.data);
      setGameData(res.data);
    }
  };
  useEffect(() => {
    fetchGameData();
  }, [router.query.id]);

  return (
    <>
      <App  />
    </>
  );
};

export default Land;
