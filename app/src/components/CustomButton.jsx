import { Button } from "react-native-paper";

const CustomButton = ({ title, handlePress, mode, icon, otherStyles }) => {
  return (
    <Button
      className={`rounded-l-xl rounded-r-xl ${otherStyles}`}
      mode={mode || "contained"}
      icon={icon || "login"}
      onPress={handlePress}
      // disabled={isLoading}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
