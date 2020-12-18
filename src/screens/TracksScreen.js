import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';

const TracksScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [playingState, setPlayingState] = useState(false);
  const song = useRef(null);
  const {tracks} = route.params;
  console.log(tracks)

  useEffect(() => {
    const willBlurSubscription = navigation.addListener('blur', exit);
    return willBlurSubscription;
  }, []);

  const onPlay = () => {
    song.current.play((success) => {
      if (success) {
        setPlayingState(true);
      } else {
        showErrorMessage()
      }
    });
  };
  const playSong = (url) => {
    setLoading(true);
    setPlayingState(false);
    if (song.current && song.current._filename == url) {
      onPlay();
      setLoading(false);
    } else {
      if (song.current && song.current._filename != url) {
        song.current.stop();
        song.current = new Sound(url, null, (error) => {
          if (error) {
            showErrorMessage();
          } else {
            setLoading(false);
          }
          onPlay();
        });
      } else {
        song.current = new Sound(url, null, (error) => {
          if (error) {
            showErrorMessage();
          } else {
            setLoading(false);
          }
          onPlay();
        });
      }
    }
  };
  const stopSong = (url) => {
    if (
      song.current !== null &&
      song.current._filename === url
    ) {
      song.current.stop(() => {
        song.current = null;
        setPlayingState(true);
      });
    }
  };
  const pauseSong = () => {
    setPlayingState(true);
    song.current.pause();
  };
  const exit = () => {
    if (song.current !== null) {
      song.current.stop();
    }
  };
  const showErrorMessage = () => {
    Alert.alert(
      'Error',
      'Some error with song',
      [
        {
          text: 'Ok',
          style: 'cancel'
        }
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({item}) => {
          const url = item.media.mp3.url
          return (
            <TouchableOpacity>
              <View style={styles.renderItemContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <View style={styles.buttons}>
                  {loading &&
                  song.current &&
                  song.current._filename === url ? (
                    <View>
                      <Loading />
                    </View>
                  ) : song.current &&
                    song.current._filename === url &&
                    !playingState ? (
                    <TouchableOpacity onPress={() => pauseSong()}>
                      <View>
                        <Icon name="pause" size={30} />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => playSong(url)}>
                      <View>
                        <Icon name="ios-play" size={30} />
                      </View>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity onPress={() => stopSong(url)}>
                    <View>
                      <Icon name="stop" size={30} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  renderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    margin:5
  },
  titleContainer: {
    paddingLeft: 10
  },
  title: {
    fontSize:14
  }
});
export default TracksScreen;
