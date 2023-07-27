import { valueToNameMap } from "~/features";
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
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const [data, setData] = useState([
    { x: 0, y: 333 },
    { x: 1, y: 1022 },
    { x: 2, y: 856 },
    { x: 3, y: 1211 },
    { x: 4, y: 343 },
    { x: 5, y: 556 },
    { x: 6, y: 1577 },
    { x: 7, y: 1245 },
    { x: 8, y: 344 },
    { x: 9, y: 500 },
    { x: 10, y: 1534 },
    { x: 11, y: 800 },
  ]);
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

  function findNearestPosition(val) {
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

  function formatHint(val: { x: number; y: number }) {
    return [
      { title: "Mês", value: valueToNameMap[val.x] },
      { title: "Fatura", value: customTickFormatYAxis(val.y) },
    ];
  }

  function selectItems() {
    switch (dropdown) {
      case "Quantidade":
        return (
          <Options>
            <OptionItem>Total</OptionItem>
            <OptionItem color={theme.colors.red}>Energia Elétrica</OptionItem>
            <OptionItem color={theme.colors.pink}>Energia Injetada</OptionItem>
            <OptionItem color={theme.colors.ciano}>ICMS</OptionItem>
          </Options>
        );

      case "Valor":
        return (
          <Options>
            <OptionItem>Total</OptionItem>
            <OptionItem color={theme.colors.red}>Energia Elétrica</OptionItem>
            <OptionItem color={theme.colors.pink}>Energia Injetada</OptionItem>
            <OptionItem color={theme.colors.green}>ICMS-ST</OptionItem>
            <OptionItem color={theme.colors.grey}>
              Contribuição Pública
            </OptionItem>
          </Options>
        );

      default:
        return (
          <Options>
            <OptionItem color={theme.colors.red}>Energia Elétrica</OptionItem>
            <OptionItem color={theme.colors.pink}>Energia Injetada</OptionItem>
            <OptionItem color={theme.colors.ciano}>ICMS</OptionItem>
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
            {hint > -1 ? (
              <Hint
                format={formatHint}
                align="center"
                value={{
                  x: hint,
                  y: data.filter((val) => val.x === hint)[0].y,
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
            <LineSeries data={data} color={theme.colors.blue} />
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
          <h3>Valores comparados ao último mês</h3>
          <div>
            <p>Energia Elétrica</p>
            <p>Aumentou a quantidade em 18%</p>
            <p>Aumentou o preço unitário em 21%</p>
            <p>Aumentou a tarifa unitária em 7%</p>
          </div>
          <div>
            <p>Energia Injetada</p>
            <p>Aumentou a quantidade em 18%</p>
            <p>Aumentou o preço unitário em 21%</p>
            <p>Aumentou a tarifa unitária em 7%</p>
          </div>
          <div>
            <p>ICMS</p>
            <p>Aumentou a quantidade em 18%</p>
            <p>Aumentou o preço unitário em 21%</p>
            <p>Aumentou a tarifa unitária em 7%</p>
          </div>
        </List>
      </Stastitics>
    </Container>
  );
}
