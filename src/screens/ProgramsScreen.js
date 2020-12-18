import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const ProgramsScreen = ({navigation}) => {
  const [listPrograms, setListPrograms] = useState();
  useEffect(() => {
    getPrograms();
  }, []);
  const getPrograms = () => {
     fetch('https://api.iawaketechnologies.com/api/v2/media-library/free')
      .then((responce) => responce.json())
      .then((json) => setListPrograms(json.programs));
  };
  console.log(listPrograms);
  return (
    <View>
      <FlatList
        data={listPrograms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={()=> navigation.navigate('Tracks', {tracks: item.tracks})}>
              <View>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default ProgramsScreen;
