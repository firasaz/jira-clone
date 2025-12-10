import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width = 50, height = 50 }: LogoProps) => {
  return <Image src="/logo.svg" alt="logo" width={width} height={height} />;
};
