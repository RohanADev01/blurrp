import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useFonts } from 'expo-font';
import { FOOD_ITEM_CATEGORIES } from '../constants';
import { EXAMPLE_FOOD_ITEMS } from '../constants';
import { Menu, IconButton } from 'react-native-paper';


const CenteredView = styled(View);
const StyledButton = styled(TouchableOpacity);

const ChefItemListScreen = () => {
  const [activeTab, setActiveTab] = useState(FOOD_ITEM_CATEGORIES[0]);
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const foodItems = EXAMPLE_FOOD_ITEMS;

  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const handleFoodItemPress = (foodItem) => {
    navigation.navigate('ChefItemDetails', { itemDetails: foodItem });
  };

  const filteredFoodItems = (foodItems) => {
    if (activeTab === FOOD_ITEM_CATEGORIES[0]) {
      return foodItems
    }
    return foodItems.filter((item) => item.category === activeTab);
  }

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleFoodItemPress(item)} style={styles.foodItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.foodTextContainer}>
        <View style={styles.foodTitleRow}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{item.category}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Icon.Star fill={themeColors.button} stroke="transparent" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} Review)</Text>
        </View>
      </View>
      <View style={styles.endContainer}>
        <Menu
          visible={menuVisible && selectedFoodItem === item.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="dots-horizontal"
              color="#333"
              onPress={() => {
                setSelectedFoodItem(item.id);
                setMenuVisible(true);
              }}
            />
          }
          contentStyle={styles.menuContent}
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('ChefEditItem', { itemDetails: item });
            }}
            title="Edit"
            leadingIcon="pencil"
            style={styles.menuItem}
            titleStyle={styles.menuItemText}
          />
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              // TODO: Handle delete action
            }}
            title="Delete"
            leadingIcon="delete"
            style={styles.menuItem}
            titleStyle={styles.menuItemText}
          />
        </Menu>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.deliveryMethodContainer}>
          {item.deliveryMethods.map((method, idx) => {
            return (
              <Text style={styles.deliveryMethod} key={idx}>{method}</Text>
            )
          })}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 p-16 bg-white'>
      <ImageBackground
        source={require('../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ChevronLeft strokeWidth={2} stroke="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Food List</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab(FOOD_ITEM_CATEGORIES[0])}
          style={[styles.tab, activeTab === FOOD_ITEM_CATEGORIES[0] && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === FOOD_ITEM_CATEGORIES[0] && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(FOOD_ITEM_CATEGORIES[1])}
          style={[styles.tab, activeTab === FOOD_ITEM_CATEGORIES[1] && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === FOOD_ITEM_CATEGORIES[1] && styles.activeTabText]}>
            Breakfast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(FOOD_ITEM_CATEGORIES[2])}
          style={[styles.tab, activeTab === FOOD_ITEM_CATEGORIES[2] && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === FOOD_ITEM_CATEGORIES[2] && styles.activeTabText]}>
            Lunch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(FOOD_ITEM_CATEGORIES[3])}
          style={[styles.tab, activeTab === FOOD_ITEM_CATEGORIES[3] && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === FOOD_ITEM_CATEGORIES[3] && styles.activeTabText]}>
            Dinner
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemCountText}>Total {filteredFoodItems(foodItems).length} items</Text>
      <FlatList
        style={styles.foodListContainer}
        data={filteredFoodItems(foodItems)}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ChefAddNewItem')} className='mb-5 mx-20 rounded-full' style={{ backgroundColor: themeColors.button }}>
        <Text style={[styles.addButtonText]}>Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'white', opacity: 0.5, zIndex: -5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: themeColors.grayDisplayText,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.inactiveButton,
    paddingHorizontal: 35,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#cfd0d3',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.button,
  },
  activeTabText: {
    color: themeColors.button,
    fontWeight: 'bold',
  },
  itemCountText: {
    marginVertical: 16,
    marginLeft: 35,
    color: themeColors.grayText,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  foodTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  foodTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: themeColors.grayDisplayText,
    fontSize: 14,
  },
  endContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto', // This pushes the container to the right
  },
  price: {
    fontWeight: 'bold',
    marginTop: 8,
    color: themeColors.grayDisplayText,
    fontSize: 16,
  },
  tagContainer: {
    backgroundColor: themeColors.buttonBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  tag: {
    color: themeColors.button,
    fontFamily: 'Inter',
    fontSize: 12,
    padding: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    color: themeColors.grayDisplayText,
    fontSize: 14,
    marginLeft: 4,
  },
  reviews: {
    color: themeColors.grayText,
    fontSize: 12,
    marginLeft: 4,
  },
  deliveryMethodContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryMethod: {
    marginLeft: 'auto',
    marginTop: 8,
    color: themeColors.lightGrayText,
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: themeColors.inactiveButton,
    marginVertical: 8,
  },
  foodListContainer: {
    marginHorizontal: 20,
  },
  addButtonText: {
    paddingVertical: 12,
    paddingHorizontal: 1,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  menuContent: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: themeColors.inactiveButton,
    borderRadius: 8,
  },
  menuItem: {
    height: 48,
    justifyContent: 'center',
  },
  menuItemText: {
    color: themeColors.grayDisplayText,
    fontSize: 16,
  },
});

export default ChefItemListScreen;
