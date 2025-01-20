// import { Card } from "@/app/ui/dashboard/cards";
import { lusitana } from "@/app/ui/fonts";
// import { fetchLatestInvoices, fetchCardData } from "../../lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {/* {metadata.title} */}
        PRODUCTOS
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">Productos</div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        Aqui se mostrarán los productos
      </div>
    </main>
  );
}
