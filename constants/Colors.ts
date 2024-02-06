const tintColorLight = "#efefef";
const tintColorDark = "#fff";

const polyPurrColors = {
  backgroundColor: "#F2884B",
  secondaryColor: "rgb(250, 249, 240)",
  darkOrange: "#F2784B",
  lightOrange: "#F29F80",
  white: "#F2F2F2",
  dark: "#595959",
};

export default {
  light: {
    text: "#595959",
    background: "#F2F2F2",
    tabBackground: "#F2784B",
    borderColor: "red",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    backgroundColor: "#F2884B",
    secondaryColor: "rgb(250, 249, 240)",
    darkOrange: polyPurrColors.darkOrange,
    lightOrange: polyPurrColors.lightOrange,
  },
  dark: {
    text: "#fff",
    background: "#000",
    secondaryColor: "black",
    tabBackground: "#F2784B",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    darkOrange: polyPurrColors.darkOrange,
    lightOrange: polyPurrColors.lightOrange,
  },
};
