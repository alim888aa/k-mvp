import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from '../components/PostCard';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

const trendingPosts = [
  {
    id: '1',
    user: 'StrayKidsFan',
    handle: 'skzlover',
    time: '2h',
    caption: 'The new album is absolutely incredible! 🔥 Been listening on repeat all day',
    image: require('../../assets/skz-1.jpg'),
    likes: 1234,
    retweets: 456,
    comments: [
      { id: 1, user: 'Stay4Ever', text: 'Same here! The title track is amazing' },
      { id: 2, user: 'KpopFan', text: 'Best comeback this year!' },
    ],
  },
  {
    id: '2',
    user: 'TwiceOnce',
    handle: 'oncewithtwice',
    time: '4h',
    caption: 'Concert was magical ✨ Still cant believe I saw them live!',
    image: require('../../assets/twice-1.jpg'),
    likes: 2567,
    retweets: 789,
    comments: [
      { id: 1, user: 'OnceForever', text: 'So jealous! How was the setlist?' },
    ],
  },
];

const myGroupsPosts = [
  {
    id: '3',
    user: 'EnhypenWorld',
    handle: 'engene_daily',
    time: '1h',
    caption: 'New photoshoot dropped and Im not okay 😭💕',
    image: require('../../assets/enh-1.jpg'),
    likes: 892,
    retweets: 234,
    comments: [],
  },
  {
    id: '4',
    user: 'SKZUpdates',
    handle: 'skz_news',
    time: '3h',
    caption: 'KARMA era was everything! What a masterpiece 🎵',
    image: require('../../assets/karma.jpg'),
    likes: 567,
    retweets: 123,
    comments: [
      { id: 1, user: 'Stay123', text: 'One of their best albums!' },
    ],
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Currently Trending</Text>
        {trendingPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <Text style={styles.sectionTitle}>From My Groups</Text>
        {myGroupsPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
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
    padding: isDesktop ? 24 : 0,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 12,
  },
});
