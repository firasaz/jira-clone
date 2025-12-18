"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-4">
      <AlertTriangle className="size-6" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant={"secondary"} size={"sm"} asChild>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
