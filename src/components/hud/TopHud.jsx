import React, { useState } from "react";
import { ClockCount } from "./ClockCount";
import { FlourCount } from "./FlourCount";
import InventoryList from "./InventoryList";
import { Loader, SaveGameData } from "..";

const TopHud = ({ level }) => {
  const [loader, setLoader] = useState(false);
  return loader ? (
    <Loader />
  ) : (
    <div className="absolute top-1 left-0 right-0 flex justify-between items-center">
      <div className="scale-[var(--pixel-size)] origin-top-left flex gap-1">
        <FlourCount level={level} />
        <ClockCount level={level} />
        <InventoryList level={level} />
      </div>
      <div className="flex gap-1">
        <SaveGameData level={level} setLoader={setLoader} />

        {/* <EditorDropdown level={level} /> */}
      </div>
    </div>
  );
};

export default TopHud;
