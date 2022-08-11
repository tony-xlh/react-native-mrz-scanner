import React from "react";
import { Text, View } from "react-native";
const parse = require('mrz').parse;

export const MRZResultTable = (props:{raw:string}) => {

  React.useEffect(() => {
    console.log(parse(props.raw));
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.3 }} />
      <View style={{ backgroundColor: "red", flex: 0.5 }} />
      <Text>Hello World!</Text>
    </View>
  );
};