import { spriteSheetImageAtom } from "@/atoms/spriteSheetImageAtom";
import {
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_ICE,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_WATER,
} from "@/helpers/consts";
import React, { useState } from "react";
import EditorSprite from "@/components/object-graphics/EditorSprite";
import { TILES } from "@/helpers/tiles";

const tempData = [
  {
    id: 1,
    name: "water",
    frameCoord: TILES.WATER1,
    value: PLACEMENT_TYPE_WATER,
  },
  { id: 2, name: "Fire", frameCoord: TILES.FIRE1, value: PLACEMENT_TYPE_FIRE },
  { id: 3, name: "Wall", frameCoord: "6x2", value: PLACEMENT_TYPE_WALL },
  { id: 4, name: "Ice", frameCoord: TILES.ICE, value: PLACEMENT_TYPE_ICE },
];

const EditorDropdown = ({ level }) => {
  const [activeSprite, setActiveSprite] = useState(null);

  const handleOnSelect = (value) => {
    setActiveSprite(value);
    level.setEditModePlacementType(value);
  };

  if (!level.enableEditing) {
    return null;
  }

  return (
    <div className="absolute card-container right-2 flex gap-1">
      <div className=" flex flex-col max-h-[400px] flex-wrap gap-1.5">
        {tempData.map(({ id, name, frameCoord, value }) => {
          return (
            <div
              key={id}
              onClick={() => handleOnSelect(value)}
              className={`p-[4px] border border-black rounded-sm ${
                activeSprite == value
                  ? " border-red-950 border-2"
                  : "border-black"
              }`}
            >
              <EditorSprite frameCoord={frameCoord} className="" />
            </div>
          );
        })}
      </div>

      {/* <select
        value={level.editModePlacementType}
        onChange={(event) => {
          level.setEditModePlacementType(event.target.value);
        }}
        className="bg-transparent text-white border-2 border-white rounded-md py-2 px-4"
      >
        <option value={PLACEMENT_TYPE_WALL} className="text-black">
          Wall
        </option>
        <option value={PLACEMENT_TYPE_FIRE} className="text-black">
          Fire
        </option>
        <option value={PLACEMENT_TYPE_WATER} className="text-black">
          Water
        </option>
        <option value={PLACEMENT_TYPE_SWITCH} className="text-black">
          Purple Switch
        </option>
        <option value={PLACEMENT_TYPE_SWITCH_DOOR} className="text-black">
          Door
        </option>
      </select> */}
      {/* <button
        className="bg-transparent text-white border-2 border-white rounded-md py-2 px-4"
        onClick={() => {
          level.copyPlacementsToClipboard();
        }}
      >
        Export
      </button> */}
    </div>
  );
};

export default EditorDropdown;
