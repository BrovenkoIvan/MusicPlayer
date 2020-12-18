import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import ProgramItem from '../components/ProgramItem';

const ProgramsScreen = ({navigation}) => {
  const [listPrograms, setListPrograms] = useState();
  useEffect(() => {
    getPrograms();
  }, []);
  const getPrograms = useCallback(() => {
    fetch('https://api.iawaketechnologies.com/api/v2/media-library/free')
      .then((responce) => responce.json())
      .then((json) => setListPrograms(json.programs));
  }, []);

  return (
    <View>
      <FlatList
        data={listPrograms}
        renderItem={({item}) => <ProgramItem item={item} />}
      />
    </View>
  );
};

export default ProgramsScreen;
