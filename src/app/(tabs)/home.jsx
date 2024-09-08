import { useCallback, useEffect, useState, memo } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Divider } from "react-native-paper";
import { Calendar, FabThing, HomeAppBar, MedReminder } from "../../components";
import { formatDate } from "../../utils";
import { useDataContext } from "../../context/DataProvider";
import { useFocusEffect } from "@react-navigation/native";

const MemoizedMedReminder = memo(MedReminder);

const Home = () => {
  const { medicamentos } = useDataContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [remedios, setRemedios] = useState([]);
  const [showFab, setShowFab] = useState(true);

  useEffect(() => {
    setRemedios(medicamentos.get(formatDate(selectedDate)) || []);
  }, [selectedDate, medicamentos]);

  useFocusEffect(
    useCallback(() => {
      setShowFab(true);
      setSelectedDate(new Date());
      return () => setShowFab(false);
    }, [])
  );

  const renderItem = useCallback(
    ({ item }) => (
      <MemoizedMedReminder
        name={item.name}
        forma={item.forma}
        dose={item.dose}
        status={item.status}
        hora={item.hora}
        dia={item.dia}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <HomeAppBar title="Convidado" className="bg-slate-200" />
      <Divider bold />
      <Calendar span={7} handleSetSelectedDay={setSelectedDate} />

      {remedios.length === 0 ? (
        <View style={styles.noMedsMessage}>
          <Text style={styles.noMedsText}>Não há medicamentos para hoje</Text>
        </View>
      ) : (
        <FlatList
          data={remedios}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
          showsVerticalScrollIndicator={true}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}

      <FabThing visible={showFab} setVisible={setShowFab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f",
  },
  noMedsMessage: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  noMedsText: {
    color: "#6B7280",
    fontSize: 24,
    textAlign: "center",
  },
  flatList: {
    marginTop: 20,
    marginBottom: 20,
  },
  flatListContent: {
    display: "flex",
    width: "100%",
    gap: 25,
  },
});

export default Home;
