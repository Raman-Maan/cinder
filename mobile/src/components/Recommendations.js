import React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { Container, View, DeckSwiper, Card, CardItem, H3, Text, Left, Body, Icon, Button } from 'native-base';

import cinder from '../theme/variables/cinder';

const cards = [
  {
    text: 'Card Uno',
    name: 'Mac Miller',
    age: 21,
    image: 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
  }, {
    text: 'Card Two',
    name: 'Kendrick Lamar',
    age: 21,
    image: 'http://cache.umusic.com/_sites/kendricklamar.com/images/og.jpg',
  }, {
    text: 'Card Three',
    name: 'SZA',
    age: 21,
    image: 'https://media.pitchfork.com/photos/59298fe813d1975652136c25/1:1/w_300/05bc322d.jpg',
  },
];

const styles = StyleSheet.create({
  container__view: {
    flex: 1,
  },
  recommends__card: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  recommends_details: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    top: 459,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: cinder.cardBorderRadius,
    borderBottomRightRadius: cinder.cardBorderRadius,
  },
  recommends__details_text: {
    color: '#fff',
  },
  recommends__about: {
    maxHeight: 400,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  recommends__image: {
    height: 500,
    flex: 1,
    borderRadius: cinder.cardBorderRadius,
  },
  buttons__container: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);

    this.setSwiper = this.setSwiper.bind(this);
    this.setScrollView = this.setScrollView.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderRecommendation = this.renderRecommendation.bind(this);
    this.renderButtons = this.renderButtons.bind(this);

    this.swiper = null;
    this.scrollView = null;

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  setScrollView(ref) {
    this.scrollView = ref;
  }

  setSwiper(ref) {
    this.swiper = ref;
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      }),
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
      }),
    ]).start(() => this.animate());
  }


  renderEmpty() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Text>No recommendations left! :(</Text>
      </View>
    );
  }

  renderRecommendation(item) {
    const bounce = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3],
    });

    const scale = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1],
    });

    return (
      <Card style={styles.recommends__card}>
        <ScrollView ref={this.setScrollView} style={{ flex: 1, maxHeight: 500, flexGrow: 0 }}>
          <Image style={styles.recommends__image} source={{ uri: item.image }} />
          <View style={styles.recommends_details}>
            <View style={{ flexDirection: 'row' }}>
              <Text bold style={styles.recommends__details_text}>{item.name}</Text>
              <Text style={styles.recommends__details_text}>{`, ${item.age}`}</Text>
            </View>
            <Animated.View style={{ transform: [{ translateY: bounce }, { scale }] }}>
              <TouchableOpacity onPress={() => this.scrollView.scrollToEnd()}>
                <Icon name="ios-arrow-down" style={{ color: 'white', padding: 0, fontSize: 24 }} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <CardItem details style={styles.recommends__about}>
            <H3>{`About ${item.name.split(' ')[0]}`}</H3>
            <Text left>{item.name}</Text>
          </CardItem>
        </ScrollView>
      </Card>
    );
  }

  renderButtons() {
    return (
      <View style={styles.buttons__container}>
        <Button danger rounded bordered iconLeft onPress={() => this.swiper._root.swipeLeft()}>
          <Icon name="close" />
          <Text>Pass</Text>
        </Button>
        <Button primary rounded iconRight onPress={() => this.swiper._root.swipeRight()}>
          <Text>Like</Text>
          <Icon name="heart" />
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <View style={styles.container__view}>
          <DeckSwiper
            ref={this.setSwiper}
            looping // TODO - set to false, only for testing
            dataSource={cards}
            renderEmpty={this.renderEmpty}
            renderItem={this.renderRecommendation}
          />
        </View>
        {this.renderButtons()}
      </Container>
    );
  }
}
