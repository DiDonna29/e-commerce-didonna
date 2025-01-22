import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className={`${lusitana.className} mb-4 text-2xl font-bold`}>
        {metadata.title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <Image
            src="/nike-free-rn-flyknit-3.0.png"
            alt="Nike Free RN Flyknit 3.0"
            width={200}
            height={200}
          />
          <h3 className="text-lg font-bold mt-4">Nike Free RN Flyknit 3.0</h3>
          <p className="text-gray-500">$100</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <Image
            src="/nike-free-rn-flyknit-3.0.png"
            alt="Nike Free RN Flyknit 3.0"
            width={200}
            height={200}
          />
          <h3 className="text-lg font-bold mt-4">Nike Free RN Flyknit 3.0</h3>
          <p className="text-gray-500">$100</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <Image
            src="/nike-free-rn-flyknit-3.0.png"
            alt="Nike Free RN Flyknit 3.0"
            width={200}
            height={200}
          />
          <h3 className="text-lg font-bold mt-4">Nike Free RN Flyknit 3.0</h3>
          <p className="text-gray-500">$100</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
