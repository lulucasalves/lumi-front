import { useContext, useMemo, useState } from "react";
import {
  DashboardGraphic,
  DashboardHeader,
  DashboardStatistic,
} from "../../components";
import { Container, Content } from "./style";
import { IContext, MyContext } from "../../context/Boleto";
import { ucData, ucList } from "../../client/boletos";
import { toastrError } from "../../features/toastr";
import { transformHistoric } from "../../features/historic";
import { Mock } from "../../features";

export function Dashboard() {
  const { currentUc, year } = useContext<IContext>(MyContext);
  const [last, setLast] = useState({ value: "", url: "" });
  const [historic, setHistoric] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);
  const [data, setData] = useState([]);
  const [dataStatistic, setDataStatistic] = useState<Mock>();

  function getDataState() {
    if (currentUc) {
      (async () => {
        const [, numberUc] = currentUc.split(" - ");

        setIsLoadingList(true);
        setIsLoadingGraph(true);

        await ucData(numberUc, year)
          .then((val) => {
            if (val.message) toastrError(val.message);
            else {
              setData(val.Total.Valor.sort((a, b) => a.x - b.x));

              setDataStatistic({
                total: val.Total,
                energiaEletrica: val["Energia Elétrica"],
                energiaInjetada: val["Energia Injetada"],
                icms: val["ICMS"],
                icmsSt: val["ICMS-ST"],
                contribuicaoPublica: val["Contribuição"],
              });
            }
          })
          .finally(() => setIsLoadingGraph(false));

        setLast({ value: "", url: "" });

        await ucList(numberUc, year)
          .then((val) => {
            if (val.message) toastrError(val.message);
            else {
              setHistoric(transformHistoric(val));
              const value = ordenarPorDataEmissao(val)[0];

              if (value) {
                setLast({
                  value: `R$ ${value.total.toFixed(2)}`,
                  url: value.url,
                });
              } else {
                setLast({
                  value: `R$ 0,00`,
                  url: "value.url",
                });
              }
            }
          })
          .finally(() => setIsLoadingList(false));
      })();
    }
  }

  function ordenarPorDataEmissao(listaDeObjetos) {
    const convertToDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const sortedList = listaDeObjetos.sort((a, b) => {
      const dateA = convertToDate(a.dataEmissao);
      const dateB = convertToDate(b.dataEmissao);
      return dateA - dateB;
    });

    return sortedList.reverse();
  }

  useMemo(() => {
    getDataState();
  }, [currentUc, year]);

  return (
    <Container data-testid="dashboard-page">
      <DashboardHeader last={last} />
      <Content>
        <DashboardGraphic
          isLoadingGraph={isLoadingGraph}
          getDataState={getDataState}
          historic={historic}
          isLoadingList={isLoadingList}
          data={data}
        />
        <DashboardStatistic data={dataStatistic} isLoading={isLoadingGraph} />
      </Content>
    </Container>
  );
}
