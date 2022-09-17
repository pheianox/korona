import "./App.css";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { CovidCountryTotal, CovidCountryHistory } from "./types";
import api from "./api";
import { SelectCountry } from "./comps/SelectCountry";
import { TotalStats } from "./comps/TotalStats";
import { UpdatedInfo } from "./comps/UpdatedInfo";
import { StatBar } from "./comps/StatBar";

function App() {
  const [allCountryTotals, setAllCountryTotals] = useState<CovidCountryTotal[]>([]);
  const [currentCountryHistory, setCurrentCountryHistory] = useState<CovidCountryHistory>();
  const [currentCountryTotals, setCurrentCountryTotals] = useState<CovidCountryTotal>();
  const [currentCountryISO2, setCurrentCountryISO2] = useState("-");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [isCountryChosen, setIsCountryChosen] = useState(false);

  useEffect(() => {
    setIsPageLoaded(false);
    api
      .get("/countries")
      .then(({ data }) => {
        setAllCountryTotals(data);
      })
      .finally(() => setIsPageLoaded(true));
  }, []);

  useEffect(() => {
    setIsDataFetching(false);
    // Fetch Hisotry
    api
      .get(`/historical/${currentCountryISO2}?lastdays=14`)
      .then(({ data }) => {
        setCurrentCountryHistory(data);
      })
      .finally(() => {
        setIsDataFetching(true);
      });
    // Get Totals
    const totals = allCountryTotals.find((total) => total.countryInfo.iso2 === currentCountryISO2);
    if (totals) setCurrentCountryTotals(totals);
  }, [currentCountryISO2]);

  function onInitialClick() {
    setIsCountryChosen(true);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      {isPageLoaded ? (
        <div className="hero-content text-center">
          <div className="flex flex-col gap-4 items-center text-center">
            {!isCountryChosen && <p>Please choose country</p>}
            <SelectCountry allCountryTotals={allCountryTotals} setCurrentCountryISO2={setCurrentCountryISO2} onInitialClick={onInitialClick} />
            {isDataFetching ? (
              <>
                {currentCountryTotals && <UpdatedInfo value={currentCountryTotals.updated} />}
                {currentCountryTotals && <TotalStats currentCountryTotals={currentCountryTotals} />}
                {currentCountryTotals && <p>Total tests: {currentCountryTotals.tests.toLocaleString()}</p>}
                {isPageLoaded && isDataFetching && currentCountryTotals && currentCountryHistory && <StatBar history={currentCountryHistory} />}
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-2">
                Loading...
                <progress className="progress w-56"></progress>
              </div>
            )}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
