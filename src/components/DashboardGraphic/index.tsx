import { BsArrowRightCircle, BsCheckLg, BsX } from "react-icons/bs";
import { translateMonths, valueToNameMap } from "~/features";
import {
  Container,
  Line,
  List,
  Send,
  SendButton,
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
import { useEffect, useState } from "react";
import { theme } from "~/styles";
import { ucData, ucList } from "~/client/boletos";
import { transformHistoric } from "~/features/historic";

export function DashboardGraphic() {
  const [data, setData] = useState([]);

  const [hint, setHint] = useState(-1);
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    (async () => {
      await ucData("7202788969").then((val) => {
        setData(val.Total.Valor.sort((a, b) => a.x - b.x));
      });

      await ucList("7202788969").then((val) => {
        console.log(val);
        setHistoric(transformHistoric(val));
      });
    })();
  }, []);

  const customTickFormatXAxis = (tickValue: number) => {
    return valueToNameMap[tickValue] || "";
  };

  const customTickFormatYAxis = (tickValue: number) =>
    `R$ ${tickValue.toFixed(2)}`;

  function findNearestPosition(val) {
    const mouseX = val.clientX - 150;
    const dataList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // Encontrar o valor atual do mouse na escala de 0 a 800
    const xScale = 800 / dataList.length;

    // Encontrar o valor mais próximo do mouse na lista de números fornecida
    let nearestIndex = 0;
    let minDistance = Math.abs(mouseX - dataList[0] * xScale);

    for (let i = 1; i < dataList.length; i++) {
      const distance = Math.abs(mouseX - dataList[i] * xScale);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    // Obter o nome associado ao valor encontrado na lista usando o mapeamento valueToNameMap
    const nearestValue = dataList[nearestIndex];

    setHint(nearestValue);
  }

  function formatHint(val: { x: number; y: number }) {
    return [
      { title: "Mês", value: translateMonths[valueToNameMap[val.x]] },
      { title: "Fatura", value: customTickFormatYAxis(val.y) },
    ];
  }

  return (
    <Container>
      <Send>
        <Title>Suas faturas</Title>
        <SendButton>
          <BsArrowRightCircle size={24} />
          <p>Enviar boleto</p>
        </SendButton>
      </Send>
      <Stastitics>
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
            text="Gastos R$"
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
            <VerticalGridLines tickValues={[hint]} style={{ stroke: "#000" }} />
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
        <Line />
        <List>
          <h3>Últimas Faturas</h3>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Preço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historic &&
                historic.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{val.month}</td>
                      <td>{val.value ? `R$ ${val.value.toFixed(2)}` : "-"}</td>
                      <td>
                        <div>
                          {val.payed ? <BsCheckLg /> : <BsX size={18} />}
                          {val.payed ? "Pago" : "Não Pago"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </List>
      </Stastitics>
    </Container>
  );
}
