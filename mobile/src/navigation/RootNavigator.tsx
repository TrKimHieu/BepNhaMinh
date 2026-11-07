import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { colors } from '../constants/theme';

/**
 * Mọi route phải khai báo trong RootStackParamList.
 * Nhờ vậy `navigation.navigate('...')` được kiểm tra type, gõ sai tên là lỗi compile.
 */
export type RootStackParamList = {
  Home: undefined;
  // Auth: undefined;
  // MealPlan: { weekStart: string };
  // RecipeDetail: { recipeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Bếp Nhà Mình' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
