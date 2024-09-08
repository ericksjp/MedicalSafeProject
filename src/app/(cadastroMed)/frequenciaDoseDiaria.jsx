import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Divider } from "react-native-paper";
import {
    ActionButtons,
    HorarioField,
    NewMedBar,
    RegisterButton,
    SuccessModal,
} from "../../components";
import { icons } from "../../constants";
import { useDataContext } from "../../context/DataProvider";

/* Tela para registrar a frequência com que o medicamento deve ser tomado em um dia */
export default function FrequenciaDoseDiaria() {
  const ref = useRef([{ hora: new Date(), dose: "1" }]);
  const [rerender, setRerender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setNovoMedicamento, registrarMedicamento, limparNovoMedicamento } = useDataContext();

  // bugiganga para evitar renderização desnecessária
  useEffect(() => {}, [rerender]);

  const handleTimeChange = (fieldIndex, selectedTime) => {
    const updatedFields = [...ref.current];
    updatedFields[fieldIndex].hora = selectedTime;
    ref.current = updatedFields;
  };

  const handleDoseChange = (fieldIndex, dose) => {
    const updatedFields = [...ref.current];
    updatedFields[fieldIndex].dose = dose;
    ref.current = updatedFields;
  };

  const addField = () => {
    ref.current = [...ref.current, { hora: new Date(), dose: "1" }];
    setRerender(!rerender);
  };

  const removeField = () => {
    if (ref.current.length > 1) {
      const newFields = ref.current.slice(0, ref.current.length - 1);
      ref.current = newFields;
    }
    setRerender(!rerender);
  };

  function handleRegistro() {
    const converted = ref.current.map(({dose, hora}) => ({
      hora: hora.getTime(),
      dose: Number(dose),
    }));
    setNovoMedicamento((prev) => {
      const updated = { ...prev, horarios: converted };
      registrarMedicamento(updated);
      limparNovoMedicamento();
    });
    setShowModal(true);
  }

  return (
    <View className="flex-1 bg-white">
      <NewMedBar
        iconBackBtn="arrow-left-bold"
        title="Quais são os horários que você deve tomar o medicamento?"
        icon={icons.medicine}
      />
      <View className="rounded-t-3xl mt-[-20px] bg-white pt-10">
        <FlatList
          data={ref.current}
          keyExtractor={(_, index) => index}
          renderItem={({_, index}) => (
            <View className="flex flex-col items-center">
              <HorarioField
                index={index}
                onDoseChange={handleDoseChange}
                onHoraChange={handleTimeChange}
              />
              <Divider className="mt-5 mb-5 w-[80%]" style={{ height: 1 }} />
            </View>
          )}
        />
        <ActionButtons addField={addField} removeField={removeField} />
        <RegisterButton handleRegistro={handleRegistro} />
      </View>
      <SuccessModal
        visible={showModal}
        onAll={() => router.navigate("/home")}
      />
    </View>
  );
}
