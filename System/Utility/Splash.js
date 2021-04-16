import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {logo} from './Images';

const Splash = () => {
  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Image
          source={logo}
          style={{width: '50%', height: '50%', resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Splash();
