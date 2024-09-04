import { createContext, useState, useContext } from "react";

const MedContext = createContext();
export const useMedContext = () => useContext(MedContext);

const MedProvider = ({ children }) => {
  const [medData, setMedData] = useState({
    nome: "",
    forma: "",
    frequenciaDias: [],
    horarios: [],
    primeiraDose: undefined,
  });

  function setInitialState() {
    setMedData({
      nome: "",
      forma: "",
      frequenciaDias: [],
      horarios: [],
      primeiraDose: undefined,
    });
  }

  function registerMed() {
    console.log(medData);
  }

  return (
    <MedContext.Provider
      value={{ medData, setMedData, setInitialState, registerMed }}
    >
      {children}
    </MedContext.Provider>
  );
};

export default MedProvider;
