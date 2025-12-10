import { redirect } from "next/navigation";

import { getCurrent } from "@/lib/auth/actions";
import { LoginCard } from "@/components/auth/login-card";

const Page = async () => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <LoginCard />;
};

export default Page;
