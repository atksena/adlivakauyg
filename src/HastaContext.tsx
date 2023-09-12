import React, { createContext, useState, useContext, useEffect } from "react";

type HastaBilgileri = {
  adi: string;
  soyadi: string;
  yas: number;
  cinsiyet: "Erkek" | "Kadın";
  kanGrubuRh: string;
  darpDurumu: "Evet" | "Hayır";
};

type GenelBilgi = {
  gelisNedeni:
    | "Etkili Eylem"
    | "Trafik Kazası"
    | "İş Kazası"
    | "Diğer Kazalar"
    | "İnsan Hakları İhlali İddiası"
    | "İntihar Girişimi"
    | "Zehirlenmeler";
  aciklamaSikayet: string;
  ortam: "Evet" | "Hayır";
  organizasyon: "A Hastanesi" | "B Hastanesi" | "C Hastanesi";
  doktor: string;
};

type HastaContextType = {
  hastaBilgileri: HastaBilgileri | null;
  setHastaBilgileri: (data: HastaBilgileri) => void;
  genelBilgi: GenelBilgi | null;
  setGenelBilgi: (data: GenelBilgi) => void;
};

const HastaContext = createContext<HastaContextType>({
  hastaBilgileri: null,
  setHastaBilgileri: () => {},
  genelBilgi: null,
  setGenelBilgi: () => {},
});

export const useHastaContext = () => useContext(HastaContext);

export const HastaProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [hastaBilgileri, setHastaBilgileri] = useState<HastaBilgileri | null>(
    null
  );
  const [genelBilgi, setGenelBilgi] = useState<GenelBilgi | null>(null);


  return (
    <HastaContext.Provider
      value={{
        hastaBilgileri,
        setHastaBilgileri,
        genelBilgi,
        setGenelBilgi,
      }}
    >
      {children}
    </HastaContext.Provider>
  );
};
