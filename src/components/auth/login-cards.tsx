import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const LoginCard = () => {
  return (
    <Card className="size-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2"></div>
    </Card>
  );
};
