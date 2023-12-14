import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DLRCharacherResult, DLRLineResult } from "vision-camera-dynamsoft-label-recognizer";
const parse = require('mrz').parse;

export const MRZResultTable = (props:{recognitionResults:DLRLineResult[]}) => {
  const [parsedResult,setParsedResult] = React.useState(undefined as any);
  
  const RecognizedCharacter =(props:{char:DLRCharacherResult}) =>  {
    if (props.char.characterHConfidence>50) {
      return <Text>{props.char.characterH}</Text>
    }else{
      return <Text style={[styles.lowConfidenceText]}>{props.char.characterH}</Text>
    }
  }
  
  const getText = () => {
    let text = "";
    props.recognitionResults.forEach(result => {
      text = text + result.text + "\n";
    });
    return text.trim();
  }
  
  React.useEffect(() => {
    console.log("use effect");
    console.log(props.recognitionResults);
    if (props.recognitionResults) {
      const raw = getText();
      let fields:any = {};
      try {
        const result = parse(raw);
        console.log(result);
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
        fields["MRZ Code"] = (
          <>
            {props.recognitionResults.map((result, idx) => (
              <Text key={"line-"+idx}>
                {result.characterResults.map((char, cidx) => (
                  <RecognizedCharacter key={"char-"+cidx} char={char}/>
                ))}  
              </Text>
            ))} 
          </>
        );
      } catch (error) {
        fields["text"] = raw;
      }
      console.log(fields);
      setParsedResult(fields);
    }
  }, [props.recognitionResults]);

  const getRows = () => {
    let rows:Element[] = [];
    let index = 0;
    if (parsedResult) {
      for (let key in parsedResult) {
        index = index + 1;
        let row = (
          <View
            key={"row-"+index}
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
  lowConfidenceText:{
    color:"red",
  },
})