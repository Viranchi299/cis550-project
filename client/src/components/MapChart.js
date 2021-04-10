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
  

const MapChart = ({ statesQueryRes, setTooltipContent }) => {
    console.log(statesQueryRes.WA);
    const handleMouseEnter = (stateAbbreviation) => {
        // console.log("In handleMouseEnter ... abbrev is: [" + stateAbbreviation + "]");
        // console.log("Object for abbrev is is: [" + statesQueryRes[stateAbbreviation] + "]");
        setTooltipContent(
            `Min Housing Value is: ${statesQueryRes[stateAbbreviation].MinHVP} \n
            Avg Housing Value is: ${statesQueryRes[stateAbbreviation].AvgHVP}\n
            Max Housing Value is: ${statesQueryRes[stateAbbreviation].MaxHVP}`);
    }

    // const handleMouseEnter = (stateName) => {
    //     const stateName1 = "yellow";

    //     setTooltipContent({
    //         name: JSON.stringify(stateName1),
    //         electTotal: JSON.stringify(stateName1),
    //         eevp: JSON.stringify(stateName1),
    //         // winner: winner ? winner.name_display : null,
    //         // imgUrl: winner ? winner.img_url : null,
    //       });
    //       ReactTooltip.rebuild();
    // };

    return (
        <ComposableMap data-tip="" projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
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
                      style={{
                        default: {
                        //   fill: fillColor,
                          outline: 'none',
                        },
                        hover: {
                        //   fill: fillColor,
                          outline: 'none',
                        },
                        pressed: {
                        //   fill: fillColor,
                          outline: 'none',
                        },
                      }}
                      onMouseEnter={() => {
                        // const { NAME, POP_EST } = geo.properties;
                        // setTooltipContent(`${NAME} — `);
                        const stateAbbrev = allStates.find((s) => s.val === geo.id);
                        // console.log("Abbrevation is: " + stateAbbrev.id);
                        handleMouseEnter(stateAbbrev.id);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                    //   onMouseEnter={() => handleMouseEnter(geo.id)}
                    //   onMouseLeave={() => setTooltipContent(null)}
                    />
                  );
                })}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates.find((s) => s.val === geo.id);
                  // cur.id is state name. 
                  console.log(cur.id);
                //   const fillColor = getStateWinnerColor(geo.id);
                  return (
                    <g key={geo.rsmKey + '-name'}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text
                              y="2"
                              fontSize={14}
                              textAnchor="middle"
                            //   fill={
                            //     fillColor === constants.LIGHT_RED ||
                            //     fillColor === constants.LIGHT_BLUE
                            //       ? '#000'
                            //       : '#FFF'
                            //   }
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
