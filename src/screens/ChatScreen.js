import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';
import { BarChart, Grid, LineChart } from 'react-native-chart-kit';

  
  const ChatScreen = () => {

      return (
        <View>
        <Text style={styles.title}>Graficul pulsului</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FBE698",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
  )};

  export default ChatScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#F5FCFF',
    },
    graph: {
      marginVertical: 8,
      borderRadius: 16,
    },
    title:{
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
  
  