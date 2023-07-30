// contexts/MyContext.js
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { getUcs } from "../client/boletos";
import { toastrError } from "../features/toastr";

const MyContext = createContext({});

export interface IContext {
  currentUc: string;
  setCurrentUc: (value: string) => void;
  ucs: string[];
  setUcs: (value: string[]) => void;
}

const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUc, setCurrentUc] = useState("");
  const [ucs, setUcs] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await getUcs().then((res) => {
        if (res.message) toastrError(res.message);
        else {
          setUcs(res);

          if (res.length) {
            setCurrentUc(res[0]);
          }
        }
      });
    })();
  }, []);

  return (
    <MyContext.Provider value={{ currentUc, setCurrentUc, ucs, setUcs }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
