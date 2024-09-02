import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { Calendar, HomeAppBar, MedReminder } from "../../components";
import { allRemedios } from "../../mock";
import { formatDate } from "../../utils";

const MemoizedMedReminder = React.memo(MedReminder); // Memoize the component

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const remedios = useMemo(() => allRemedios.get(selectedDate), [selectedDate]);

  useEffect(() => {
    const today = formatDate(new Date());
    setSelectedDate(today);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View className="self-center">
        <MemoizedMedReminder // Use the memoized version
          medication={item.medication}
          time={item.time}
          dosage={item.dosage}
        />
      </View>
    ),
    []
  );

  return (
    <View className="w-full h-full">
      <HomeAppBar title="Zezin Goiaba" />
      <Divider bold />
      <Calendar span={7} handleSetSelectedDay={setSelectedDate} />

      <FlatList
        data={remedios}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={true}
        vertical
        renderItem={renderItem}
        contentContainerStyle={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 25,
        }}
        style={styles.flatList}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    height: 300,
  },
  flatList: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Home;
