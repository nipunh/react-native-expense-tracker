import React, {useRef} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {VictoryPie} from 'victory-native';
import Svg from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import Loading from './Loading';
import Profile from './Profile';
import AddExpense from './AddExpense';
import {deleteExpense} from '../redux/expense/action'

export default function Home({navigation}) {
  const categoryListHeightAnimationValue = useRef(new Animated.Value(125))
    .current;

  let dataSource = [];

  const dispatch = useDispatch();

  const {uid} = useSelector((state) => state.Auth);

  const {displayName, loading} = useSelector((state) => state.Auth);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const {expenses} = useSelector((state) => state.Expenses);

  console.log(expenses);

  Object.keys(expenses).map((expense, index) => {
    if (expenses[expense].name === 'Food & Nutrition') {
      return dataSource.push({
        expenses: expenses[expense].expenses,
        icon: icons.food,
        color: COLORS.lightBlue,
        id: expenses[expense].id,
        name: expenses[expense].name,
      });
    } else if (expenses[expense].name === 'Education') {
      return dataSource.push({
        id: expenses[expense].id,
        name: expenses[expense].name,
        expenses: expenses[expense].expenses,
        icon: icons.education,
        color: COLORS.yellow,
      });
    } else if (expenses[expense].name === 'Beauty & Care') {
      return dataSource.push({
        id: expenses[expense].id,
        name: expenses[expense].name,
        expenses: expenses[expense].expenses,
        icon: icons.healthcare,
        color: COLORS.peach,
      });
    } else if (expenses[expense].name === 'Clothing & Accessories') {
      return dataSource.push({
        id: expenses[expense].id,
        name: expenses[expense].name,
        expenses: expenses[expense].expenses,
        icon: icons.cloth_icon,
        color: COLORS.red,
      });
    } else if (expenses[expense].name === 'Electronics') {
      return dataSource.push({
        id: expenses[expense].id,
        name: expenses[expense].name,
        expenses: expenses[expense].expenses,
        icon: icons.baby_car,
        color: COLORS.darkgreen,
      });
    } else if (expenses[expense].name === 'Sports & Fitness') {
      return dataSource.push({
        id: expenses[expense].id,
        name: expenses[expense].name,
        expenses: expenses[expense].expenses,
        icon: icons.sports_icon,
        color: COLORS.purple,
      });
    } else {
    }
  });

  let categories = [...dataSource];

  const [viewMode, setViewMode] = useState('chart');

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showMoreToggle, setShowMoreToggle] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  function renderNavBar() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconContainerLeft} onPress={() => {}}>
          <Image source={icons.back_arrow} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainerRight}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image source={icons.avatar} style={styles.icons} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: COLORS.primary, ...FONTS.h2}}>
              My Expenses
            </Text>
            <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
              {/* Summary (private) */}
              {displayName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setAddModalVisible(true);
            }}>
            <Image source={icons.add_arrow} style={styles.addIcon} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.lightGray,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.calendar_icon} style={styles.calendarIcon} />
          </View>
          <View style={{marginLeft: SIZES.padding}}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>
              11 Nov, 2020
            </Text>
            <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
              10% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h3}}>CATEGORIES</Text>
          <Text style={{color: COLORS.primary, ...FONTS.body4}}>
            {categories.length} Total
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'chart' ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => {
              setViewMode('chart');
            }}>
            <Image
              source={icons.chart_icon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'chart' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              backgroundColor: viewMode == 'list' ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => {
              setViewMode('list');
            }}>
            <Image
              source={icons.menu}
              style={styles.categoryIcons}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == 'list' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryList(params) {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
          onPress={() => setSelectedCategory(item)}>
          <Image
            source={item.icon}
            style={{
              width: 20,
              height: 20,
              tintColor: item.color,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.primary,
              ...FONTS.h4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding - 10,
          backgroundColor: COLORS.white,
        }}>
        <Animated.View
          style={{
            height: categoryListHeightAnimationValue,
          }}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 300,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }
            setShowMoreToggle(!showMoreToggle);
          }}>
          <Text style={{...FONTS.body4}}>
            {showMoreToggle ? 'LESS' : 'MORE'}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{
              marginLeft: 5,
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderIncomingExpenseTitle(params) {
    return (
      <View style={{padding: SIZES.padding, backgroundColor: COLORS.white}}>
        <Text style={{...FONTS.h3, color: COLORS.primary}}>
          INCOMING EXPENSES
        </Text>
        <Text style={{...FONTS.body4, color: COLORS.darkgray}}>12 Total</Text>
      </View>
    );
  }

  function renderIcomingExpenses() {
    let incomingExpenes = selectedCategory
      ? selectedCategory.expenses !== undefined
        ? selectedCategory.expenses
        : []
      : [];

    console.log(incomingExpenes);

    // allExpenses.filter(
    //   (a) => a.status == 'pendingStatus',
    // );

    const renderItem = ({item, index}) => (
      <View
        style={{
          width: 300,
          marginRight: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: SIZES.padding,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 15,
                backgroundColor: COLORS.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}>
              <Image
                source={selectedCategory.icon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: selectedCategory.color,
                }}
              />
            </View>
            <Text style={{...FONTS.h3, color: selectedCategory.color}}>
              {selectedCategory.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => dispatch(deleteExpense(uid, selectedCategory.name, item))}
              >
              <Image
                source={icons.delete_icon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.secondary,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expenses Description */}
        <View style={{paddingHorizontal: SIZES.padding}}>
          <Text style={{...FONTS.h2}}>{item.title}</Text>
          <Text
            style={{...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray}}>
            {item.description}
          </Text>

          {/* Date */}
          <Text style={{...FONTS.h4, marginTop: SIZES.padding}}>DATE</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
                marginRight: 5,
              }}
              source={icons.calendar_icon}
            />
            <Text
              style={{
                marginBottom: SIZES.base,
                color: COLORS.darkgray,
                ...FONTS.body4,
              }}>
              {(item.date).toDate().toString().split('GMT')[0]}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomStartRadius: SIZES.radius,
            borderBottomEndRadius: SIZES.radius,
            backgroundColor: selectedCategory.color,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}>
            CONFIRM {item.total.toFixed(2)} USD
          </Text>
        </View>
      </View>
    );

    return (
      <View
        style={{backgroundColor: COLORS.white, paddingVertical: SIZES.base}}>
        {renderIncomingExpenseTitle()}

        {incomingExpenes.length > 0 && (
          <FlatList
            data={incomingExpenes}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        {incomingExpenes.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>No Record</Text>
          </View>
        )}
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    //Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.map((a) => a);
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    //FIlter out categories with no data/expenses
    let filterChartData = chartData.filter((a) => a.y > 0);

    //Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartData;
  }

  function setSelectedCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0,
    );
    let colorScales = chartData.map((item) => item.color);

    const ChartClick = Platform.select({
      ios: TouchableOpacity,
      android: Svg,
    });

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ChartClick style={{width: SIZES.width - 10, height: SIZES.width - 80}}>
          <VictoryPie
            data={chartData}
            colorScale={colorScales}
            labels={(datum) => `${datum.y}`}
            radius={({datum}) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.35
                : SIZES.width * 0.35 - 10
            }
            innerRadius={60}
            labelRadius={({innerRadius}) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: {fill: 'white', ...FONTS.body3},
              parent: {
                ...styles.shadow,
              },
            }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectedCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                  onPressOut: () => {},
                },
              },
            ]}
          />
        </ChartClick>
        <View style={{position: 'absolute', top: '52%', left: '42%'}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>
            {totalExpenseCount}
          </Text>
          <Text style={{...FONTS.body3}}>EXPENSES</Text>
        </View>
      </View>
    );
  }

  function renderExpenseSummary(params) {
    let data = processCategoryDataToDisplay();

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            backgroundColor:
              selectedCategory && selectedCategory.name == item.name
                ? item.color
                : COLORS.white,
          }}
          onPress={() => {
            let categoryName = item.name;
            setSelectedCategoryByName(categoryName);
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory && selectedCategory.name == item.name
                    ? COLORS.white
                    : item.color,
                borderRadius: 5,
              }}></View>
            <View>
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color:
                    selectedCategory && selectedCategory.name == item.name
                      ? COLORS.white
                      : COLORS.primary,
                  ...FONTS.h3,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
          {/* Expenses */}
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: COLORS.white,
                color:
                  selectedCategory && selectedCategory.name == item.name
                    ? COLORS.white
                    : COLORS.primary,
                ...FONTS.h3,
              }}>
              {item.y} USD - {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles}>
      {loading ? <Loading /> : <></>}

      {/* Nav Bar */}
      {renderNavBar()}

      {/* Header  */}
      {renderHeader()}

      {/* Category Header Section */}
      {renderCategoryHeaderSection()}

      <View>
        {viewMode == 'list' && (
          <View style={{backgroundColor: COLORS.white, minHeight: 600}}>
            {renderCategoryList()}
            {renderIcomingExpenses()}
          </View>
        )}
        {viewMode == 'chart' && (
          <View style={{backgroundColor: COLORS.white, minHeight: 650}}>
            {renderChart()}
            {renderExpenseSummary()}
          </View>
        )}
      </View>
      <Profile setModalVisible={setModalVisible} modalVisible={modalVisible} />

      <AddExpense
        setAddModalVisible={setAddModalVisible}
        addModalVisible={addModalVisible}
        uid = {uid}
      />
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
  iconContainerLeft: {
    justifyContent: 'center',
    width: 50,
  },
  iconContainerRight: {
    justifyContent: 'center',
    width: 50,
    alignItems: 'flex-end',
  },

  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.lightBlue,
  },

  addIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.lightBlue,
    marginTop: SIZES.h4,
  },

  header: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  navBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    padding: 10,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
