import { Button } from "react-native-paper";

const CustomButton = ({
  title,
  handlePress,
  mode,
  icon,
  otherStyles,
  disabled,
}) => {
  return (
    <Button
      className={`rounded-l-xl rounded-r-xl ${otherStyles}`}
      mode={mode || "contained"}
      icon={icon || "login"}
      onPress={handlePress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
