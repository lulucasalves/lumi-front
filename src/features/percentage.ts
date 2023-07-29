import { Mock } from "./mock";

export interface DataPoint {
  x: number;
  y: number;
}

function findLastTwoHighestY(data: DataPoint[]) {
  const filtered = data.filter((val) => val.y !== 0).sort((a, b) => b.x - a.x);
  return filtered.map((val) => val.y).slice(0, 2);
}

export function generatePercentage(
  mock: Mock,
  name: string,
  type: string,
  prefix: "A" | "O"
) {
  const data1 = mock[name][type];
  const lastTwoHighest1 = findLastTwoHighestY(data1);
  const percentage1 = (lastTwoHighest1[0] / lastTwoHighest1[1]) * 100 - 100;
  if (isNaN(percentage1)) {
    return "-";
  } else if (percentage1 === 0) {
    return `${prefix} ${type.toLowerCase()} não alterou o valor`;
  } else if (percentage1 < 0) {
    return `${prefix} ${type.toLowerCase()} diminui em ${(
      percentage1 * -1
    ).toFixed(2)}%`;
  } else {
    return `${prefix} ${type.toLowerCase()} aumentou em ${percentage1.toFixed(
      2
    )}%`;
  }
}
