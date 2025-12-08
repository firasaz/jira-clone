import { cn } from "@/lib/utils";

interface DottedSeparator {
  className?: string;
  orientation?: string;
  height?: string;
  color?: string;
  dotSize?: string;
}
const DottedSeparator = ({
  className,
  orientation = "horizontal",
  height,
  color,
  dotSize = "2",
}: DottedSeparator) => {
  const isHorizontal = orientation === "horizontal";
  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center"
      )}
      style={{
        width: isHorizontal ? "100%" : height,
        height: isHorizontal ? height : "100%",
        backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
        backgroundSize: isHorizontal
          ? `${parseInt(dotSize) + parseInt(dotSize)}px ${height}`
          : `${height} ${parseInt(dotSize) + parseInt(dotSize)}`,
      }}
    ></div>
  );
};
