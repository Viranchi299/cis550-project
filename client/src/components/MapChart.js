import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Marker,
  Geography,
  Annotation,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import allStates from "./allStates.json";
import ReactTooltip from "react-tooltip";
import { scaleQuantize } from "d3-scale";
import "../style/Dashboard.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

//stateQueryRes = states query results (make generic)
const MapChart = ({ statesQueryRes, setTooltipContent }) => {
  //sets tooltip

  console.log("StatesQueryRes:");
  console.log(statesQueryRes);

  let minAvg = 1000000000; //to-do: set to math.max
  let maxAvg = -1000000000; //to-do: set to math.min

  for (const [key, value] of Object.entries(statesQueryRes)) {
    console.log(value.Avg);
    minAvg = value.Avg < minAvg ? value.Avg : minAvg;
    maxAvg = value.Avg > maxAvg ? value.Avg : maxAvg;
  }

  console.log("MIN AND MAX AVERAGE VALUES");
  console.log(minAvg);
  console.log(maxAvg);

  // let minAvg =
  // let maxAvg =

  const handleMouseEnter = (stateAbbreviation) => {
    let text;
    if (statesQueryRes[stateAbbreviation]) {
      text = `Mean: $${rounded(statesQueryRes[stateAbbreviation].Avg)} <br/>
        Min: $${rounded(statesQueryRes[stateAbbreviation].Min)}<br/>
        Max: $${rounded(statesQueryRes[stateAbbreviation].Max)}`;
    } else {
      text = "No data available";
    }
    setTooltipContent(text);
  };

  //returns value between 1-10 for heatmap coloring
  const findStateDecile = (stateAbbreviation) => {
    //let g = statesQueryRes[stateAbbreviation].Avg;
    // console.log("finding decile");
    // console.log(statesQueryRes);
    // console.log(stateAbbreviation);
    //console.log("honing in");
    let vals = statesQueryRes[stateAbbreviation]
      ? statesQueryRes[stateAbbreviation].Avg
      : null;

    //determine decile based on state's average value vs min and max average values
    if (vals) {
      //return 5;
      return ((vals - minAvg) / (maxAvg - minAvg)) * 10 + 1;
    } else {
      return 0;
    }
  };

  //takes in a state id, return an RGB color

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      // width={800}
      // height={400}
      id="usmap"
      // style={{ width: "50%", height: "auto" }}
    >
      <Geographies data-tip="" geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              //console.log("GEO");
              //console.log(geo);
              let color;
              //   const fillColor = getStateWinnerColor(geo.id);
              if (geo.id === "20") {
                color = "CCC";
              } else {
                color = "#ABC";
              }
              //let decile = geo.id % 10;
              const stateAbbrev = allStates.find((s) => s.val === geo.id);
              let decile = findStateDecile(stateAbbrev.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  // fill={color}
                  fill={colorScale(decile)}
                  onMouseEnter={() => {
                    // const { NAME, POP_EST } = geo.properties;
                    // setTooltipContent(`${NAME} — `);
                    const stateAbbrev = allStates.find((s) => s.val === geo.id);
                    // console.log("Abbrevation is: " + stateAbbrev.id);
                    handleMouseEnter(stateAbbrev.id);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                />
              );
            })}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              // cur.id is state name.
              //   console.log(cur.id);
              //   const fillColor = getStateWinnerColor(geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    // if state abbrev not in offset list put abbrev in state else annotate outside.
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text
                          x={4}
                          fontSize={14}
                          alignmentBaseline="middle"
                          fill="#F10"
                        >
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};
export default memo(MapChart);
