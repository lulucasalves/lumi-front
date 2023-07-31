// contexts/MyContext.js
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { getUcsAndYears } from "../client/boletos";
import { toastrError } from "../features/toastr";

const MyContext = createContext({});

export interface IContext {
  year: string;
  setYear: (value: string) => void;
  years: string[];
  setYears: (value: string[]) => void;
  currentUc: string;
  setCurrentUc: (value: string) => void;
  ucs: string[];
  setUcs: (value: string[]) => void;
}

const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUc, setCurrentUc] = useState("");
  const [year, setYear] = useState("2023");
  const [years, setYears] = useState(["2023"]);
  const [ucs, setUcs] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await getUcsAndYears().then((res) => {
        if (res.message) toastrError(res.message);
        else {
          const getUcs = res.ucs;
          const getYears = res.years;

          setUcs(getUcs);

          if (getUcs.length) {
            setCurrentUc(getUcs[0]);
          }

          setYears(getYears);

          if (getYears.length) {
            setCurrentUc(getYears[0]);
          }
        }
      });
    })();
  }, []);

  return (
    <MyContext.Provider
      value={{
        currentUc,
        setCurrentUc,
        ucs,
        setUcs,
        year,
        setYear,
        years,
        setYears,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
