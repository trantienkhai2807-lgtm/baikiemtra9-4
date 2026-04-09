import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const COMMENT_BASE_TOTAL = 579;

const screenImages = {
  following: require('./figma/TikTok Home (Following).png'),
  forYou: require('./figma/TikTok Home (For You).png'),
};

const initialComments = [
  {
    id: '1',
    user: 'martini_rond',
    text: 'How neatly I write the date in my book',
    time: '22h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#8A684E',
    initial: 'M',
    replyCount: 4,
    showReplies: false,
    replies: ['That handwriting is way too clean.', 'Watching this is strangely satisfying.'],
  },
  {
    id: '2',
    user: 'maxjacobson',
    text: "Now that's a skill very talented",
    time: '22h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#587A91',
    initial: 'M',
    replyCount: 1,
    showReplies: false,
    replies: ['I wish my notes looked like this.'],
  },
  {
    id: '3',
    user: 'zackjohn',
    text: 'Doing this would make me so anxious',
    time: '22h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#9B684E',
    initial: 'Z',
    replyCount: 2,
    showReplies: false,
    replies: ['Same, one mistake and I restart.', 'Still impressive though.'],
  },
  {
    id: '4',
    user: 'kiero_d',
    text: 'Use that on r air forces to whiten them',
    time: '21h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#5B7088',
    initial: 'K',
    replyCount: 9,
    showReplies: false,
    replies: ['That would actually work.', 'This comment wins.'],
  },
  {
    id: '5',
    user: 'mis_potter',
    text: "Sipuld've used that on his forces",
    time: '13h',
    likes: 8098,
    liked: false,
    verified: true,
    avatarColor: '#A46D8E',
    initial: 'M',
    replyCount: 4,
    showReplies: false,
    replies: ['Not the forces again.', 'TikTok comments stay undefeated.'],
  },
  {
    id: '6',
    user: 'karennne',
    text: 'No prressure',
    time: '22h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#7C6E5A',
    initial: 'K',
    replyCount: 2,
    showReplies: false,
    replies: ['Exactly how my hand would shake.', 'Pressure is the whole video.'],
  },
  {
    id: '7',
    user: 'joshua_l',
    text: "My OCD couldn't do it",
    time: '15h',
    likes: 8098,
    liked: false,
    verified: false,
    avatarColor: '#4B8E8A',
    initial: 'J',
    replyCount: 0,
    showReplies: false,
    replies: [],
  },
];

const hitAreas = {
  followingTab: { left: '29%', top: '4.5%', width: '19%', height: '7%' },
  forYouTab: { left: '48%', top: '4.5%', width: '18%', height: '7%' },
  bottomHome: { left: '0%', top: '88%', width: '19%', height: '12%' },
  bottomComments: { left: '61%', top: '88%', width: '19%', height: '12%' },
  sideCommentToComments: { left: '82%', top: '63%', width: '16%', height: '12%' },
};

function OverlayButton({ area, onPress, label }) {
  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.hitArea,
        area.left !== undefined && { left: area.left },
        area.right !== undefined && { right: area.right },
        area.top !== undefined && { top: area.top },
        area.bottom !== undefined && { bottom: area.bottom },
        { width: area.width, height: area.height },
      ]}
    />
  );
}

function StaticDesignScreen({ source, overlays }) {
  return (
    <View style={styles.screen}>
      <Image resizeMode="stretch" source={source} style={styles.designImage} />
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        {overlays.map((overlay) => (
          <OverlayButton
            key={overlay.label}
            area={overlay.area}
            label={overlay.label}
            onPress={overlay.onPress}
          />
        ))}
      </View>
    </View>
  );
}

function openComments(navigation, originTab) {
  navigation.getParent('MainTabs')?.navigate('Comments', { originTab });
}

function FollowingScreen({ navigation }) {
  return (
    <StaticDesignScreen
      overlays={[
        {
          label: 'Open Following tab',
          area: hitAreas.followingTab,
          onPress: () => navigation.navigate('Following'),
        },
        {
          label: 'Open For You tab',
          area: hitAreas.forYouTab,
          onPress: () => navigation.navigate('ForYou'),
        },
        {
          label: 'Open home screen',
          area: hitAreas.bottomHome,
          onPress: () => navigation.navigate('Following'),
        },
        {
          label: 'Open comments screen from bottom tab',
          area: hitAreas.bottomComments,
          onPress: () => openComments(navigation, 'Following'),
        },
        {
          label: 'Open comments screen from comment action',
          area: hitAreas.sideCommentToComments,
          onPress: () => openComments(navigation, 'Following'),
        },
      ]}
      source={screenImages.following}
    />
  );
}

