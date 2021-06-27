import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
  } from "react-native";
  import { Image } from "react-native-elements";

  export default function ListBanks(props){
      const { banks, isLoading } = props;
      var count = Object.keys(banks).length;

      return (
      <View>
          { count > 0 ? (
            <FlatList
            data={banks}
            renderItem={bank => <Bank bank={bank} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<FooterList isLoading={isLoading} />}
            />
          ) : (
              <View style={styles.loaderFields}>
                  <Text>No hay bancos para cargar</Text>
              </View>
          )}
          </View>);
  }

  function Bank(props){
    const { bank } = props;
    const { age, bankName, description, url } = bank.item;
    const imageBank = typeof url === "undefined" ? "" : url;

    return (
        <TouchableOpacity>
          <View style={styles.viewField}>
            <View style={styles.viewImageField}>
            <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="fff" />}
                source={
                    imageBank
                    ? { uri: imageBank }
                    : ''
                }
                style={styles.imageField}
            />
            </View>
            <View>
              <Text style={styles.fieldName}>{bankName}</Text>
              <Text style={styles.fieldAddress}>{age}</Text>
              <Text style={styles.fieldDescription}>{description}</Text>
              <Text style={styles.fieldDescription}>{url}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  }

  function FooterList(props){
      const { isLoading } = props;

      if (isLoading) {
        return (
          <View style={styles.loaderFields}>
            <ActivityIndicator size="large" />
          </View>
        );
      } else {
        return (
          <View style={styles.notFoundFields}>
            <Text>No quedan bancos por cargar</Text>
          </View>
        );
      }
  }

  const styles = StyleSheet.create({
    loaderFields: {
      marginTop: 10,
      marginBottom: 10
    },
    viewField: {
      flexDirection: "row",
      margin: 10
    },
    viewImageField: {
      marginRight: 15
    },
    imageField: {
      width: 80,
      height: 80
    },
    fieldName: {
      fontWeight: "bold"
    },
    fieldAddress: {
      paddingTop: 2,
      color: "grey"
    },
    fieldDescription: {
      paddingTop: 2,
      color: "gray",
      width: 300
    },
    notFoundFields: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: "center"
    },
    rating: {
      position: "absolute",
      right: 0
    }
  });
  