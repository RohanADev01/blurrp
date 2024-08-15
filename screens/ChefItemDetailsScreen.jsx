import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);

const ChefItemDetailsScreen = ({ route, navigation }) => {
  const { itemDetails } = route.params;

  const renderIngredientItem = ({ item }) => (
    <View style={styles.ingredientItem}>
      <Icon.CheckCircle size={16} color={themeColors.button} />
      <View style={styles.ingredientTextContainer}>
        <Text style={styles.ingredientText}>{item.name}</Text>
        {item.allergy && <Text style={styles.allergyText}> (Allergy)</Text>}
      </View>
    </View>
  );

  const renderHeader = (itemDetails) => (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ChevronLeft strokeWidth={2} stroke='#000' />
        </TouchableOpacity>
        <Text style={styles.headerText}>Food Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ChefEditItem', { itemDetails: itemDetails })}>
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/images/Sushi.png')}
        style={styles.foodImage}
      />

      <View style={styles.tagsContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{itemDetails.category}</Text>
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{itemDetails.type}</Text>
        </View>
        {itemDetails.deliveryMethods.map((method, idx) => {
          return (
            <View style={styles.tagContainer} key={idx}>
              <Text style={styles.tag}>{method}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.foodTitleRow}>
        <Text style={styles.title}>{itemDetails.name}</Text>
        <Text style={styles.price}>${itemDetails.price}</Text>
      </View>
      <View style={styles.ratingRow}>
        <Text style={styles.location}>
          📍 {`${itemDetails.distance} km away` || '0 km away'}
        </Text>
        <Icon.Star fill={themeColors.button} stroke='transparent' />
        <Text style={styles.rating}>{itemDetails.rating}</Text>
        <Text style={styles.reviews}>({itemDetails.reviews} Reviews)</Text>
      </View>

      <Text style={styles.sectionTitle}>INGREDIENTS</Text>
    </>
  );

  const renderFooter = (itemDetails) => (
    <>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{itemDetails.description}</Text>
    </>
  );

  return (
    <SafeAreaView classname='flex-1 p-16'>
      <ImageBackground
        source={require('../assets/images/FoodItemsScreenBgCorner.png')}
        style={styles.backgroundImg}
      />
      <FlatList
        data={itemDetails.ingredients}
        renderItem={renderIngredientItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.ingredientListRow}
        ListHeaderComponent={renderHeader(itemDetails)}
        ListFooterComponent={renderFooter(itemDetails)}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 1,
    zIndex: -5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editText: {
    color: themeColors.button,
    fontSize: 16,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 20,
    gap: 4,
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
    padding: 2,
    fontSize: 12,
  },
  foodTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20,
  },
  price: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  location: {
    color: '#666',
    fontSize: 14,
    marginRight: 8,
  },
  rating: {
    color: '#333',
    fontSize: 14,
    marginLeft: 4,
  },
  reviews: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  ingredientListRow: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  ingredientItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    width: '30%', // To ensure proper layout within the grid
  },
  ingredientTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientText: {
    marginTop: 8,
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  allergyText: {
    color: '#ff0000',
    fontSize: 10,
  },
  description: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  contentContainer: {
    paddingBottom: 20, // To provide space at the bottom
  },
});

export default ChefItemDetailsScreen;
