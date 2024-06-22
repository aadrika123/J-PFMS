import React from "react";
import GaugeChart from "react-gauge-chart";

const SpeedoMeter: React.FC = () => {
    return (
      <>
        <div className=" justify-center ">
          <div className="m-8">
            <p className="flex justify-center font-semibold">Total Spending </p>
            <span className=" flex justify-center font-semibold">
              In Rupee (₹)
            </span>
          </div>

          <div>
            {/* <GaugeChart id="gauge-chart1" /> */}
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.3, 0.5, 0.2]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={0.37}
              arcPadding={0.02}
            />
            
          </div>
          <div className="m-4 text-center">Ranchi Municipal Corporation</div>
        </div>
      </>
    );
};

export default SpeedoMeter;
