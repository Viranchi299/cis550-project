import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Marker,
  Geography,
  Annotation
} from "react-simple-maps";
import { geoCentroid } from 'd3-geo';
import allStates from './allStates.json';
import ReactTooltip from "react-tooltip";

const geoUrl =
'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

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

  const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else {
      return Math.round(num / 100) / 10 + "K";
    }
  };
  
  

const MapChart = ({ statesQueryRes, setTooltipContent }) => {
    
    const handleMouseEnter = (stateAbbreviation) => {
        const text = `Min Housing Value is: $${rounded(statesQueryRes[stateAbbreviation].MinHVP)} <br/>
        Avg Housing Value is: $${rounded(statesQueryRes[stateAbbreviation].AvgHVP)}<br/>
        Max Housing Value is: $${rounded(statesQueryRes[stateAbbreviation].MaxHVP)}`
        setTooltipContent(text);
    }

    return (
        <ComposableMap projection="geoAlbersUsa">
          <Geographies data-tip="" geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                //   const fillColor = getStateWinnerColor(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      stroke="#FFF"
                      geography={geo}
                      fill="#DDD"
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
                    <g key={geo.rsmKey + '-name'}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        // if state abbrev not in offset list put abbrev in state else annotate outside. 
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text
                              y="2"
                              fontSize={14}
                              textAnchor="middle"
                            >
                              {cur.id}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur.id][0]}
                            dy={offsets[cur.id][1]}
                          >
                            <text x={4} fontSize={14} alignmentBaseline="middle" fill="#F10">
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
