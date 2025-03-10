import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1920x1080?nature')",
      }}>
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ¡Oops! Página No Encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          La página que estás buscando parece haber ido a una pequeña aventura.
          No te preocupes, te ayudaremos a encontrar el camino de regreso.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
}
