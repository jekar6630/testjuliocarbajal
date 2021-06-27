import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import ListBanks from "../components/ListBanks";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = firebase.firestore(firebaseApp);

export default function Banks(){
    const [ banks, setBanks ] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData().then(resp => {
            setIsLoading(true);
            const resultBanks = [];

            if(resp){

                db.collection("banks")
                .get()
                .then(response => {
                      response.forEach(doc => {
                        const bank = doc.data();
                        bank.id = doc.id;
                        resultBanks.push(bank);
                      });
                      setBanks(resultBanks);
                      setIsLoading(false);
                })
                
            }else{
                
                fetch('https://api.jsonbin.io/b/604006e581087a6a8b95b784')
                .then((response) => response.json())
                .then((json) => {
                
                    var count = Object.keys(json).length;

                    if(count > 0){
                        json.forEach(obj => {
                            resultBanks.push(obj);
                            db.collection("banks").add({
                                bankName: obj.bankName,
                                description: obj.description,
                                age: obj.age,
                                url: obj.url
                            }).then(() => {
                                console.log("registro guardado");
                            }).catch((e) => {
                                console.log("ocurrio un error al guardar registro en firebase" + e);
                            })
                        })
                    }
            
                    setBanks(resultBanks);
                    setIsLoading(false);

                    storeData('true').then(() => {
                        console.log('se guarda bandera' + resp);
                    }).catch(err => {
                        console.log('err al guardar bandera' + err);
                    })

                }).catch((error) => {
                    setIsLoading(false);
                    console.log('error al obtener info de api' + error);
                });
            }

        }).catch(err => {
            console.log("error al obtener la bandera" + err);

        })

    }, []);

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@getted', value)
        } catch (e) {
          console.log("ocurrio un error al guardar en storage" + e);
        }
      }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@getted')
          if(value !== null) {
            return true;
          }else{
            return false;
          }
        } catch(e) {
          console.log("ocurrio un error al obtener la bandera" + e);
        }
      }

    return (
        <View style={styles.viewBody}>
          <ListBanks banks={banks} isLoading={isLoading}/>
        </View>);
}

const styles = StyleSheet.create({
    viewBody: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 30
    },
    btnContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
      shadowColor: "black",
      shadowOffset: { widht: 2, height: 2 },
      shadowOpacity: 0.5
    },
    searchBar: {
      marginBottom: 5
    }
  });
  