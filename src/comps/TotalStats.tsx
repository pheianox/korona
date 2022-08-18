import { CovidCountryTotal } from "../types";

interface Props {
  currentCountryTotals: CovidCountryTotal;
}

export const TotalStats: React.FC<Props> = (props) => (
  <div className="stats shadow stats-vertical md:stats-horizontal">
    <div className="stat">
      <div className="stat-title">Cases</div>
      <div className="stat-value">{props.currentCountryTotals.cases.toLocaleString()}</div>
      <div className="stat-desc">{props.currentCountryTotals.todayCases ? "+" + props.currentCountryTotals.todayCases.toLocaleString() : ""}</div>
    </div>
    <div className="stat">
      <div className="stat-title">Recovered</div>
      <div className="stat-value">{props.currentCountryTotals.recovered.toLocaleString()}</div>
      <div className="stat-desc">
        {props.currentCountryTotals.todayRecovered ? "+" + props.currentCountryTotals.todayRecovered.toLocaleString() : ""}
      </div>
    </div>
    <div className="stat">
      <div className="stat-title">Deaths</div>
      <div className="stat-value">{props.currentCountryTotals.deaths.toLocaleString()}</div>
      <div className="stat-desc">{props.currentCountryTotals.todayDeaths ? "+" + props.currentCountryTotals.todayDeaths.toLocaleString() : ""}</div>
    </div>
  </div>
);
