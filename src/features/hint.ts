import { valueToNameMap } from ".";

export const translateMonths = {
  JAN: "Janeiro",
  FEV: "Fevereiro",
  MAR: "Março",
  ABR: "Abril",
  MAI: "Maio",
  JUN: "Junho",
  JUL: "Julho",
  AGO: "Agosto",
  SET: "Setembro",
  OUT: "Outubro",
  NOV: "Novembro",
  DEZ: "Dezembro",
};

const translateThemes = {
  energiaEletrica: "Energia Elétrica",
  energiaInjetada: "Energia Injetada",
  total: "Total",
  contribuicaoPublica: "Contribuição Publica",
  icms: "ICMS",
  icmsSt: "ICMS-ST",
};

const customTickFormatYAxis = (tickValue: number, dropdown: string) => {
  if (dropdown === "Quantidade") return `${tickValue} kWh`;

  return `R$ ${tickValue.toFixed(2)}`;
};

export function formatHint(
  totalValues: { totalValues: { x: number; y: number; value: string }[] },
  dropdown: string
) {
  const val = totalValues.totalValues;
  let responses = [
    {
      title: "Mês",
      value: translateMonths[valueToNameMap[val[0].x]],
    },
  ];

  for (const allValues of val) {
    responses = [
      ...responses,
      {
        title: translateThemes[allValues.value],
        value: customTickFormatYAxis(allValues.y, dropdown),
      },
    ];
  }

  return responses;
}
