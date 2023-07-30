import { Oval } from "react-loader-spinner";
import { theme } from "../../styles";

export function Loader({ size }: { size: number }) {
  return (
    <div data-testid="loader">
      <Oval
        height={size}
        width={size}
        color={theme.colors.secondary}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={theme.colors.secondary}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
