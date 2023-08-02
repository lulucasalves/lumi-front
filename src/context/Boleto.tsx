// contexts/MyContext.js
import React, { ReactNode, createContext, useMemo, useState } from "react";
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

  const fetchUcsAndYears = async (maxRetries: number, currentRetry: number) => {
    try {
      const res = (await getUcsAndYears()) as any;
      if (res.message) {
        toastrError(res.message);
      } else {
        const getUcs = res.ucs;
        const getYears = res.years;

        setUcs(getUcs);
        if (getUcs.length) {
          setCurrentUc(getUcs[0]);
        }

        setYears(getYears);
        if (getYears.length) {
          setYear(getYears[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching ucs and years:", error.message);
      if (currentRetry < maxRetries) {
        // Try again after a short delay (2 seconds in this example)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await fetchUcsAndYears(maxRetries, currentRetry + 1);
      } else {
        console.error("Max retries reached. Unable to fetch ucs and years.");
        toastrError("Max retries reached. Unable to fetch ucs and years.");
      }
    }
  };

  useMemo(() => {
    fetchUcsAndYears(10, 1); // Try up to 5 times with an initial retry count of 1
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
