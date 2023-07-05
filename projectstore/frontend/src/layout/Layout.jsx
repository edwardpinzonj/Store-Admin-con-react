import React, { useState } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState([]);

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: "i-carbon-dashboard",
      path: "/dashboard",
    },
    {
      title: "Productos",
      icon: "i-carbon-assembly-cluster",
      path: "/products",
      children: [
        {
          title: "Brands",
          path: "/brands",
        },
        {
          title: "Categorias",
          path: "/categories",
        },
      ],
    },
    {
      title: "Usuarios",
      icon: "i-carbon-collaborate",
      path: "/users",
    },
    {
      title: "Roles",
      icon: "i-carbon-document",
      path: "/roles",
    },
    {
      title: "Permisos",
      icon: "i-carbon-calendar",
      path: "/permission",
    },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleNotificationClick = (notification) => {
    // Implementar lógica para manejar la notificación seleccionada
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-500 py-2 px-4">
        {/* Aquí va el contenido del header */}
      </header>
      <div className="flex flex-grow">
        {isMenuOpen && (
          <aside className="bg-gray-200 w-56">
            <nav>
              <ul className="py-4">
                {sidebarItems.map((item, index) => (
                  <li key={index} className="pl-4 py-2">
                    <Link
                      to={item.path}
                      className="flex items-center space-x-2 text-gray-700 hover:bg-gray-300 px-2 rounded"
                    >
                      <span className={`icon ${item.icon}`} />
                      <span>{item.title}</span>
                    </Link>
                    {item.children && (
                      <ul className="pl-4 mt-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex} className="pl-2 py-1">
                            <Link
                              to={child.path}
                              className="text-gray-700 hover:bg-gray-300 px-2 rounded"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
        <main className="flex-grow">
          <header className="bg-gray-500 py-2 px-4">
            <nav className="flex items-center justify-between">
              <div>
                <button
                  className="text-white focus:outline-none"
                  onClick={handleMenuToggle}
                >
                  Menu
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="border rounded px-2 py-1"
                />
              </div>
              <div>
                <button
                  className="text-white focus:outline-none"
                  onClick={handleNotificationClick}
                >
                  Notificaciones ({notifications.length})
                </button>
              </div>
            </nav>
          </header>
          <div className="p-4">{children}</div>
        </main>
      </div>
      <footer className="bg-gray-500 py-2 px-4">
        {/* Aquí va el contenido del footer */}
      </footer>
    </div>
  );
};

export default Layout;
