import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { styled } from 'nativewind';
import { DRINK_INGREDIENTS, FOOD_INGREDIENTS, FOOD_ITEM_CATEGORIES, FOOD_ITEM_TYPES } from '../constants';

const StyledButton = styled(TouchableOpacity);

const ChefEditItemScreen = ({ route, navigation }) => {
  const { itemDetails } = route.params;

  // Store the updated item details in useState
  const [newItemDetails, setNewItemDetails] = useState(itemDetails);
  const [pickup, setPickup] = useState(itemDetails.deliveryMethods.includes('Pickup'));
  const [delivery, setDelivery] = useState(itemDetails.deliveryMethods.includes('Delivery'));

  // Determine which ingredients to show based on itemDetails.type
  const ingredientsToShow =
    itemDetails.type === 'Food' ? FOOD_INGREDIENTS : DRINK_INGREDIENTS;

  // Create a map of selected ingredients for quick lookup
  const selectedIngredients = new Set(newItemDetails.ingredients.map((i) => i.name));

  // Store selected meal type (All Day, Breakfast, Lunch, Dinner)
  const [selectedCategory, setSelectedCategory] = useState(itemDetails.category || 'All Day');

  const resetItemDetails = () => {
    setNewItemDetails(itemDetails);
    setPickup(itemDetails.deliveryMethods.includes('Pickup'));
    setDelivery(itemDetails.deliveryMethods.includes('Delivery'));
    setSelectedCategory(itemDetails.category || 'All Day');
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setNewItemDetails({ ...newItemDetails, category: category });
  };

  const renderTypeOption = (type) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.typeOption,
        { backgroundColor: newItemDetails.type === type ? themeColors.buttonBg : themeColors.greyedButton }
      ]}
      onPress={() => setNewItemDetails({ ...newItemDetails, type })}
    >
      <Text style={[
        styles.typeOptionText,
        { color: newItemDetails.type === type ? themeColors.button : themeColors.inactiveButton }
      ]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  const renderCategoryOption = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.typeOption,
        { backgroundColor: newItemDetails.category === category ? themeColors.buttonBg : themeColors.greyedButton }
      ]}
      onPress={() => handleCategorySelection(category)}
    >
      <Text style={[
        styles.typeOptionText,
        { color: selectedCategory === category ? themeColors.button : themeColors.inactiveButton }
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderIngredientItem = ({ item }) => {
    const isSelected = selectedIngredients.has(item.name);;

    const handleIngredientPress = () => {
      let updatedIngredients;

      if (isSelected) {
        // Remove ingredient if already selected
        updatedIngredients = newItemDetails.ingredients.filter((i) => i.name !== item.name);
      } else {
        // Add ingredient if not already selected
        updatedIngredients = [...newItemDetails.ingredients, item];
      }

      setNewItemDetails({ ...newItemDetails, ingredients: updatedIngredients });
    };

    return (
      <TouchableOpacity
        style={[
          styles.ingredientItem,
          { backgroundColor: isSelected ? themeColors.buttonBg : themeColors.greyedButton },
          item.allergy && styles.allergy,
        ]}
        onPress={handleIngredientPress}
      >
        <Icon.CheckCircle
          size={16}
          color={isSelected ? themeColors.button : themeColors.inactiveButton}
        />
        <View style={styles.ingredientTextContainer}>
          <Text style={styles.ingredientText}>{item.name}</Text>
          {item.allergy && <Text style={styles.allergyText}> (Allergy)</Text>}
        </View>
      </TouchableOpacity>
    )
  };

  const handleSaveChanges = () => {
    // Validate new price
    if (isNaN(newItemDetails.price || typeof (newItemDetails.price) !== 'number')) {
      alert('Please enter a valid price.');
      return;
    } else {
      // round to 2 d.p. and make it a Number for example 6. => 6
      let newPrice = Number(newItemDetails.price).toFixed(2);
      if (newPrice < 0.5) {
        newPrice = 0.5;
      }
      setNewItemDetails({ ...newItemDetails, price: newPrice })
      alert(newPrice);
    }

    // Validate other fields
    if (
      newItemDetails.name.length === 0 ||
      newItemDetails.description.length === 0 ||
      newItemDetails.ingredients.length === 0 ||
      newItemDetails.price === 0
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (
      newItemDetails.deliveryMethods.length === 0
    ) {
      alert('Please select at least one delivery method.');
      return;
    }

    alert(JSON.stringify(newItemDetails))
  }

  const renderHeader = (newItemDetails) => (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ChevronLeft strokeWidth={2} stroke="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Food Item</Text>
        <TouchableOpacity onPress={() => resetItemDetails()}>
          <Text style={styles.editText}>RESET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ITEM NAME</Text>
        <TextInput
          style={styles.input}
          maxLength={38}
          value={newItemDetails.name}
          onChangeText={(text) => setNewItemDetails({ ...newItemDetails, name: text })}
        />
      </View>

      <Text style={styles.sectionTitle}>UPLOAD PHOTO</Text>
      <TouchableOpacity style={styles.imageUploadContainer}>
        {itemDetails.image ? <Image source={require('../assets/images/UploadImage.png')} style={styles.foodImage} /> : itemDetails.image}
      </TouchableOpacity>

      <View style={styles.priceContainer}>
        <Text style={styles.label}>PRICE</Text>
        <TextInput
          style={styles.input}
          value={`$${newItemDetails.price}`}
          onChangeText={(text) => setNewItemDetails({ ...newItemDetails, price: text.replace('$', '') })}
        />
      </View>

      <Text style={styles.sectionTitle}>FOOD TYPE</Text>
      <View style={styles.typeOptions}>
        {FOOD_ITEM_TYPES.map(renderTypeOption)}
      </View>

      <Text style={styles.sectionTitle}>CATEGORY</Text>
      <View style={styles.typeOptions}>
        {FOOD_ITEM_CATEGORIES.map(renderCategoryOption)}
      </View>

      <Text style={styles.sectionTitle}>DELIVERY OPTIONS</Text>
      <View style={styles.typeOptions}>
        <TouchableOpacity style={[
          styles.typeOption,
          { backgroundColor: pickup ? themeColors.buttonBg : themeColors.greyedButton }
        ]} onPress={() => {
          setPickup(!pickup);
          const updatedDeliveryMethods = !pickup
            ? [...newItemDetails.deliveryMethods, 'Pickup']
            : newItemDetails.deliveryMethods.filter(method => method !== 'Pickup');

          setNewItemDetails({ ...newItemDetails, deliveryMethods: updatedDeliveryMethods });
        }}>
          <Text style={[
            styles.typeOptionText,
            { color: pickup ? themeColors.button : themeColors.inactiveButton }
          ]}>
            Pickup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[
          styles.typeOption,
          { backgroundColor: delivery ? themeColors.buttonBg : themeColors.greyedButton }
        ]}
          onPress={() => {
            setDelivery(!delivery);
            const updatedDeliveryMethods = !delivery
              ? [...newItemDetails.deliveryMethods, 'Delivery']
              : newItemDetails.deliveryMethods.filter(method => method !== 'Delivery');

            setNewItemDetails({ ...newItemDetails, deliveryMethods: updatedDeliveryMethods });
          }}
        >
          <Text style={[
            styles.typeOptionText,
            { color: delivery ? themeColors.button : themeColors.inactiveButton }
          ]}>
            Delivery
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>INGREDIENTS</Text>
    </>
  );

  const renderFooter = (newItemDetails) => (
    <>
      <Text style={styles.sectionTitle}>DESCRIPTION</Text>
      <TextInput
        style={styles.detailsInput}
        value={newItemDetails.description}
        onChangeText={(text) => setNewItemDetails({ ...newItemDetails, description: text })}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveChanges()}>
        <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FlatList
          data={ingredientsToShow.flatMap((group) => group.ingredients)}
          renderItem={renderIngredientItem}
          keyExtractor={(item) => item.name}
          numColumns={3}
          columnWrapperStyle={styles.ingredientListRow}
          ListHeaderComponent={renderHeader(newItemDetails)}
          ListFooterComponent={renderFooter(newItemDetails)}
          contentContainerStyle={styles.contentContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    color: themeColors.grayDisplayText,
  },
  editText: {
    color: themeColors.button,
    fontSize: 16,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.inactiveButton,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: themeColors.grayDisplayText,
    backgroundColor: themeColors.greyedButton,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  foodImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 16,
  },
  priceContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 20
  },
  typeOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionSubTitle: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#666',
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
    width: '30%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: themeColors.greyedButton,
  },
  ingredientTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientText: {
    marginTop: 8,
    color: themeColors.grayDisplayText,
    fontSize: 12,
    textAlign: 'center',
  },
  allergyText: {
    fontSize: 10,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: themeColors.inactiveButton,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: themeColors.grayDisplayText,
    backgroundColor: themeColors.greyedButton,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 100,
  },
  saveButton: {
    backgroundColor: themeColors.button,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default ChefEditItemScreen;