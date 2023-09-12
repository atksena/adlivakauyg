import React, { createContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import GenelBilgi from "./GenelBilgi";
import { useHastaContext } from "../HastaContext";

const HastaBilgileri: React.FC = () => {
  const navigate = useNavigate();
  // const { setHastaBilgileri } = useHastaContext();

  type HastaBilgileri = {
    adi: string;
    soyadi: string;
    yas: number;
    cinsiyet: Cinsiyet;
    kanGrubu: KanGrubu;
    kanGrubuRh: KanGrubuRh;
    darpDurumu: "Evet" | "Hayır";
    ortam: boolean;
  };

  enum Cinsiyet {
    Erkek = "Erkek",
    Kadin = "Kadın",
  }

  enum KanGrubuRh {
    RhPozitif = "+",
    RhNegatif = "-",
  }

  enum KanGrubu {
    A = "A",
    B = "B",
    AB = "AB",
    O = "O",
  }
  const cascaderOptions = Object.values(KanGrubu).map((grup) => {
    return Object.values(KanGrubuRh).map((rh) => {
      const label = grup + rh;
      const value = grup + rh;

      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
  });
  const initialValues: HastaBilgileri = {
    adi: "",
    soyadi: "",
    yas: 0,
    cinsiyet: Cinsiyet.Erkek,
    kanGrubu: KanGrubu.A,
    kanGrubuRh: KanGrubuRh.RhPozitif,
    darpDurumu: "Hayır",
    ortam: false,
  };

  const validationSchema = Yup.object({
    adi: Yup.string()
      .required("Ad alanı zorunludur.")
      .min(3, "Ad en az 3 karakter olmalıdır."),
    soyadi: Yup.string()
      .required("Soyad alanı zorunludur.")
      .max(20, "Soyad en fazla 20 karakter olmalıdır."),
    yas: Yup.number()
      .typeError("Yaş alanı sayı olmalıdır.")
      .required("Yaş alanı zorunludur."),
    cinsiyet: Yup.string().required("Cinsiyet alanı zorunludur."),
    kanGrubu: Yup.string().required("Kan grubu alanı zorunludur."),
    darpDurumu: Yup.string().required("Kan grubu alanı zorunludur."),
  });
  const onSubmit = (values: HastaBilgileri) => {
    const existingData = JSON.parse(
      localStorage.getItem("hastaBilgileri") || "[]"
    );
    const updatedData = [...existingData, values];
    localStorage.setItem("hastaBilgileri", JSON.stringify(updatedData));
    navigate("/genel-bilgi");
  };

  return (
    <div
      style={{
        position: "relative",
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
          <h2>Hasta Bilgileri</h2>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="adi">Adı:</label>
            <Field
              type="text"
              id="adi"
              name="adi"
              style={{ position: "relative", right: "-65px" }}
            />
          </div>
          <ErrorMessage name="adi" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="soyadi">Soyadı:</label>
            <Field
              type="text"
              id="soyadi"
              name="soyadi"
              style={{ position: "relative", right: "-40px" }}
            />
          </div>
          <ErrorMessage name="soyadi" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="yas">Yaş:</label>
            <Field
              type="number"
              id="yas"
              name="yas"
              style={{ position: "relative", right: "-65px" }}
            />
          </div>
          <ErrorMessage name="yas" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="cinsiyet">Cinsiyet:</label>
            <Field
              as="select"
              id="cinsiyet"
              name="cinsiyet"
              style={{ position: "relative", right: "-35px" }}
            >
              <option value={Cinsiyet.Erkek}>Erkek</option>
              <option value={Cinsiyet.Kadin}>Kadın</option>
            </Field>
          </div>
          <ErrorMessage name="cinsiyet" component="div" />

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="kanGrubuRh">Kan Grubu :</label>
            <Field
              as="select"
              id="kanGrubuRh"
              name="kanGrubuRh"
              style={{ position: "relative", right: "-12px" }}
            >
              {cascaderOptions}
            </Field>
          </div>
          <ErrorMessage name="kanGrubuRh" component="div" />

          <div style={{ marginBottom: "10px" }}>
            <label>Darp var mı?</label>
            <div>
              <label>
                <Field type="radio" name="darpDurumu" value="Evet" />
                Evet
              </label>
              <label>
                <Field type="radio" name="darpDurumu" value="Hayır" />
                Hayır
              </label>
            </div>
          </div>
          <ErrorMessage name="darpDurumu" component="div" />

          <div>
            <button
              style={{
                position: "relative",
                right: "-240px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
              type="submit"
            >
              Devam Et
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default HastaBilgileri;
