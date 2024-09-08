import { createContext, useContext, useState, useEffect } from "react";
import { formatDate, generateMedMap } from "../utils";
import { useRef } from "react";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

/**
 * DataProvider is a React component that provides an application-wide state for medication data.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components.
 *
 * @returns {ReactElement} Returns a DataContext.Provider that wraps the child components.
 */
function DataProvider({ children }) {
  const [medicamentos, setMedicamentosState] = useState(new Map());
  const medicamentosRef = useRef(medicamentos);

  const setMedicamentos = (newMap) => {
    medicamentosRef.current = newMap;
    setMedicamentosState(newMap);
  };

  const [novoMedicamento, setNovoMedicamento] = useState({
    nome: "",
    forma: "",
    frequenciaDias: [],
    horarios: [],
    primeiraDose: undefined,
    ultimaDose: undefined,
  });

  function limparNovoMedicamento() {
    setNovoMedicamento({
      nome: "",
      forma: "",
      frequenciaDias: [],
      horarios: [],
      primeiraDose: undefined,
      ultimaDose: undefined,
    });
  }

  function registrarMedicamento(medicamento = novoMedicamento) {
    const newMap = generateMedMap(medicamento, medicamentos);
    setMedicamentos(newMap);
  }

  function deletarMedicamento(nome) {
    const newMap = new Map(medicamentos);
    for (const [key, value] of newMap.entries()) {
      const filtered = value.filter((item) => item.name !== nome);
      newMap.set(key, filtered);
    }
    setMedicamentos(new Map(newMap));
  }

  function atualizarEstado(dia, hora, status) {
    const newMap = new Map(medicamentos);
    let updated = false;
    const arr = newMap.get(dia) || [];

    for (const item of arr) {
      if (item.hora === hora) {
        item.status = status;
        updated = true;
      }
    }
    if (updated) {
      setMedicamentos(newMap);
    }
  }

  useEffect(() => {
    const verificarAtrasos = () => {
      const today = formatDate(new Date());

      if (
        medicamentosRef.current.size === 0 ||
        !medicamentosRef.current.has(today)
      )
        return;
      let updated = false;

      const updatedMedicamentos = new Map(medicamentosRef.current);

      const medicamentosDeHoje = updatedMedicamentos.get(today) || [];

      for (const item of medicamentosDeHoje) {
        if (item.hora <= Date.now() && item.status === 3) {
          item.status = 2;
          updated = true;
        }
      }

      if (updated) {
        setMedicamentos(updatedMedicamentos);
      }
    };

    const intervalId = setInterval(verificarAtrasos, 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DataContext.Provider
      value={{
        medicamentos,
        setMedicamentos,
        novoMedicamento,
        setNovoMedicamento,
        limparNovoMedicamento,
        registrarMedicamento,
        setMedicamentos,
        deletarMedicamento,
        atualizarEstado,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
