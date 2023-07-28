import {
  valueToNameMap,
  mock,
  Mock,
  generatePercentage,
  formatHint,
} from "~/features";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  Button,
  Container,
  DropdownButtonContainer,
  DropdownContentContainer,
  Graphic,
  Line,
  List,
  OptionItem,
  Options,
  Send,
  Stastitics,
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
import { useState } from "react";
import { theme } from "~/styles";

export function DashboardStatistic() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown, setDropdown] = useState("Quantidade");
  const [lines, setLines] = useState(["total"]);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const [data, setData] = useState<Mock>(mock);
  const [hint, setHint] = useState(-1);
  const [historic, setHistoric] = useState([
    { month: "Janeiro", value: 0, payed: false },
    { month: "Fevereiro", value: 0, payed: false },
    { month: "Março", value: 0, payed: false },
    { month: "Abril", value: 0, payed: false },
    { month: "Maio", value: 0, payed: false },
    { month: "Junho", value: 0, payed: false },
    { month: "Julho", value: 0, payed: false },
    { month: "Agosto", value: 0, payed: false },
    { month: "Setembro", value: 0, payed: false },
    { month: "Outubro", value: 0, payed: false },
    { month: "Novembro", value: 0, payed: false },
    { month: "Dezembro", value: 0, payed: false },
  ]);

  const customTickFormatXAxis = (tickValue: number) => {
    return valueToNameMap[tickValue] || "";
  };

  const customTickFormatYAxis = (tickValue: number) => {
    if (dropdown === "Quantidade") return `${tickValue} VHW`;

    return `R$ ${tickValue.toFixed(2)}`;
  };

  function findNearestPosition(val: { clientX: number }) {
    const mouseX = val.clientX - 150;
    const dataList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const xScale = 800 / dataList.length;

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
              active={lines.includes("total")}
            >
              Total
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica")}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaInjetada")}
              active={lines.includes("energiaInjetada")}
              color={theme.colors.pink}
            >
              Energia Injetada
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icms")}
              active={lines.includes("icms")}
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
              active={lines.includes("total")}
            >
              Total
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica")}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaInjetada")}
              active={lines.includes("energiaInjetada")}
              color={theme.colors.pink}
            >
              Energia Injetada
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icmsSt")}
              active={lines.includes("icmsSt")}
              color={theme.colors.green}
            >
              ICMS-ST
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("contribuicaoPublica")}
              active={lines.includes("contribuicaoPublica")}
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
              onClick={() => changeLines("energiaEletrica")}
              active={lines.includes("energiaEletrica")}
              color={theme.colors.red}
            >
              Energia Elétrica
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("energiaInjetada")}
              active={lines.includes("energiaInjetada")}
              color={theme.colors.pink}
            >
              Energia Injetada
            </OptionItem>
            <OptionItem
              onClick={() => changeLines("icms")}
              active={lines.includes("icms")}
              color={theme.colors.ciano}
            >
              ICMS
            </OptionItem>
          </Options>
        );
    }
  }

  return (
    <Container>
      <Send>
        <Title>Detalhes dos gastos</Title>
        <DropdownButtonContainer>
          <Button onClick={handleDropdownToggle}>
            <RiArrowDownSFill />
            {dropdown}
          </Button>
          {isDropdownOpen && (
            <DropdownContentContainer>
              {["Quantidade", "Preço Unitário", "Tarifa Unitária", "Valor"].map(
                (val) => {
                  return (
                    val !== dropdown && (
                      <div
                        onClick={() => {
                          setDropdown(val);
                          setDropdownOpen(false);
                        }}
                      >
                        {val}
                      </div>
                    )
                  );
                }
              )}
            </DropdownContentContainer>
          )}
        </DropdownButtonContainer>
      </Send>
      <Stastitics>
        <Graphic>
          <XYPlot
            onMouseLeave={() => setHint(-1)}
            onMouseMove={findNearestPosition}
            margin={{ left: 80 }}
            height={450}
            width={900}
          >
            {hint > -1 && lines.length ? (
              <Hint
                format={(val) => formatHint(val, dropdown)}
                value={{
                  totalValues: lines.map((value) => {
                    return {
                      value,
                      x: hint,
                      y: data[value][dropdown].filter(
                        (val) => val.x === hint
                      )[0].y,
                    };
                  }),
                  x: hint,
                  y: data[lines[0]][dropdown].filter((val) => val.x === hint)[0]
                    .y,
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
              text={dropdown === "Quantidade" ? "Valor VHW" : "Valor R$"}
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
              {generatePercentage(data, "energiaEletrica", "Quantidade", "A")}
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
              {generatePercentage(data, "energiaInjetada", "Quantidade", "A")}
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
            <p>{generatePercentage(data, "icms", "Tarifa Unitária", "A")}</p>
          </div>
        </List>
      </Stastitics>
    </Container>
  );
}
