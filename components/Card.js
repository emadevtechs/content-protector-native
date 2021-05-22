import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, View, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    console.log('item........',item.file_url)
    return (
      // if(item.file_type === 'image' || item.file_type === 'raw' || item.is_text)
      <Block row={horizontal} card flex style={item.is_text ? styles.hash_style : cardContainer}>
        {item.file_type === 'image' && <TouchableWithoutFeedback>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.file_url}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
          }
          {item.file_type === 'raw' && <TouchableWithoutFeedback>
          <Block flex style={styles.cardDescription}>
            <Text  size={14} style={styles.cardTitle}>{item.file_url}</Text>
          </Block>
        </TouchableWithoutFeedback>
          }
          {item.is_text && 
          <Block flex>
            <Text size={14} style={styles.cardTitle1}>{item.text}</Text>
          </Block>
          }
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  hash_style: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    marginRight: theme.SIZES.BASE
  },  
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 14,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    // paddingBottom: 6
  },
  cardTitle1: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 16
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  cardDescription1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);