import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="m-3">
      <hr className="my-3" />
      <Input />
      <hr className="my-3" />
      <Button>Primary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"teritary"}>Destructive</Button>
      <Button variant={"muted"}>Destructive</Button>
      <Button variant={"outline"}>Destructive</Button>
      <Button variant={"ghost"}>Destructive</Button>
    </div>
  );
}
