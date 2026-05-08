import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  HandCoins, 
  ShieldAlert, 
  BadgeDollarSign, 
  LogOut 
} from 'lucide-react';

export const MainLayout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Users size={20} />, label: 'Clientes', path: '/clientes' },
    { icon: <HandCoins size={20} />, label: 'Préstamos', path: '/prestamos' },
    { icon: <BadgeDollarSign size={20} />, label: 'Transacciones', path: '/pagos' },
    { icon: <ShieldAlert size={20} />, label: 'Análisis de Riesgo', path: '/riesgo' },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-center border-b border-blue-800">
          <h2 className="text-2xl font-bold tracking-wider">WAYRA</h2>
          <p className="text-xs text-blue-300 mt-1 uppercase">Sist. Microfinanzas</p>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800 transition-colors group"
            >
              <span className="text-blue-300 group-hover:text-white">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h3 className="text-slate-700 font-semibold text-lg">Panel de Control</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500 italic">Bienvenido, Administrador</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
              GA
            </div>
          </div>
        </header>

        {/* VISTA DINÁMICA */}
        <section className="flex-1 overflow-y-auto p-8">
          {children}
        </section>
      </main>
    </div>
  );
};