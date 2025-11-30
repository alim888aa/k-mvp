import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

const groups = [
  {
    id: '1',
    name: 'Stray Kids',
    fandom: 'Stay',
    image: require('../../assets/skz-1.jpg'),
  },
  {
    id: '2',
    name: 'Twice',
    fandom: 'Once',
    image: require('../../assets/twice-1.jpg'),
  },
  {
    id: '3',
    name: 'Enhypen',
    fandom: 'Engene',
    image: require('../../assets/enh-1.jpg'),
  },
];

export default function GroupsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Groups</Text>
        <View style={styles.groupsGrid}>
          {groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupCard}
              onPress={() => navigation.navigate('Community', { group })}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={group.image}
                style={styles.groupImage}
                imageStyle={styles.groupImageStyle}
              >
                <View style={styles.overlay}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.fandomName}>{group.fandom}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  content: {
    padding: isDesktop ? 32 : 16,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  groupsGrid: {
    gap: 16,
  },
  groupCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  groupImage: {
    height: 160,
    justifyContent: 'flex-end',
  },
  groupImageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  groupName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fandomName: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
  },
});
