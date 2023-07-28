export interface Mock {
  total: {
    Quantidade: { x: number; y: number }[];
    "Preço Unitário": { x: number; y: number }[];
    "Tarifa Unitária": { x: number; y: number }[];
    Valor: { x: number; y: number }[];
  };
  energiaEletrica: {
    Quantidade: { x: number; y: number }[];
    "Preço Unitário": { x: number; y: number }[];
    "Tarifa Unitária": { x: number; y: number }[];
    Valor: { x: number; y: number }[];
  };
  energiaInjetada: {
    Quantidade: { x: number; y: number }[];
    "Preço Unitário": { x: number; y: number }[];
    "Tarifa Unitária": { x: number; y: number }[];
    Valor: { x: number; y: number }[];
  };
  icms: {
    Quantidade: { x: number; y: number }[];
    "Preço Unitário": { x: number; y: number }[];
    "Tarifa Unitária": { x: number; y: number }[];
  };
  icmsSt: {
    Valor: { x: number; y: number }[];
  };
  contribuicaoPublica: {
    Valor: { x: number; y: number }[];
  };
}

export const mock: Mock = {
  total: {
    Quantidade: [
      { x: 0, y: 1835 },
      { x: 1, y: 1427 },
      { x: 2, y: 407 },
      { x: 3, y: 551 },
      { x: 4, y: 1266 },
      { x: 5, y: 370 },
      { x: 6, y: 1045 },
      { x: 7, y: 620 },
      { x: 8, y: 1976 },
      { x: 9, y: 1113 },
      { x: 10, y: 1601 },
      { x: 11, y: 1875 },
    ],
    "Preço Unitário": [
      { x: 0, y: 1835 },
      { x: 1, y: 1427 },
      { x: 2, y: 407 },
      { x: 3, y: 551 },
      { x: 4, y: 1266 },
      { x: 5, y: 370 },
      { x: 6, y: 1045 },
      { x: 7, y: 620 },
      { x: 8, y: 1976 },
      { x: 9, y: 1113 },
      { x: 10, y: 1601 },
      { x: 11, y: 1875 },
    ],
    "Tarifa Unitária": [
      { x: 0, y: 1835 },
      { x: 1, y: 1427 },
      { x: 2, y: 407 },
      { x: 3, y: 551 },
      { x: 4, y: 1266 },
      { x: 5, y: 370 },
      { x: 6, y: 1045 },
      { x: 7, y: 620 },
      { x: 8, y: 1976 },
      { x: 9, y: 1113 },
      { x: 10, y: 1601 },
      { x: 11, y: 1875 },
    ],
    Valor: [
      { x: 0, y: 1023 },
      { x: 1, y: 1619 },
      { x: 2, y: 1095 },
      { x: 3, y: 29 },
      { x: 4, y: 163 },
      { x: 5, y: 376 },
      { x: 6, y: 432 },
      { x: 7, y: 937 },
      { x: 8, y: 1798 },
      { x: 9, y: 307 },
      { x: 10, y: 609 },
      { x: 11, y: 1079 },
    ],
  },
  energiaEletrica: {
    Quantidade: [
      { x: 0, y: 1224 },
      { x: 1, y: 1504 },
      { x: 2, y: 1202 },
      { x: 3, y: 1009 },
      { x: 4, y: 747 },
      { x: 5, y: 1497 },
      { x: 6, y: 1340 },
      { x: 7, y: 79 },
      { x: 8, y: 271 },
      { x: 9, y: 373 },
      { x: 10, y: 1961 },
      { x: 11, y: 1519 },
    ],
    "Preço Unitário": [
      { x: 0, y: 1835 },
      { x: 1, y: 1427 },
      { x: 2, y: 407 },
      { x: 3, y: 551 },
      { x: 4, y: 1266 },
      { x: 5, y: 370 },
      { x: 6, y: 1045 },
      { x: 7, y: 620 },
      { x: 8, y: 1976 },
      { x: 9, y: 1113 },
      { x: 10, y: 1601 },
      { x: 11, y: 1875 },
    ],
    "Tarifa Unitária": [
      { x: 0, y: 1023 },
      { x: 1, y: 1619 },
      { x: 2, y: 1095 },
      { x: 3, y: 29 },
      { x: 4, y: 163 },
      { x: 5, y: 376 },
      { x: 6, y: 432 },
      { x: 7, y: 937 },
      { x: 8, y: 1798 },
      { x: 9, y: 307 },
      { x: 10, y: 609 },
      { x: 11, y: 1079 },
    ],
    Valor: [
      { x: 0, y: 1023 },
      { x: 1, y: 1619 },
      { x: 2, y: 1095 },
      { x: 3, y: 29 },
      { x: 4, y: 163 },
      { x: 5, y: 376 },
      { x: 6, y: 432 },
      { x: 7, y: 937 },
      { x: 8, y: 1798 },
      { x: 9, y: 307 },
      { x: 10, y: 609 },
      { x: 11, y: 1079 },
    ],
  },
  energiaInjetada: {
    Quantidade: [
      { x: 0, y: 1023 },
      { x: 1, y: 1619 },
      { x: 2, y: 1095 },
      { x: 3, y: 29 },
      { x: 4, y: 163 },
      { x: 5, y: 376 },
      { x: 6, y: 432 },
      { x: 7, y: 937 },
      { x: 8, y: 1798 },
      { x: 9, y: 307 },
      { x: 10, y: 609 },
      { x: 11, y: 1079 },
    ],
    "Preço Unitário": [
      { x: 0, y: 1023 },
      { x: 1, y: 1619 },
      { x: 2, y: 1095 },
      { x: 3, y: 29 },
      { x: 4, y: 163 },
      { x: 5, y: 376 },
      { x: 6, y: 432 },
      { x: 7, y: 937 },
      { x: 8, y: 1798 },
      { x: 9, y: 307 },
      { x: 10, y: 609 },
      { x: 11, y: 1079 },
    ],
    "Tarifa Unitária": [
      { x: 0, y: 1835 },
      { x: 1, y: 1427 },
      { x: 2, y: 407 },
      { x: 3, y: 551 },
      { x: 4, y: 1266 },
      { x: 5, y: 370 },
      { x: 6, y: 1045 },
      { x: 7, y: 620 },
      { x: 8, y: 1976 },
      { x: 9, y: 1113 },
      { x: 10, y: 1601 },
      { x: 11, y: 1875 },
    ],
    Valor: [
      { x: 0, y: 922 },
      { x: 1, y: 1089 },
      { x: 2, y: 371 },
      { x: 3, y: 1368 },
      { x: 4, y: 1121 },
      { x: 5, y: 1939 },
      { x: 6, y: 553 },
      { x: 7, y: 518 },
      { x: 8, y: 618 },
      { x: 9, y: 810 },
      { x: 10, y: 1785 },
      { x: 11, y: 537 },
    ],
  },
  icms: {
    Quantidade: [
      { x: 0, y: 91 },
      { x: 1, y: 1178 },
      { x: 2, y: 1945 },
      { x: 3, y: 90 },
      { x: 4, y: 695 },
      { x: 5, y: 853 },
      { x: 6, y: 1540 },
      { x: 7, y: 619 },
      { x: 8, y: 0 },
      { x: 9, y: 1698 },
      { x: 10, y: 1185 },
      { x: 11, y: 1787 },
    ],
    "Preço Unitário": [
      { x: 0, y: 900 },
      { x: 1, y: 879 },
      { x: 2, y: 521 },
      { x: 3, y: 1354 },
      { x: 4, y: 1354 },
      { x: 5, y: 872 },
      { x: 6, y: 716 },
      { x: 7, y: 486 },
      { x: 8, y: 1688 },
      { x: 9, y: 1493 },
      { x: 10, y: 815 },
      { x: 11, y: 520 },
    ],
    "Tarifa Unitária": [
      { x: 0, y: 922 },
      { x: 1, y: 1089 },
      { x: 2, y: 371 },
      { x: 3, y: 1368 },
      { x: 4, y: 1121 },
      { x: 5, y: 1939 },
      { x: 6, y: 553 },
      { x: 7, y: 518 },
      { x: 8, y: 618 },
      { x: 9, y: 810 },
      { x: 10, y: 1785 },
      { x: 11, y: 537 },
    ],
  },
  icmsSt: {
    Valor: [
      { x: 0, y: 900 },
      { x: 1, y: 879 },
      { x: 2, y: 521 },
      { x: 3, y: 1354 },
      { x: 4, y: 1354 },
      { x: 5, y: 872 },
      { x: 6, y: 716 },
      { x: 7, y: 486 },
      { x: 8, y: 1688 },
      { x: 9, y: 1493 },
      { x: 10, y: 815 },
      { x: 11, y: 520 },
    ],
  },
  contribuicaoPublica: {
    Valor: [
      { x: 0, y: 922 },
      { x: 1, y: 1089 },
      { x: 2, y: 371 },
      { x: 3, y: 1368 },
      { x: 4, y: 1121 },
      { x: 5, y: 1939 },
      { x: 6, y: 553 },
      { x: 7, y: 518 },
      { x: 8, y: 618 },
      { x: 9, y: 810 },
      { x: 10, y: 1785 },
      { x: 11, y: 537 },
    ],
  },
};
