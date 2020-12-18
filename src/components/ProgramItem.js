import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ceil } from 'react-native-reanimated';

const ProgramItem = ({item}) => {
  const navigation = useNavigation();
  const {id, tracks, title} = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={id}
        onPress={() => navigation.navigate('Tracks', {tracks})}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
      padding: 10,
      borderBottomWidth: 1,
  },
  title: {
      fontSize: 20
  }
});
export default ProgramItem;
