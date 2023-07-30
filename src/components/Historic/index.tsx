import { HistoricHeader } from "~/components";
import {
  Container,
  Content,
  LoaderDiv,
  Send,
  SendButton,
  Title,
} from "./style";
import { BsArrowRightCircle, BsDownload, BsTrash3 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { addPdf, changeStateData, deletePdf, ucList } from "~/client/boletos";
import { IContext, MyContext } from "~/context/Boleto";
import { Loader } from "../Loader";
import { toastrError, toastrSuccess } from "~/features/toastr";

export function Historic() {
  const [historic, setHistoric] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUc } = useContext<IContext>(MyContext);
  const [isSending, setIsSending] = useState(false);

  function realModel(value: number | string) {
    if (!value || value === "-") return "-";

    console.log(value);

    return `R$ ${parseFloat(String(value).replace(",", ".")).toFixed(2)}`;
  }

  function changeState(value: boolean, id: string) {
    setIsLoading(true);
    (async () => {
      await changeStateData(id, !value)
        .then((res) => {
          if (res.message) toastrError(res.message);
          else {
            toastrSuccess("Dados atualizados com sucesso!");
            setHistoric(res);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }

  function deleteState(id: string) {
    setIsLoading(true);
    (async () => {
      await deletePdf(id)
        .then((res) => {
          if (res.message) toastrError(res.message);
          else {
            toastrSuccess("Boleto deletado com sucesso!");
            setHistoric(res);
          }
        })
        .finally(() => setIsLoading(false));
    })();
  }

  useEffect(() => {
    const [, numberUc] = currentUc.split(" - ");

    (async () => {
      await ucList(numberUc)
        .then((val) => {
          if (val.message) toastrError(val.message);
          else setHistoric(val);
        })
        .finally(() => setIsLoading(false));
    })();
  }, [currentUc]);

  function handleUpload() {
    if (!isSending) {
      document.getElementById("inputFile").click();
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      setIsSending(true);
      setIsLoading(true);
      (async () => {
        await addPdf(formData)
          .then((val) => {
            if (val.message) toastrError(val.message);
            else {
              toastrSuccess("Boleto enviado com sucesso!");
              setHistoric(val);
            }
          })
          .finally(() => {
            setIsLoading(false);
            setIsSending(false);
          });
      })();

      event.target.value = null;
    }
  };

  const convertToDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };
  return (
    <Container>
      <HistoricHeader />
      {!isLoading ? (
        <Content>
          <Send>
            <Title>Lista de boletos</Title>
            <SendButton onClick={handleUpload}>
              <BsArrowRightCircle size={24} />
              <p>{!isSending ? "Enviar boleto" : "Enviando..."}</p>
            </SendButton>
          </Send>
          <input
            id="inputFile"
            style={{ visibility: "hidden" }}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <div>
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
                  ? historic
                      .sort((a, b) => {
                        const dateA = convertToDate(a.dataEmissao);
                        const dateB = convertToDate(b.dataEmissao);
                        return dateB - dateA;
                      })
                      .map((val, i) => {
                        console.log(val);
                        return (
                          <tr key={i}>
                            <td>{val.dataEmissao}</td>
                            <td>{val.dataVencimento}</td>
                            <td>{realModel(val.energiaEletrica)}</td>
                            <td>{realModel(val.icmsSt)}</td>
                            <td>{realModel(val.viaDebito)}</td>
                            <td>{realModel(val.total)}</td>
                            <td onClick={() => changeState(val.payed, val.id)}>
                              <button
                                className={val.payed ? "payed" : "no-payed"}
                              >
                                {val.payed ? "Pago" : "Não Pago"}
                              </button>
                            </td>
                            <td>
                              <div>
                                <div
                                  onClick={() => window.open(val.url, "_blank")}
                                >
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
          </div>
        </Content>
      ) : (
        <LoaderDiv>
          <Loader size={100} />
        </LoaderDiv>
      )}
    </Container>
  );
}
