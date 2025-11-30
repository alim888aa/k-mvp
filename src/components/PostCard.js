import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), user: 'You', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.user?.charAt(0) || 'U'}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user || 'Anonymous'}</Text>
          <Text style={styles.handle}>@{post.handle || 'user'} · {post.time || '1h'}</Text>
        </View>
      </View>

      {post.caption && <Text style={styles.caption}>{post.caption}</Text>}

      {post.image && (
        <View style={styles.imageContainer}>
          <Image source={post.image} style={styles.postImage} resizeMode="cover" />
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowComments(!showComments)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#888" />
          <Text style={styles.actionCount}>{comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="repeat-outline" size={20} color="#888" />
          <Text style={styles.actionCount}>{post.retweets || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#e91e63' : '#888'} />
          <Text style={[styles.actionCount, liked && styles.likedCount]}>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {showComments && (
        <View style={styles.commentsSection}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{comment.user?.charAt(0)}</Text>
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
          <View style={styles.addComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#666"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Text style={styles.sendText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: isDesktop ? 16 : 0,
    marginBottom: isDesktop ? 16 : 0,
    borderBottomWidth: isDesktop ? 0 : 1,
    borderBottomColor: '#2a2a4e',
    padding: 16,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6b5b95',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  handle: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  caption: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2a2a4e',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  actionCount: {
    color: '#888',
    fontSize: 14,
  },
  likedCount: {
    color: '#e91e63',
  },
  commentsSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a4e',
    paddingTop: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4a4a6e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#2a2a4e',
    borderRadius: 12,
    padding: 10,
  },
  commentUser: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  commentText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 18,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#2a2a4e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#6b5b95',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
