import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import GroupsScreen from '../screens/GroupsScreen';
import AccountScreen from '../screens/AccountScreen';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ iconName, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Ionicons
      name={iconName}
      size={24}
      color={focused ? '#6b5b95' : '#888'}
    />
  </View>
);

function GroupsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a1a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="GroupsList"
        component={GroupsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={({ route }) => ({
          title: route.params.group.name,
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0a0a1a',
          borderTopColor: '#2a2a4e',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: '#0a0a1a' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={focused ? 'home' : 'home-outline'} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={focused ? 'people' : 'people-outline'} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon iconName={focused ? 'person' : 'person-outline'} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
