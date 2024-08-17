import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/theme';
import {
  ApplicationProvider,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { LineChart } from 'react-native-chart-kit';
import {
  getCurrentDisplayDate,
  getPast30DaysEveryXNumbers,
  getReorderedDaysOfWeek,
} from '../../../helpers';

const StyledView = styled(View);
const StyledText = styled(Text);

const isAllZeros = (data) => {
  if (!Array.isArray(data)) {
    console.error('Data passed to isAllZeros is not an array:', data);
    return false;
  }
  return data.every((value) => value === 0);
};

const defaultChartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => themeColors.button,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: (value) => (value === 0 ? 0 : 4), // Set radius to 0 for dots where value is 0, otherwise 4,
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  propsForBackgroundLines: {
    display: 'none',
  },
  propsForLabels: {
    fontSize: 12,
  },
};

const defaultStyle = {
  marginVertical: 0,
  padding: 0,
  margin: 0,
  borderRadius: 16,
  alignSelf: 'center',
};

const CustomLineChart = ({
  data,
  labels,
  width = 150,
  height = 220,
  fromZero = true,
  chartConfig = defaultChartConfig,
  style = defaultStyle,
}) => {
  const isDataEmpty = isAllZeros(data);

  // Hide labels (on y axis) for empty data
  if (isDataEmpty) {
    chartConfig = {
      ...chartConfig,
      propsForHorizontalLabels: {
        display: 'none',
      },
    };
  }

  noOrdersText = 'No orders were placed  🙉';
  ordersText = 'You had orders!  🙌';

  return (
    <View style={style}>
      {isDataEmpty ? (
        <View className='flex justify-center items-center'>
          <Text className='text-sm font-bold' style={[styles.textInter]}>
            {noOrdersText}
          </Text>
        </View>
      ) : (
        <View className='flex justify-center items-center'>
          <Text className='text-sm font-bold' style={[styles.textInter]}>
            {ordersText}
          </Text>
        </View>
      )}
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              strokeWidth: 4,
            },
          ],
        }}
        width={width}
        height={height}
        fromZero={fromZero}
        chartConfig={chartConfig}
        bezier
        style={{
          ...style,
          marginVertical: 8,
          borderRadius: 16,
          paddingLeft: 0,
        }}
      />
    </View>
  );
};

