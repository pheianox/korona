import emojiFlags from "emoji-flags";
import { useState } from "react";
import { CovidCountryTotal } from "../types";

interface Props {
  allCountryTotals: CovidCountryTotal[];
  setCurrentCountryISO2: Function;
  onInitialClick: Function;
}

export const SelectCountry: React.FC<Props> = (props) => {
  const [isInitialClick, setIsInitialClick] = useState(false);

  return (
    <select
      className="transition select select-bordered w-full max-w-xs"
      onChange={(e) => {
        props.setCurrentCountryISO2(e.target.value);
        if (!isInitialClick) {
          setIsInitialClick(true);
          props.onInitialClick();
        }
      }}
    >
      <option value="" disabled selected>
        🌎&nbsp; &nbsp; &nbsp;
      </option>
      {props.allCountryTotals.map((data) => {
        if (!data.countryInfo.iso2) return null;
        return (
          <option key={data.country} value={data.countryInfo.iso2}>
            {emojiFlags.countryCode(data.countryInfo.iso2).emoji} &nbsp; &nbsp; &nbsp; {data.country}
          </option>
        );
      })}
    </select>
  );
};
