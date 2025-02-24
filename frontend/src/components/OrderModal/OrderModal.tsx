import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderModalProps {
  orderDetails: {
    status?: string;
    date?: string;
    user?: {
      id: number;
      name: string;
      email: string;
      address: string;
      phone: string;
      role: string;
    };
    products?: Product[];
    total?: number;
    id?: number;
  } | null;
  onClose: () => void;
  purchaseSuccess: boolean;
  onGoToHome: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  orderDetails,
  onClose,
  purchaseSuccess,
  onGoToHome,
}) => {
  if (!orderDetails) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        Detalles de la Compra
      </h2>
      <p className="text-black font-medium">
        Número de Orden: {orderDetails.id}
      </p>
      <p className="text-black font-medium">Estado: {orderDetails.status}</p>
      <p className="text-black font-medium">
        Fecha y Hora: {new Date(orderDetails.date || "").toLocaleString()}
      </p>

      <div className="mt-4">
        <h3 className="text-black font-semibold">Detalles de los Productos:</h3>
        <div className="flex flex-col space-y-2 mt-2">
          {orderDetails.products?.map(product => (
            <div key={product.id} className="flex items-center">
              <Image
                alt={product.name}
                className="h-16 w-16 object-cover object-center mr-2"
                src={product.image}
                width={64}
                height={64}
              />
              <div>
                <p className="text-black font-medium">{product.name}</p>
                <p className="text-black">Precio: ${product.price}</p>
                <p className="text-black">Cantidad: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="text-slate-800 font-semibold">
          Total Gastado: ${orderDetails.total?.toFixed(2) || "0.00"}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
        <button
          className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={onClose}>
          Cerrar Factura
        </button>
        <button
          className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
          onClick={onGoToHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
