import { HistoricHeader } from "~/components";
import { Container, Content, Send, SendButton, Title } from "./style";
import { BsArrowRightCircle, BsDownload, BsTrash3 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { changeStateData, deletePdf, ucList } from "~/client/boletos";
import { IContext, MyContext } from "~/context/Boleto";

export function Historic() {
  const [historic, setHistoric] = useState();
  const { currentUc } = useContext<IContext>(MyContext);

  function realModel(value: number) {
    if (!value) return "-";

    return `R$ ${value.toFixed(2)}`;
  }

  function changeState(value: boolean, id: string) {
    (async () => {
      await changeStateData(id, !value).then((res) => setHistoric(res));
    })();
  }

  function deleteState(id: string) {
    (async () => {
      await deletePdf(id).then((res) => setHistoric(res));
    })();
  }

  useEffect(() => {
    const [, numberUc] = currentUc.split(" - ");

    (async () => {
      await ucList(numberUc).then((val) => setHistoric(val));
    })();
  }, [currentUc]);
  return (
    <Container>
      <HistoricHeader />
      <Content>
        <Send>
          <Title>Lista de boletos</Title>
          <SendButton>
            <BsArrowRightCircle size={24} />
            <p>Enviar boleto</p>
          </SendButton>
        </Send>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Data de emissão</th>
              <th>Data de vencimento</th>
              <th>Energia elétrica</th>
              <th>ICMS-ST</th>
              <th>2° Via de débito</th>
              <th>Valor total</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {historic
              ? historic.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{val.dataEmissao}</td>
                      <td>{val.dataVencimento}</td>
                      <td>{realModel(val.energiaEletrica)}</td>
                      <td>{realModel(val.icmsSt)}</td>
                      <td>{realModel(val.segundaVia)}</td>
                      <td>{realModel(val.total)}</td>
                      <td onClick={() => changeState(val.payed, val.id)}>
                        <button className={val.payed ? "payed" : "no-payed"}>
                          {val.payed ? "Pago" : "Não Pago"}
                        </button>
                      </td>
                      <td>
                        <div>
                          <div onClick={() => window.open(val.url, "_blank")}>
                            <BsDownload size={22} />
                          </div>
                          <div onClick={() => deleteState(val.id)}>
                            <BsTrash3 size={18} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
