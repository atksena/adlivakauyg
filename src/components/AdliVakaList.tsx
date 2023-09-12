import React, { useContext, useEffect, useState } from "react";
import { useHastaContext } from "../HastaContext";
import { colors } from "@mui/material";
import { Colors } from "chart.js";

const AdliVakaList: React.FC = () => {
  const savedData = JSON.parse(localStorage.getItem("hastaBilgileri") || "[]");
  const savedDataGenel = JSON.parse(localStorage.getItem("genelBilgi") || "[]");
  const [searchText, setSearchText] = useState("");
  const filtered = savedData.filter((data: any) =>
    `${data.adi} ${data.soyadi}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
  const numberOfAHospitalValues = savedDataGenel.reduce(
    (count: number, data: { organizasyon: string }) => {
      if (data.organizasyon === "A Hastanesi") {
        return count + 1;
      }
      return count;
    },
    0
  );
  useEffect(() => {
    localStorage.setItem(
      "numberOfAHospitalValues",
      numberOfAHospitalValues.toString()
    );
  }, [numberOfAHospitalValues]);

  const numberOfBHospitalValues = savedDataGenel.reduce(
    (count: number, data: { organizasyon: string }) => {
      if (data.organizasyon === "B Hastanesi") {
        return count + 1;
      }
      return count;
    },
    0
  );
  useEffect(() => {
    localStorage.setItem(
      "numberOfBHospitalValues",
      numberOfBHospitalValues.toString()
    );
  }, [numberOfBHospitalValues]);

  const numberOfCHospitalValues = savedDataGenel.reduce(
    (count: number, data: { organizasyon: string }) => {
      if (data.organizasyon === "C Hastanesi") {
        return count + 1;
      }
      return count;
    },
    0
  );

  useEffect(() => {
    localStorage.setItem(
      "numberOfCHospitalValues",
      numberOfCHospitalValues.toString()
    );
  }, [numberOfCHospitalValues]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <h2>Adli Vaka Listesi</h2>
        <input
          type="text"
          placeholder="Ad veya Soyad girin..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            marginBottom: "10px",
            backgroundColor: "#D6D6D6",
            borderRadius: "5px",
            color: "#000000",
          }}
        />

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Adı</th>
              <th style={{ border: "1px solid black" }}>Soyadı</th>
              <th style={{ border: "1px solid black" }}>Yaş</th>
              <th style={{ border: "1px solid black" }}>Cinsiyet</th>
              <th style={{ border: "1px solid black" }}>Kan Grubu</th>
              <th style={{ border: "1px solid black" }}>Darp Durumu</th>
              <th style={{ border: "1px solid black" }}>Geliş Nedeni</th>
              <th style={{ border: "1px solid black" }}>Açıklama Şikayet</th>
              <th style={{ border: "1px solid black" }}>Ortam</th>
              <th style={{ border: "1px solid black" }}>Organizasyon</th>
              <th style={{ border: "1px solid black" }}>Doktor Adı</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(
              (
                data: {
                  adi: string;
                  soyadi: string;
                  yas: number;
                  cinsiyet: string;
                  kanGrubuRh: string;
                  darpDurumu: string;
                },
                index: number
              ) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>{data.adi}</td>
                  <td style={{ border: "1px solid black" }}>{data.soyadi}</td>
                  <td style={{ border: "1px solid black" }}>{data.yas}</td>
                  <td style={{ border: "1px solid black" }}>{data.cinsiyet}</td>
                  <td style={{ border: "1px solid black" }}>
                    {data.kanGrubuRh}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {data.darpDurumu}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {savedDataGenel[index]?.gelisNedeni}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {savedDataGenel[index]?.aciklamaSikayet}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {savedDataGenel[index]?.ortam}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {savedDataGenel[index]?.organizasyon}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {savedDataGenel[index]?.doktor}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdliVakaList;
