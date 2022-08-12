import React from "react";
import { StyleSheet, Text, View } from "react-native";
const parse = require('mrz').parse;

export const MRZResultTable = (props:{raw:string}) => {
  const [parsedResult,setParsedResult] = React.useState(undefined as any);
  React.useEffect(() => {
    const result = parse(props.raw);
    console.log(result);
    let fields:any = {};
    fields["Document Code"] = result["fields"]["documentCode"];
    fields["Document Number"] = result["fields"]["documentNumber"];
    fields["First Name"] = result["fields"]["firstName"];
    fields["Last Name"] = result["fields"]["lastName"];
    fields["Birth Date"] = result["fields"]["birthDate"];
    fields["Sex"] = result["fields"]["sex"];
    fields["Nationality"] = result["fields"]["nationality"];
    fields["Issuing State"] = result["fields"]["issuingState"];
    fields["Expiration Date"] = result["fields"]["expirationDate"];
    if (result["valid"] === true) {
      fields["Valid"] = "True";
    }else{
      fields["Valid"] = "False";
    }
    fields["MRZ Code"] = props.raw;
    setParsedResult(fields);
  }, []);

  const getRows = () => {
    let rows:Element[] = [];
    if (parsedResult) {
      for (let key in parsedResult) {
        let row = (
          <>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={styles.cell}>
                <Text>{key}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{parsedResult[key]}</Text>
              </View>
            </View>
          </>
        )
        rows.push(row);
      }
    }
    return rows;
  }

  return (
    <>
      {getRows()}
    </>
  );
};


const styles = StyleSheet.create({
  cell: {
    borderColor:"black",
    borderWidth:0.5, 
    flex: 0.5
  },
})