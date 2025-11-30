import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

const favoriteArtists = [
  { id: '1', name: 'Stray Kids', image: require('../../assets/skz-1.jpg') },
  { id: '2', name: 'Twice', image: require('../../assets/twice-1.jpg') },
  { id: '3', name: 'Enhypen', image: require('../../assets/enh-1.jpg') },
];

const myPosts = [
  { id: '1', image: require('../../assets/skz-1.jpg') },
  { id: '2', image: require('../../assets/karma.jpg') },
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={40} color="#888" />
            </View>
          </View>
          <Text style={styles.userName}>Your Name</Text>
          <Text style={styles.userHandle}>@your_handle</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>348</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Favorite Artists</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.artistsScroll}
          contentContainerStyle={styles.artistsContent}
        >
          {favoriteArtists.map((artist) => (
            <View key={artist.id} style={styles.artistCard}>
              <Image source={artist.image} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addArtistCard}>
            <Ionicons name="add" size={28} color="#888" />
            <Text style={styles.addArtistText}>Add</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>My Posts</Text>
        <View style={styles.postsGrid}>
          {myPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.postThumbnail}>
              <Image source={post.image} style={styles.postImage} />
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
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  spacer: {
    flex: 1,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2a2a4e',
    borderWidth: 3,
    borderColor: '#6b5b95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 40,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userHandle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6b5b95',
  },
  editButtonText: {
    color: '#6b5b95',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2a2a4e',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  artistsScroll: {
    marginBottom: 24,
    marginHorizontal: -16,
  },
  artistsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  artistCard: {
    alignItems: 'center',
    marginRight: 12,
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  addArtistCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#2a2a4e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3a5e',
    borderStyle: 'dashed',
  },
  addArtistIcon: {
    color: '#888',
    fontSize: 24,
  },
  addArtistText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postThumbnail: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});
