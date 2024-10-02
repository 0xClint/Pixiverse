import React, { useState } from "react";
import { ClockCount } from "./ClockCount";
import { FlourCount } from "./FlourCount";
import InventoryList from "./InventoryList";
import { Loader, SaveGameData } from "..";
import { useRouter } from "next/router";
import EditorDropdown from "./EditorDropdown";

const TopHud = ({ level, isLevelMode }) => {
  const [loader, setLoader] = useState(false);
  return loader ? (
    <Loader />
  ) : (
    <div className="absolute h-14 top-3 left-0 right-0 flex justify-between items-center mx-5">
      <div className="scale-[2] origin-left">
        <div>LOGO</div>
      </div>
      <div className="flex gap-1">
        {isLevelMode ? (
          <div className="origin-right flex gap-1 scale-[2]">
            <FlourCount level={level} />
            <ClockCount level={level} />
            <InventoryList level={level} />
          </div>
        ) : (
          <SaveGameData level={level} setLoader={setLoader} />
        )}
      </div>
    </div>
  );
};

export default TopHud;