const ChefDashboardScreen = () => {
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': require('../../../assets/fonts/LondrinaSolid-Regular.ttf'),
    'LondrinaSolid-Light': require('../../../assets/fonts/LondrinaSolid-Light.ttf'),
    Inter: require('../../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(2));

  const [showChart, setShowChart] = useState(false);

  const graphSelectOptions = ['Daily', 'Weekly', 'Monthly'];

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  // Constants from database
  const numRunningOrders = 0;
  const numOrderRequests = 0;
  const totalRevenue = 0;

  // Process the dataset to determine Y-axis values
  // const graphData = [0, 0, 1, 2, 0];
  const graphData = [0, 0, 0, 0, 0, 0, 0];
  // const graphData = [1, 2, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 3];

  let allGraphLabels = {
    Daily: ['12AM', '6AM', '12PM', '6PM', '12PM'],
    Weekly: getReorderedDaysOfWeek(),
    Monthly: getPast30DaysEveryXNumbers(3), // Get values for graph based on dates from this, i.e. not necessarily past 30 days.
  };

  const graphLabels = allGraphLabels[graphSelectOptions[selectedIndex.row]];

  return (
    <StyledView className='flex-1 py-12 bg-white'>
      <ImageBackground
        source={require('../../../assets/images/FoodItemsScreenBg.png')}
        style={styles.backgroundImg}
      />
      <SafeAreaView className='flex-1 justify-start items-center pt-4'>
        <View className='w-full px-4'>
          <View className='flex-row justify-between items-center p-1'>
            <TouchableOpacity
              style={{
                borderColor: themeColors.button,
                padding: 3,
              }}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon.Bell strokeWidth={2.5} stroke={themeColors.button} />
            </TouchableOpacity>
            <View className='flex-col items-center'>
              <StyledText
                className='text-xs font-bold mt-2'
                style={[styles.textInter, { color: themeColors.button }]}
              >
                LOCATION
              </StyledText>
              <TouchableOpacity className='flex-row items-center'>
                <StyledText
                  className='text-md font-semibold mt-2'
                  style={[styles.textInter]}
                >
                  5 Oxford Street
                </StyledText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderColor: themeColors.button,
                padding: 3,
              }}
              onPress={() => navigation.navigate('Account')}
            >
              <Icon.User strokeWidth={2.5} stroke={themeColors.button} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className='w-full px-4'>
          <View className='mt-6 flex-row justify-between mx-1'>
            <TouchableOpacity
              className='w-[45%] p-6 bg-white rounded-3xl items-start'
              style={[styles.shadowProp]}
              onPress={() => navigation.navigate('RunningOrders')}
            >
              <StyledText
                className='text-2xl font-bold'
                style={[styles.textInter, { fontSize: 22 }]}
              >
                {numRunningOrders}
              </StyledText>
              <StyledText
                className='text-xs text-gray-400'
                style={styles.textInter}
              >
                Running Orders
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              className='w-[45%] p-6 bg-white rounded-3xl items-start'
              style={[styles.shadowProp]}
              onPress={() => navigation.navigate('OrderRequests')}
            >
              <StyledText
                className='text-2xl font-bold'
                style={[styles.textInter, { fontSize: 22 }]}
              >
                {numOrderRequests}
              </StyledText>
              <StyledText
                className='text-xs text-gray-400'
                style={styles.textInter}
              >
                Order Requests
              </StyledText>
            </TouchableOpacity>
          </View>

          {/* Revenue */}
          <View
            className='mt-6 p-4 bg-white rounded-3xl mx-1'
            style={[styles.shadowProp]}
          >
            <View className='flex-row justify-between items-center'>
              <StyledText
                className='text-lg font-semibold'
                style={[styles.textInter, { fontSize: 13 }]}
              >
                Total Revenue
              </StyledText>
              <TouchableOpacity onPress={() => setShowChart(!showChart)}>
                <StyledText
                  className='text-sm font-bold'
                  style={[
                    styles.textInter,
                    { color: themeColors.button, fontSize: 12 },
                  ]}
                >
                  {showChart ? 'Hide Details' : 'See Details'}
                </StyledText>
              </TouchableOpacity>
            </View>
            <StyledText
              className='text-2xl font-bold'
              style={[styles.textInter, { fontSize: 22 }]}
            >
              ${totalRevenue}
            </StyledText>
            {/* Daily/Weekly/Monthly Picker and next/prev week options */}
            {showChart && (
              <View>
                <View className='flex-row justify-center items-center mt-4'>
                  <ApplicationProvider {...eva} theme={eva.light}>
                    <Layout
                      className='flex-1 justify-center items-center p-4'
                      level='1'
                    >
                      <Select
                        selectedIndex={selectedIndex}
                        onSelect={(index) => setSelectedIndex(index)}
                        value={graphSelectOptions[selectedIndex.row]}
                        style={{
                          width: 0.4 * width,
                        }}
                      >
                        <SelectItem title='Daily' />
                        <SelectItem title='Weekly' />
                        <SelectItem title='Monthly' />
                      </Select>
                    </Layout>
                  </ApplicationProvider>
                </View>
                {/* Revenue Graph */}
                <View className='mt-4' style={styles.chartContainer}>
                  <Text
                    className='text-xs font-regular mb-4'
                    style={[styles.textInter]}
                  >
                    {getCurrentDisplayDate(selectedIndex.row)}
                  </Text>
                  <CustomLineChart
                    data={graphData}
                    labels={graphLabels}
                    width={width * 0.8}
                  />
                </View>
              </View>
            )}
          </View>

          {/* Reviews */}
          <View
            className='mt-6 p-4 bg-white rounded-3xl mx-1'
            style={[styles.shadowProp]}
          >
            <View className='flex-row justify-between items-center'>
              <StyledText
                className='text-lg font-semibold'
                style={[styles.textInter, { fontSize: 13 }]}
              >
                Reviews
              </StyledText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Account', { screen: 'ChefReviews' });
                }}
              >
                <StyledText
                  className='text-sm font-bold'
                  style={[
                    styles.textInter,
                    { color: themeColors.button, fontSize: 12 },
                  ]}
                >
                  See All Reviews
                </StyledText>
              </TouchableOpacity>
            </View>
            <View className='flex-row items-center mt-2'>
              <Icon.Star stroke='transparent' fill={themeColors.button} />
              <StyledText
                className='text-lg font-bold ml-2'
                style={[styles.textInter, { color: themeColors.button }]}
              >
                0.0
              </StyledText>
              <StyledText
                className='text-sm font-semibold ml-2'
                style={[styles.textInter]}
              >
                Total 0 Reviews
              </StyledText>
            </View>
          </View>

          {/* Popular Items */}
          <View
            className='my-6 p-4 bg-white rounded-3xl mx-1'
            style={[styles.shadowProp]}
          >
            <View className='flex-row justify-between items-center'>
              <StyledText
                className='text-lg font-semibold'
                style={[styles.textInter, { fontSize: 13 }]}
              >
                Popular Items Recently
              </StyledText>
              <TouchableOpacity>
                <StyledText
                  className='text-sm font-bold'
                  style={[
                    styles.textInter,
                    { color: themeColors.button, fontSize: 12 },
                  ]}
                >
                  See All
                </StyledText>
              </TouchableOpacity>
            </View>
            <View className='flex-row mt-2'>
              <Image
                source={require('../../../assets/images/Sushi.png')}
                className='w-[45%] h-36 rounded-3xl'
              />
              <Image
                source={require('../../../assets/images/Sushi.png')}
                className='w-[45%] h-36 rounded-3xl ml-2'
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: -5,
  },
  textInter: {
    fontFamily: 'Inter',
    color: themeColors.grayDisplayText,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5, // for Android shadow
  },
  chartContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChefDashboardScreen;
