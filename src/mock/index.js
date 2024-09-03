const user = {
  name: "John Doe",
  email: "doe@mail",
  passowd: "123456",
};

const allRemedios = new Map();
const today = new Date().toISOString().split("T")[0];
allRemedios.set(today, [
  {
    medication: "Dipirona",
    time: "08:00",
    dosage: "1 comprimido",
  },
  {
    medication: "Paracetamol",
    time: "12:00",
    dosage: "1 comprimido",
  },
  {
    medication: "Ibuprofeno",
    time: "16:00",
    dosage: "1 comprimido",
  },
  {
    medication: "Dipirona",
    time: "20:00",
    dosage: "1 comprimido",
  },
]);

export { user, allRemedios };
