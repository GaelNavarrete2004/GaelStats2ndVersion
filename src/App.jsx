import React, { useState, useEffect } from "react";
import { getAuthUrl } from "./spotifyAuth";
import Playlists from "./components/Playlist/Playlist";
import Discovery from "./components/Discovery/Discovery";
import RecentlyPlayed from "./components/Recently Played/RecentlyPlayed";
import Statistics from "./components/Stats/Stats";
import logo from "./stats.png";

export default function App() {
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState("playlists");
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Verifica si hay un token en el hash de la URL
  useEffect(() => {
    const hash = window.location.hash;
    const storedToken = localStorage.getItem("spotifyAccessToken");

    if (storedToken) {
      setToken(storedToken);
      return;
    }

    if (hash) {
      const token = new URLSearchParams(hash.replace("#", "?")).get(
        "access_token"
      );
      if (token) {
        localStorage.setItem("spotifyAccessToken", token);
        setToken(token);
        window.location.hash = "";
      } else {
        setError("Error: Token de acceso no encontrado");
      }
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("spotifyAccessToken");
    setToken(null);
    window.location.hash = "";
  };

  // Si hay un error, mostramos un mensaje
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  // Si no hay token, redirigimos al usuario a la página de login de Spotify
  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <a
          href={getAuthUrl()}
          className="px-6 py-3 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
        >
          Iniciar sesión con Spotify
        </a>
      </div>
    );
  }

  // Función para alternar el menú en pantallas pequeñas
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logotipo */}
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-white">Spotify Dashboard</h1>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Menú en pantallas grandes */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <button
                onClick={() => setActiveTab("playlists")}
                className={`px-4 py-2 rounded ${
                  activeTab === "playlists"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Playlists
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("discovery")}
                className={`px-4 py-2 rounded ${
                  activeTab === "discovery"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Discovery
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("recentlyplayed")}
                className={`px-4 py-2 rounded ${
                  activeTab === "recentlyplayed"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Recently Played
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("statistics")}
                className={`px-4 py-2 rounded ${
                  activeTab === "statistics"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Stats
              </button>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="hidden md:block px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Menú desplegable en pantallas pequeñas */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 bg-gray-700 p-4 rounded-md">
            <li>
              <button
                onClick={() => {
                  setActiveTab("playlists");
                  toggleMenu();
                }}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "playlists"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Playlists
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("discovery");
                  toggleMenu();
                }}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "discovery"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Discovery
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("recentlyplayed");
                  toggleMenu();
                }}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "recentlyplayed"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Recently Played
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("statistics");
                  toggleMenu();
                }}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "statistics"
                    ? "bg-green-500 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Stats
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto mt-8 p-4">
        {activeTab === "playlists" && <Playlists token={token} />}
        {activeTab === "discovery" && <Discovery token={token} />}
        {activeTab === "recentlyplayed" && <RecentlyPlayed token={token} />}
        {activeTab === "statistics" && <Statistics token={token} />}
      </main>
    </div>
  );
}
