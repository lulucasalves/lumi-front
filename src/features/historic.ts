export function transformHistoric(val) {
  const meses = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  };

  // Objeto no formato desejado
  let objetoTransformado = [
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
  ];

  // Percorrer o objeto recebido e atualizar o objeto transformado
  val.forEach((item) => {
    const dataEmissaoParts = item.dataEmissao.split("/");
    const monthIndex = dataEmissaoParts[1];
    const monthName = meses[monthIndex];

    const index = objetoTransformado.findIndex(
      (obj) => obj.month === monthName
    );
    if (index !== -1) {
      objetoTransformado[index].value += item.total;
      objetoTransformado[index].payed = item.payed;
    }
  });

  console.log(objetoTransformado)

  return objetoTransformado;
}
