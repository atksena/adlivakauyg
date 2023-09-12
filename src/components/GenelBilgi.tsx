import React, { createContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useHastaContext } from "../HastaContext";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./DashboardPage";

const GenelBilgi: React.FC = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // const { genelBilgi, setGenelBilgi } = useHastaContext();

  type GenelBilgi = {
    gelisNedeni: gelisNedeni;
    aciklamaSikayet: string;
    ortam: "Evet" | "Hayır";
    organizasyon: organizasyon;
    doktor: string;
    OdadaBulunanlar: string[];
  };
  enum organizasyon {
    aHastane = "A Hastanesi",
    bHastane = "B Hastanesi",
    cHastanesi = "C Hastanesi",
  }
  enum gelisNedeni {
    etkiliEylem = "Etkili Eylem",
    trafikKazasi = "Trafik Kazası",
    isKazasi = "İş Kazası",
    digerKazalar = "Diğer Kazalar",
    insanHaklari = "İnsan Hakları İhlali İddiası",
    intihar = "İntihar Girişimi",
    zehilenme = "Zehirlenmeler",
  }
  enum OdadaBulunanlar {
    doktor = "Tabip",
    saglikci = "Sağlık Personeli",
    other = "sağlık Meslek Mensubu Personel",
    refakatci = "Refakatçi",
    güvenlik = "Güvenlik Görevlisi",
  }

  const initialValues: GenelBilgi = {
    gelisNedeni: gelisNedeni.digerKazalar,
    aciklamaSikayet: "",
    ortam: "Hayır",
    organizasyon: organizasyon.aHastane,
    doktor: "",
    OdadaBulunanlar: [],
  };

  const validationSchema = Yup.object({
    gelisNedeni: Yup.string().required("Geliş nedeni zorunludur."),
    aciklamaSikayet: Yup.string(),
    ortam: Yup.string().required(
      "Uygun ortamın sağlandıp sağlanmadığını belirtin."
    ),
    organizasyon: Yup.string().required("Organizasyon seçilmesi zorunludur."),
    doktor: Yup.string().required("Doktor bilgisi zorunludur."),
  });

  const onSubmit = (values: GenelBilgi) => {
    const existingData = JSON.parse(localStorage.getItem("genelBilgi") || "[]");

    // Yeni verileri ekleyip güncellenmiş veriyi localStorage'e kaydet
    const updatedData = [...existingData, values];
    localStorage.setItem("genelBilgi", JSON.stringify(updatedData));

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    togglePopup();
  };

  const [ortam, setOrtam] = useState<boolean>(false);
  const toggleOrtam = () => {
    setOrtam((prevOrtam) => !prevOrtam);
  };
  const toggleWidth = 40;
  const toggleHeight = 20;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div
      style={{
        position: "fixed",
        resize: "none",
        border: "1px solid black",
        padding: "1rem",
        margin: "9rem",
        borderRadius: ".5rem",
        display: "flex",
        flexDirection: "column",
        height: "350px",
        width: "400px",
        left: "350px",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form style={{ margin: "auto" }}>
          <h2>Genel Bilgiler</h2>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="gelisNedeni">Geliş Nedeni :</label>
            <Field
              as="select"
              id="gelisNedeni"
              name="gelisNedeni"
              style={{ position: "relative", right: "-70px" }}
            >
              {Object.entries(gelisNedeni).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="gelisNedeni" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="aciklamaSikayet">Açıklama ve Şikayet:</label>
            <Field
              as="textarea"
              id="aciklamaSikayet"
              name="aciklamaSikayet"
              rows={4}
              cols={50}
              style={{
                width: "140px",
                height: "50px",
                resize: "none",
                position: "relative",
                right: "-25px",
              }}
            />
          </div>
          <ErrorMessage name="aciklamaSikayet" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label>Uygun Ortam Sağlandı mı?</label>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  width: toggleWidth,
                  height: toggleHeight,
                  borderRadius: toggleHeight,
                  backgroundColor: ortam ? "green" : "grey",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={toggleOrtam}
              >
                <div
                  style={{
                    width: toggleHeight,
                    height: toggleHeight,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50%",
                    transform: `translateY(-50%) ${
                      ortam
                        ? `translateX(${toggleWidth - toggleHeight + 5}px)`
                        : "translateX(5px)"
                    }`,
                    transition: "transform 0.2s ease",
                  }}
                ></div>
              </div>
              <span style={{ marginLeft: "10px" }}>
                {ortam
                  ? "Evet, uygun ortam sağlandı."
                  : "Hayır, uygun ortam sağlanmadı."}
              </span>
            </div>
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="organizasyon">Organizasyon :</label>
            <Field
              as="select"
              id="organizasyon"
              name="organizasyon"
              style={{ position: "relative", right: "-65px" }}
            >
              {Object.entries(organizasyon).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage name="gelisNedeni" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="doktor">Doktor Adı:</label>
            <Field
              type="text"
              id="doktor"
              name="doktor"
              style={{ position: "relative", right: "-90px" }}
            />
          </div>
          <ErrorMessage name="doktor" component="div" />

          <button
            style={{
              position: "relative",
              right: "-300px",
              borderRadius: "10px",
              backgroundColor: "transparent",
            }}
            type="submit"
          >
            Vaka Oluştur
          </button>
        </Form>
      </Formik>
      {showAlert && (
        <div style={{ marginTop: "1rem", color: "green" }}>
          Vaka oluşturuldu
        </div>
      )}

      {/* Popup section */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              position: "relative",
            }}
          >
            <button
              onClick={togglePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <p>Vaka oluşturuldu</p>
            <button
              style={{
                position: "relative",
                top: "10px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                togglePopup();
                navigate("/hasta-bilgileri");
              }}
            >
              Yeni kayıt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenelBilgi;
