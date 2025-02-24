import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext"; // Asegúrate de importar el contexto de autenticación
import Swal from "sweetalert2";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Añadimos quantity como opcional
}

interface CartContextType {
  cartItems: Product[] | null; // Cambia a null si no hay carrito
  addToCart: (product: Product) => void; // Función para añadir al carrito
  removeFromCart: (id: number) => void; // Función para eliminar del carrito
  updateCartItem: (id: number, quantity: number) => void; // Función para actualizar cantidad
  clearCart: () => void; // Función para limpiar el carrito
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth(); // Obtener el token del contexto de autenticación
  const [cartItems, setCartItems] = useState<Product[] | null>(null); // Inicializa como null

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        const savedCart = localStorage.getItem("cartItems");
        setCartItems(savedCart ? JSON.parse(savedCart) : []); // Cargar desde localStorage si hay token
      } else {
        setCartItems(null); // Si no hay token, establece cartItems como null
      }
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined" && token && cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else if (!token) {
      localStorage.removeItem("cartItems"); // Eliminar el carrito del localStorage si no hay token
    }
  }, [cartItems, token]);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const addToCart = (product: Product) => {
    if (!token) {
      Toast.fire({
        icon: "warning",
        title: `Debe iniciar sesión para añadir productos al carrito.`,
      });
      return; // Salir si no hay token
    }

    const existingItem = cartItems?.find(item => item.id === product.id);
    if (existingItem) {
      updateCartItem(existingItem.id, (existingItem.quantity || 1) + 1);
    } else {
      setCartItems(prevItems => [
        ...(prevItems || []),
        { ...product, quantity: 1 },
      ]);
    }

    Toast.fire({
      icon: "success",
      title: `${product.name} se ha añadido al carrito correctamente.`,
    });
  };

  const removeFromCart = (id: number) => {
    if (!token) return; // Evita eliminar si no hay token
    setCartItems(
      prevItems => prevItems?.filter(item => item.id !== id) || null
    );
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (!token) return; // Evita actualizar si no hay token
    setCartItems(
      prevItems =>
        prevItems?.map(item =>
          item.id === id ? { ...item, quantity } : item
        ) || null
    );
  };

  const clearCart = () => {
    setCartItems([]); // Limpiar el carrito
    localStorage.removeItem("cartItems"); // Eliminar el carrito del localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart, // Añadir clearCart al contexto
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
