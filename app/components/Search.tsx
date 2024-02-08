import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <div className="flex w-1/3 max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search movies" />
      <Button className="p-4">Search</Button>
    </div>
  );
}
