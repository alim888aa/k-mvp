import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import PostCard from '../components/PostCard';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

const filters = ['Newest', 'Trending', 'Popular'];

const getPostsForGroup = (groupName) => {
  const postsMap = {
    'Stray Kids': [
      {
        id: '1',
        user: 'SKZDaily',
        handle: 'skz_updates',
        time: '30m',
        caption: 'New behind the scenes content just dropped! The members are so funny 😂',
        image: require('../../assets/skz-1.jpg'),
        likes: 3421,
        retweets: 892,
        comments: [
          { id: 1, user: 'Stay123', text: 'I love them so much!' },
          { id: 2, user: 'SKZFan', text: 'Felix is so adorable here' },
        ],
      },
      {
        id: '2',
        user: 'StayForever',
        handle: 'stay_4ever',
        time: '2h',
        caption: 'KARMA era appreciation post! This album was a masterpiece 🎵✨',
        image: require('../../assets/karma.jpg'),
        likes: 2567,
        retweets: 623,
        comments: [
          { id: 1, user: 'Concert_Lover', text: 'One of their best!' },
        ],
      },
    ],
    'Twice': [
      {
        id: '1',
        user: 'TwiceUpdates',
        handle: 'twice_daily',
        time: '1h',
        caption: 'The girls looking stunning as always! 💕',
        image: require('../../assets/twice-1.jpg'),
        likes: 4521,
        retweets: 1203,
        comments: [
          { id: 1, user: 'Once4Life', text: 'Queens!' },
        ],
      },
    ],
    'Enhypen': [
      {
        id: '1',
        user: 'EnhypenNews',
        handle: 'enhypen_updates',
        time: '45m',
        caption: 'New concept photos are here! The visuals are unreal 🔥',
        image: require('../../assets/enh-1.jpg'),
        likes: 2891,
        retweets: 756,
        comments: [],
      },
    ],
  };
  return postsMap[groupName] || [];
};

export default function CommunityScreen({ route }) {
  const { group } = route.params;
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [isJoined, setIsJoined] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState(getPostsForGroup(group.name));

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (postText.trim() || selectedImage) {
      const newPost = {
        id: Date.now().toString(),
        user: 'You',
        handle: 'your_handle',
        time: 'now',
        caption: postText,
        image: selectedImage ? { uri: selectedImage } : null,
        likes: 0,
        retweets: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostText('');
      setSelectedImage(null);
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setPostText('');
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{group.name} | {group.fandom}</Text>
          <TouchableOpacity
            style={[styles.joinButton, isJoined && styles.joinedButton]}
            onPress={() => setIsJoined(!isJoined)}
          >
            <Text style={styles.joinText}>{isJoined ? 'Joined' : 'Join'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter, index) => (
            <React.Fragment key={filter}>
              <TouchableOpacity onPress={() => setActiveFilter(filter)}>
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.activeFilter,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
              {index < filters.length - 1 && (
                <Text style={styles.filterDivider}>|</Text>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView style={styles.postsContainer} contentContainerStyle={styles.postsContent}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New Post</Text>
              <TouchableOpacity onPress={handlePost}>
                <Text style={[styles.postText, (!postText.trim() && !selectedImage) && styles.postTextDisabled]}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.postInput}
              placeholder="What's happening?"
              placeholderTextColor="#666"
              multiline
              value={postText}
              onChangeText={setPostText}
              autoFocus
            />

            {selectedImage && (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <Ionicons name="close" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Ionicons name="image-outline" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  joinButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  joinedButton: {
    backgroundColor: '#6b5b95',
    borderColor: '#6b5b95',
  },
  joinText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: '#888',
    fontSize: 15,
  },
  filterDivider: {
    color: '#444',
    marginHorizontal: 12,
  },
  activeFilter: {
    color: '#fff',
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
  },
  postsContent: {
    padding: isDesktop ? 24 : 0,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6b5b95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postText: {
    color: '#6b5b95',
    fontSize: 16,
    fontWeight: '600',
  },
  postTextDisabled: {
    opacity: 0.5,
  },
  postInput: {
    color: '#fff',
    fontSize: 18,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a4e',
  },
  imageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2a2a4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 22,
  },
});
