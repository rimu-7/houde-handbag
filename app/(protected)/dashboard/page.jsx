import { redirect } from "next/navigation";
import { currentUser } from "@/lib/currentUser";
import UserInfo from "./UserInfo";
import DashboardTable from "./DashboardTable";
import Table from "./Table";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) redirect("/login");

  return (
    <main className="p-6">
      <UserInfo />
      <Table />
    </main>
  );
}
