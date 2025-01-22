import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className={`${lusitana.className} mb-4 text-2xl font-bold`}>
        {metadata.title}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Name:</p>
            <p>John Doe</p>
          </div>
          <div>
            <p className="text-gray-500">Email:</p>
            <p className="text-blue-500">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-gray-500">Address:</p>
            <p>123 Main St, Anytown USA</p>
          </div>
          <div>
            <p className="text-gray-500">Phone:</p>
            <p>555-1234</p>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4">Order History</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-500">Order #12345</p>
            <p>Nike Air Max 270 - $150</p>
            <p className="text-gray-500">Delivered on 2023-04-15</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-500">Order #67890</p>
            <p>Nike Air VaporMax Utility - $150</p>
            <p className="text-gray-500">Delivered on 2023-03-20</p>
          </div>
        </div>
      </div>
    </main>
  );
}
