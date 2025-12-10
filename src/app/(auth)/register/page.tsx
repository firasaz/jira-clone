import { redirect } from "next/navigation";

import { getCurrent } from "@/lib/auth/actions";
import { RegisterCard } from "@/components/auth/register-card";

const Page = async () => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <RegisterCard />;
};

export default Page;
