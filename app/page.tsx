import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

import Navigation from "./components/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Navigation />
      <div className="p-10"></div>
    </main>
  );
}
