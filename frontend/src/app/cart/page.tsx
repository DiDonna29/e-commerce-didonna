import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Cart() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className={`${lusitana.className} mb-4 text-2xl font-bold`}>
        {metadata.title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <Image
            src="/nike-air-max-270.png"
            alt="Nike Air Max 270"
            width={200}
            height={200}
          />
          <h3 className="text-lg font-bold mt-4">Nike Air Max 270</h3>
          <p className="text-gray-500">$150</p>
          <div className="flex items-center mt-4">
            <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300">
              -
            </button>
            <input
              type="number"
              className="w-12 text-center border-gray-300 border-x"
              defaultValue={1}
            />
            <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300">
              +
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Remove from Cart
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <Image
            src="/nike-air-vapormax-utility.png"
            alt="Nike Air VaporMax Utility"
            width={200}
            height={200}
          />
          <h3 className="text-lg font-bold mt-4">Nike Air VaporMax Utility</h3>
          <p className="text-gray-500">$150</p>
          <div className="flex items-center mt-4">
            <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300">
              -
            </button>
            <input
              type="number"
              className="w-12 text-center border-gray-300 border-x"
              defaultValue={1}
            />
            <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300">
              +
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Remove from Cart
          </button>
        </div>
      </div>
    </main>
  );
}
