import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView className='flex-1 pt-10 p-16 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel} className='font-semibold'>
          Available Balance
        </Text>
        <Text style={styles.balanceAmount}>$25.00</Text>
        <StyledButton
          className='p-4 mt-4 rounded-full'
          style={styles.withdrawButton}
          onPress={() => alert('Withdrawal functionality')}
        >
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </StyledButton>
      </View>

      {/* Menu Items Section */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon={<Icon.User stroke='white' />}
          label='Personal Info'
          onPress={() => navigation.navigate('ChefProfile')}
        />
        <MenuItem
          icon={<Icon.Settings stroke='white' />}
          label='Settings'
          onPress={() => {
            alert('Settings');
          }}
        />
        <MenuItem
          icon={<Icon.DollarSign stroke='white' />}
          label='Withdrawal History'
          onPress={() => {
            alert('Withdrawal History Not Found');
          }}
        />
        <MenuItem
          icon={<Icon.FileText stroke='white' />}
          label='Completed Orders'
          // value="1"
          onPress={() => navigation.navigate('ChefPastOrders')}
        />
        <MenuItem
          icon={<Icon.Star stroke='white' />}
          label='User Reviews'
          onPress={() => navigation.navigate('ChefReviews')}
        />
        <MenuItem
          icon={<Icon.LogOut stroke='white' />}
          label='Log Out'
          onPress={() => {
            alert('Logging Out');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// Menu Item Component
const MenuItem = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>{icon}</View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuLabel}>{label}</Text>
        {value && <Text style={styles.menuValue}>{value}</Text>}
      </View>
      <Icon.ChevronRight stroke={themeColors.grayText} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  balanceContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...themeColors.shadowProp, // Shadow
  },
  balanceLabel: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: themeColors.button,
  },
  withdrawButton: {
    borderColor: themeColors.button,
    borderWidth: 1,
  },
  withdrawButtonText: {
    color: themeColors.button,
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 0,
    paddingHorizontal: 35,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 8,
    ...themeColors.shadowProp, // Shadow
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: themeColors.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuLabel: {
    fontSize: 16,
    color: themeColors.grayDisplayText,
  },
  menuValue: {
    fontSize: 16,
    color: themeColors.grayDisplayText,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
