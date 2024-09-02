import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  FlatList,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { getDates } from "../utils";

const Item = ({ dayName, dateNumber, isSelected, onPress, isToday }) => (
  <Pressable onPress={onPress}>
    <View className="items-center w-[50px]">
      <View
        className={`items-center w-10 ${isToday ? "#6750a4" : "text-gray-200"}`}
      >
        <Text className="text-base text-center text-gray-200">{dayName}</Text>
        <Text
          className={`text-base text-center text-gray-200 w-8 h-8 rounded-full align-middle ${
            isSelected
              ? "bg-gray-200 text-gray-900"
              : "bg-transparent text-gray-200"
          }`}
        >
          {dateNumber}
        </Text>
      </View>
    </View>
  </Pressable>
);

const Calendar = ({ span, handleSetSelectedDay }) => {
  const dates = useMemo(() => getDates(new Date(), span), []);

  const [selectedIndex, setSelectedIndex] = useState(span);
  const flatListRef = useRef(null);

  const handleItemPress = (index) => {
    handleSetSelectedDay(dates[index].dateStrKey);
    setSelectedIndex(index);
    flatListRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handleLeftPress = () => {
    flatListRef.current.scrollToIndex({
      index: Math.max(
        0,
        flatListRef.current.props.data.indexOf(
          flatListRef.current.props.data[0]
        ) - 7
      ),
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handleRightPress = () => {
    flatListRef.current.scrollToIndex({
      index: Math.min(
        dates.length - 1,
        flatListRef.current.props.data.indexOf(
          flatListRef.current.props.data[0]
        ) + 7
      ),
      animated: true,
      viewPosition: 0.5,
    });
  };

  function getItemLayout(_, index) {
    return {
      length: 50,
      offset: 50 * index,
      index,
    };
  }

  function renderItem({ item, index }) {
    return (
      <Item
        dayName={item.dayName}
        dateNumber={item.day}
        isSelected={index === selectedIndex}
        isToday={index === span}
        onPress={() => handleItemPress(index)}
      />
    );
  }

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      index: span - 3,
      animated: true,
      // viewPosition: 0.5,
    });
  }, []);

  return (
    <View className="bg-[#6750a4] p-4 gap-2">
      <View className="w-full flex flex-row items-center gap-2">
        <TouchableOpacity onPress={handleLeftPress}>
          <Text className="text-white">{"<"}</Text>
        </TouchableOpacity>

        <FlatList
          className="self-center w-full"
          ref={flatListRef}
          data={dates}
          horizontal
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "start",
          }}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={7}
          getItemLayout={getItemLayout}
        />

        <TouchableOpacity onPress={handleRightPress}>
          <Text className="text-white">{">"}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex w-full flex-row justify-center items-center relative">
        <Button
          className="absolute left-0 text-gray-300"
          mode="text"
          textColor="#d1d5db"
          onPress={() => handleItemPress(span)}
          compact="true"
          uppercase={false}
        >
          Hoje
        </Button>
        <Text className="self-center text-xl font-semibold text-gray-200 ml-1">
          {dates[selectedIndex].dateStr}
        </Text>
      </View>
    </View>
  );
};

export default Calendar;
