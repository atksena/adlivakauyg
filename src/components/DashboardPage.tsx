import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "chart.js/auto";
Chart.register(ArcElement);

const DashboardPage: React.FC = () => {
  const [numberOfAHospitalValues, setNumberOfAHospitalValues] = useState(0);
  const [numberOfBHospitalValues, setNumberOfBHospitalValues] = useState(0);
  const [numberOfCHospitalValues, setNumberOfCHospitalValues] = useState(0);

  useEffect(() => {
    const numberOfA = JSON.parse(
      localStorage.getItem("numberOfAHospitalValues") || "0"
    );
    const numberOfB = JSON.parse(
      localStorage.getItem("numberOfBHospitalValues") || "0"
    );
    const numberOfC = JSON.parse(
      localStorage.getItem("numberOfCHospitalValues") || "0"
    );

    setNumberOfAHospitalValues(numberOfA);
    setNumberOfBHospitalValues(numberOfB);
    setNumberOfCHospitalValues(numberOfC);
  }, []);

  const pieChartData = {
    labels: ["A Hastanesi", "B Hastanesi", "C Hastanesi"],
    datasets: [
      {
        data: [
          numberOfAHospitalValues,
          numberOfBHospitalValues,
          numberOfCHospitalValues,
        ],
        backgroundColor: ["#FFCE56", "#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#FFCE56", "#4CAF50", "#FF9800"],
      },
    ],
  };

  const divStyle: React.CSSProperties = {
    position: "fixed",
    top: "150px",
    left: "570px",
    width: "300px",
    height: "300px",
  };

  const greyTextStyle: React.CSSProperties = {
    textAlign: "center",
    color: "darkgray",
  };

  return (
    <div style={divStyle}>
      <Pie data={pieChartData} />
      <p style={greyTextStyle}>Adli Vakaların Hastanelere Oranı</p>
    </div>
  );
};

export default DashboardPage;