function ForYouScreen({ navigation }) {
  return (
    <StaticDesignScreen
      overlays={[
        {
          label: 'Open Following tab',
          area: hitAreas.followingTab,
          onPress: () => navigation.navigate('Following'),
        },
        {
          label: 'Open For You tab',
          area: hitAreas.forYouTab,
          onPress: () => navigation.navigate('ForYou'),
        },
        {
          label: 'Open home screen',
          area: hitAreas.bottomHome,
          onPress: () => navigation.navigate('ForYou'),
        },
        {
          label: 'Open comments screen from bottom tab',
          area: hitAreas.bottomComments,
          onPress: () => openComments(navigation, 'ForYou'),
        },
        {
          label: 'Open comments screen from comment action',
          area: hitAreas.sideCommentToComments,
          onPress: () => openComments(navigation, 'ForYou'),
        },
      ]}
      source={screenImages.forYou}
    />
  );
}

function Avatar({ color, initial, imageSource }) {
  if (imageSource) {
    return <Image source={imageSource} style={styles.avatarImage} />;
  }

  return (
    <View style={[styles.avatarFallback, { backgroundColor: color }]}>
      <Text style={styles.avatarInitial}>{initial}</Text>
    </View>
  );
}

function CommentItem({ item, onToggleLike, onToggleReplies }) {
  return (
    <View style={styles.commentRow}>
      <Avatar color={item.avatarColor} initial={item.initial} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeaderRow}>
          <Text style={styles.commentUser}>{item.user}</Text>
          {item.verified ? <Ionicons color="#4FC3F7" name="checkmark-circle" size={14} /> : null}
          <Text style={styles.commentTime}>{item.time}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentMetaRow}>
          {item.replyCount > 0 ? (
            <Pressable onPress={() => onToggleReplies(item.id)}>
              <Text style={styles.replyToggleText}>
                {item.showReplies ? 'Hide replies' : `View replies (${item.replyCount})`}
              </Text>
            </Pressable>
          ) : null}
        </View>
        {item.showReplies ? (
          <View style={styles.replyList}>
            {item.replies.map((reply, index) => (
              <Text key={`${item.id}-${index}`} style={styles.replyText}>
                @{item.user} {reply}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <Pressable onPress={() => onToggleLike(item.id)} style={styles.likeButton}>
        <Ionicons
          color={item.liked ? '#FF2D55' : '#A6A6AD'}
          name={item.liked ? 'heart' : 'heart-outline'}
          size={20}
        />
        <Text style={[styles.commentLikeCount, item.liked && styles.commentLikeCountActive]}>
          {item.likes}
        </Text>
      </Pressable>
    </View>
  );
}

function CommentsScreen({ navigation, route }) {
  const originTab = route.params?.originTab ?? 'ForYou';
  const isFocused = useIsFocused();
  const [comments, setComments] = useState(initialComments);
  const [draftComment, setDraftComment] = useState('');
  const sheetTranslateY = useRef(new Animated.Value(36)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const trimmedDraft = draftComment.trim();
  const totalComments =
    COMMENT_BASE_TOTAL + comments.filter((comment) => comment.id.startsWith('new-')).length;
  const backgroundSource = originTab === 'Following' ? screenImages.following : screenImages.forYou;

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    sheetTranslateY.setValue(44);
    backdropOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(sheetTranslateY, {
        duration: 240,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        duration: 220,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, isFocused, originTab, sheetTranslateY]);

  function closeComments() {
    navigation.navigate('Home', { screen: originTab });
  }

  function toggleCommentLike(commentId) {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.likes + (comment.liked ? -1 : 1),
            }
          : comment
      )
    );
  }

  function toggleReplies(commentId) {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment
      )
    );
  }

  function submitComment() {
    if (!trimmedDraft) {
      return;
    }

    setComments((currentComments) => [
      {
        id: `new-${Date.now()}`,
        user: 'you',
        text: trimmedDraft,
        time: 'now',
        likes: 0,
        liked: false,
        verified: false,
        avatarColor: '#E49AAE',
        initial: 'Y',
        replyCount: 0,
        showReplies: false,
        replies: [],
      },
      ...currentComments,
    ]);
    setDraftComment('');
  }

  return (
    <ImageBackground resizeMode="cover" source={backgroundSource} style={styles.screen}>
      <Animated.View pointerEvents="none" style={[styles.commentsBackdrop, { opacity: backdropOpacity }]} />
      <Pressable accessibilityLabel="Close comments overlay" onPress={closeComments} style={StyleSheet.absoluteFill} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screen}
      >
        <Animated.View style={[styles.sheetWrapper, { transform: [{ translateY: sheetTranslateY }] }]}>
          <View style={styles.commentsSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{totalComments} comments</Text>
              <Pressable accessibilityLabel="Close comments" onPress={closeComments} style={styles.closeButton}>
                <Ionicons color="#2A2A2E" name="close" size={24} />
              </Pressable>
            </View>

            <FlatList
              contentContainerStyle={styles.commentListContent}
              data={comments}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CommentItem item={item} onToggleLike={toggleCommentLike} onToggleReplies={toggleReplies} />
              )}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.inputBar}>
              <View style={styles.inputShell}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={setDraftComment}
                  onSubmitEditing={submitComment}
                  placeholder="Add comment..."
                  placeholderTextColor="#8F8F96"
                  returnKeyType="send"
                  style={styles.textInput}
                  value={draftComment}
                />
              </View>
              <Pressable style={styles.inputIconButton}>
                <Feather color="#24242A" name="at-sign" size={21} />
              </Pressable>
              <Pressable style={styles.inputIconButton}>
                <Ionicons color="#24242A" name="happy-outline" size={23} />
              </Pressable>
              {trimmedDraft ? (
                <Pressable accessibilityLabel="Send comment" onPress={submitComment} style={styles.sendButton}>
                  <Ionicons color="#FFFFFF" name="send" size={16} />
                </Pressable>
              ) : null}
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

function HomeTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="Following"
      screenOptions={{
        animationEnabled: false,
        lazy: false,
        swipeEnabled: true,
      }}
      tabBar={() => null}
    >
      <TopTab.Screen component={FollowingScreen} name="Following" />
      <TopTab.Screen component={ForYouScreen} name="ForYou" />
    </TopTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <BottomTab.Navigator
          id="MainTabs"
          initialRouteName="Home"
          screenOptions={{
            animation: 'none',
            headerShown: false,
          }}
          tabBar={() => null}
        >
          <BottomTab.Screen component={HomeTabs} name="Home" />
          <BottomTab.Screen component={CommentsScreen} name="Comments" />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#000',
    flex: 1,
  },
  designImage: {
    height: '100%',
    width: '100%',
  },
  hitArea: {
    position: 'absolute',
  },
  commentsBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentsSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    height: '73.5%',
    overflow: 'hidden',
  },
  sheetHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 42,
    paddingBottom: 6,
    paddingHorizontal: 18,
    paddingTop: 10,
    position: 'relative',
  },
  sheetTitle: {
    color: '#1D1D22',
    fontSize: 14,
    fontWeight: '700',
  },
  closeButton: {
    padding: 2,
    position: 'absolute',
    right: 12,
    top: 9,
  },
  commentListContent: {
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
  commentRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
  },
  avatarImage: {
    borderRadius: 16,
    height: 32,
    width: 32,
  },
  avatarFallback: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  commentContent: {
    flex: 1,
  },
  commentHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginBottom: 2,
  },
  commentUser: {
    color: '#73737A',
    fontSize: 12,
    fontWeight: '600',
  },
  commentTime: {
    color: '#9A9AA2',
    fontSize: 11,
  },
  commentText: {
    color: '#1E1E24',
    fontSize: 13,
    lineHeight: 17,
  },
  commentMetaRow: {
    marginTop: 5,
  },
  replyToggleText: {
    color: '#8E8E95',
    fontSize: 12,
    fontWeight: '500',
  },
  replyList: {
    gap: 6,
    marginTop: 6,
    paddingLeft: 4,
  },
  replyText: {
    color: '#6A6A72',
    fontSize: 12,
    lineHeight: 16,
  },
  likeButton: {
    alignItems: 'center',
    gap: 2,
    minWidth: 38,
    paddingTop: 1,
  },
  commentLikeCount: {
    color: '#8E8E95',
    fontSize: 11,
    fontWeight: '500',
  },
  commentLikeCountActive: {
    color: '#FF2D55',
  },
  inputBar: {
    alignItems: 'center',
    borderTopColor: '#EFEFF3',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  inputShell: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 34,
  },
  textInput: {
    color: '#1F1F25',
    fontSize: 14,
    paddingVertical: 6,
  },
  inputIconButton: {
    padding: 2,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#FF2D55',
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
});
