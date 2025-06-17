// src/pages/AdminCode.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminCode = () => {
  const { state } = useLocation();            // recibe { user }
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    if (!state?.user || state.user.role !== "admin") {
      // si no venimos desde login o no es admin, volvemos al login
      return navigate("/");
    }
    // Generar el código solo una vez al montar
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Código admin generado:", code);
    setGeneratedCode(code);
  }, [state, navigate]);

  const handleVerify = () => {
    if (inputCode !== generatedCode) {
      return alert("Código de administrador incorrecto");
    }
    // guardamos sesión definitiva
    localStorage.setItem("user", JSON.stringify(state.user));
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4 p-4">
      <h1 className="text-2xl font-bold">Verificación Admin</h1>
      <p>Hemos enviado un código de 6 dígitos a la consola. Pégalo aquí:</p>
      <input
        type="text"
        maxLength={6}
        className="border px-4 py-2 w-48 text-center"
        placeholder="Código de administrador"
        value={inputCode}
        onChange={e => setInputCode(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleVerify}
      >
        Verificar
      </button>
    </div>
  );
};

export default AdminCode;
