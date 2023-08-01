import {
  valueToNameMap,
  Mock,
  generatePercentage,
  formatHint,
} from "../../features";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  Button,
  Container,
  DropdownButtonContainer,
  DropdownContentContainer,
  Graphic,
  Line,
  List,
  LoaderDiv,
  OptionItem,
  Options,
  Send,
  Statistics,
  Title,
} from "./style";
import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  Hint,
} from "react-vis";
import { useContext, useEffect, useMemo, useState } from "react";
import { theme } from "../../styles";
import { ucData } from "../../client/boletos";
import { toastrError } from "../../features/toastr";
import { Loader } from "../index";
import { IContext, MyContext } from "../../context/Boleto";

export function DashboardStatistic() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown, setDropdown] = useState("Quantidade");
  const [lines, setLines] = useState(["total"]);
  const { currentUc, year } = useContext<IContext>(MyContext);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const [data, setData] = useState<Mock>();
  const [hint, setHint] = useState(-1);

  const width = typeof window !== "undefined" ? window.innerWidth : 900;

  useMemo(() => {
    (async () => {
      if (currentUc) {
        const [, numberUc] = currentUc.split(" - ");

        setIsLoading(true);

        await ucData(numberUc, year)
          .then((val) => {
            if (val.message) toastrError(val.message);
            else
              setData({
                total: val.Total,
                energiaEletrica: val["Energia Elétrica"],
                energiaInjetada: val["Energia Injetada"],
                icms: val["ICMS"],
                icmsSt: val["ICMS-ST"],
                contribuicaoPublica: val["Contribuição"],
              });
          })
          .finally(() => setIsLoading(false));
      }
    })();
  }, [currentUc, year]);

  const customTickFormatXAxis = (tickValue: number) => {
    return valueToNameMap[tickValue] || "";
  };

  const customTickFormatYAxis = (tickValue: number) => {
    if (dropdown === "Quantidade") return `${tickValue} kWh`;

    return `R$ ${tickValue.toFixed(2)}`;
  };

  function findNearestPosition(val: { clientX: number }) {
    const mouseX = val.clientX - 100;
    const dataList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const xScale =
      width > 1450
        ? 800 / dataList.length
        : width > 1170
        ? 550 / dataList.length
        : width > 830
        ? 200 / dataList.length
        : (width - 150) / dataList.length;

    let nearestIndex = 0;
    let minDistance = Math.abs(mouseX - dataList[0] * xScale);

    for (let i = 1; i < dataList.length; i++) {
      const distance = Math.abs(mouseX - dataList[i] * xScale);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    const nearestValue = dataList[nearestIndex];

    setHint(nearestValue);
  }

  function changeLines(name: string) {
    if (!lines.includes(name)) {
      setLines((old) => [...old, name]);
    } else {
      const newLines = lines.filter((val) => val !== name);
      setLines(newLines);
    }
  }

  function selectItems() {
    switch (dropdown) {
      case "Quantidade":
        return (
          <Options>
            <OptionItem
              onClick={() => changeLines("total")}
              active={lines.includes("total") ? "true" : ""}
            >
              Total
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica") ? "true" : ""}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaInjetada")}
              active={lines.includes("energiaInjetada") ? "true" : ""}
              color={theme.colors.pink}
            >
              Energia Injetada
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icms")}
              active={lines.includes("icms") ? "true" : ""}
              color={theme.colors.ciano}
            >
              ICMS
            </OptionItem>
          </Options>
        );

      case "Valor":
        return (
          <Options>
            <OptionItem
              onClick={() => changeLines("total")}
              active={lines.includes("total") ? "true" : ""}
            >
              Total
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica") ? "true" : ""}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icmsSt")}
              active={lines.includes("icmsSt") ? "true" : ""}
              color={theme.colors.green}
            >
              ICMS-ST
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("contribuicaoPublica")}
              active={lines.includes("contribuicaoPublica") ? "true" : ""}
              color={theme.colors.grey}
            >
              Contribuição Pública
            </OptionItem>
          </Options>
        );

      default:
        return (
          <Options>
            <OptionItem
              onClick={() => changeLines("total")}
              active={lines.includes("total") ? "true" : ""}
            >
              Total
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica") ? "true" : ""}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaInjetada")}
              active={lines.includes("energiaInjetada") ? "true" : ""}
              color={theme.colors.pink}
            >
              Energia Injetada
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icms")}
              active={lines.includes("icms") ? "true" : ""}
              color={theme.colors.ciano}
            >
              ICMS
            </OptionItem>
          </Options>
        );
    }
  }

  return !isLoading ? (
    data?.total.Valor.find((val) => val.y > 0) ? (
      <Container data-testid="dashboard-statistics">
        <Send>
          <Title>Detalhes dos gastos</Title>
          <DropdownButtonContainer>
            <Button onClick={handleDropdownToggle}>
              <RiArrowDownSFill />
              {dropdown}
            </Button>
            {isDropdownOpen && (
              <DropdownContentContainer>
                {[
                  "Quantidade",
                  "Preço Unitário",
                  "Tarifa Unitária",
                  "Valor",
                ].map((val, i) => {
                  return (
                    val !== dropdown && (
                      <div
                        key={i}
                        onClick={() => {
                          setDropdown(val);
                          setDropdownOpen(false);
                        }}
                      >
                        {val}
                      </div>
                    )
                  );
                })}
              </DropdownContentContainer>
            )}
          </DropdownButtonContainer>
        </Send>
        {data ? (
          <Statistics>
            <Graphic>
              <XYPlot
                onMouseLeave={() => setHint(-1)}
                onMouseMove={findNearestPosition}
                margin={{ left: 80 }}
                height={450}
                width={
                  width > 1450
                    ? 900
                    : width > 1170
                    ? 600
                    : width > 830
                    ? 300
                    : width - 25
                }
              >
                {hint > -1 && lines.length > 0 ? (
                  <Hint
                    format={(val) => formatHint(val, dropdown)}
                    value={{
                      totalValues: lines.map((value) => {
                        return data[value][dropdown]
                          ? {
                              value,
                              x: hint,
                              y: data[value][dropdown].filter(
                                (val) => val.x === hint
                              )[0].y,
                            }
                          : { x: hint, y: 0 };
                      }),
                      x: hint,
                      y: data[lines[0]][dropdown]
                        ? data[lines[0]][dropdown].filter(
                            (val) => val.x === hint
                          )[0].y
                        : 0,
                    }}
                  />
                ) : null}
                <ChartLabel
                  text="Mês"
                  className="alt-x-label"
                  includeMargin={false}
                  xPercent={0.01}
                  yPercent={1.01}
                />
                <ChartLabel
                  text={dropdown === "Quantidade" ? "Valor kWh" : "Valor R$"}
                  className="alt-y-label"
                  includeMargin={false}
                  xPercent={0.02}
                  yPercent={0.02}
                  style={{
                    transform: "rotate(-90)",
                    textAnchor: "end",
                  }}
                />
                {lines.includes("total") ? (
                  <LineSeries
                    data={data.total[dropdown] ? data.total[dropdown] : []}
                    color={theme.colors.blue}
                  />
                ) : (
                  <LineSeries data={[{ x: 1, y: 1 }]} color="transparent" />
                )}
                {lines.includes("energiaEletrica") ? (
                  <LineSeries
                    data={
                      data.energiaEletrica[dropdown]
                        ? data.energiaEletrica[dropdown]
                        : [null]
                    }
                    color={theme.colors.red}
                  />
                ) : null}
                {lines.includes("energiaInjetada") ? (
                  <LineSeries
                    data={
                      data.energiaInjetada[dropdown]
                        ? data.energiaInjetada[dropdown]
                        : []
                    }
                    color={theme.colors.pink}
                  />
                ) : null}
                {lines.includes("icms") ? (
                  <LineSeries
                    data={data.icms[dropdown] ? data.icms[dropdown] : []}
                    color={theme.colors.ciano}
                  />
                ) : null}
                {lines.includes("icmsSt") ? (
                  <LineSeries
                    data={data.icmsSt[dropdown] ? data.icmsSt[dropdown] : []}
                    color={theme.colors.green}
                  />
                ) : null}
                {lines.includes("contribuicaoPublica") ? (
                  <LineSeries
                    data={
                      data.contribuicaoPublica[dropdown]
                        ? data.contribuicaoPublica[dropdown]
                        : []
                    }
                    color={theme.colors.grey}
                  />
                ) : null}
                {hint > -1 ? (
                  <VerticalGridLines
                    tickValues={[hint]}
                    style={{ stroke: "#000" }}
                  />
                ) : null}
                <XAxis
                  style={{ line: { stroke: "rgba(0,0,0,0.5)" } }}
                  tickFormat={customTickFormatXAxis}
                />
                <YAxis
                  style={{ line: { stroke: "rgba(0,0,0,0.5)" } }}
                  tickFormat={customTickFormatYAxis}
                />
                <VerticalGridLines />
                <HorizontalGridLines />
              </XYPlot>
              {selectItems()}
            </Graphic>
            <Line />
            <List>
              <h3>Valores comparados á ultima fatura</h3>
              <div>
                <p>Energia Elétrica</p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaEletrica",
                    "Quantidade",
                    "A"
                  )}
                </p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaEletrica",
                    "Preço Unitário",
                    "O"
                  )}
                </p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaEletrica",
                    "Tarifa Unitária",
                    "A"
                  )}
                </p>
              </div>
              <div>
                <p>Energia Injetada</p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaInjetada",
                    "Quantidade",
                    "A"
                  )}
                </p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaInjetada",
                    "Preço Unitário",
                    "O"
                  )}
                </p>
                <p>
                  {generatePercentage(
                    data,
                    "energiaInjetada",
                    "Tarifa Unitária",
                    "A"
                  )}
                </p>
              </div>
              <div>
                <p>ICMS</p>
                <p>{generatePercentage(data, "icms", "Quantidade", "A")}</p>
                <p>{generatePercentage(data, "icms", "Preço Unitário", "O")}</p>
                <p>
                  {generatePercentage(data, "icms", "Tarifa Unitária", "A")}
                </p>
              </div>
            </List>
          </Statistics>
        ) : (
          <div data-testid="dashboard-statistics" />
        )}
      </Container>
    ) : (
      <div data-testid="dashboard-statistics" />
    )
  ) : (
    <LoaderDiv data-testid="dashboard-statistics">
      <Loader size={100} />
    </LoaderDiv>
  );
}
