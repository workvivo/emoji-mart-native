import React from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableNativeFeedback,
  Image,
} from 'react-native'
import {Icon, Row} from 'wv-framework'
import NimbleEmojiIndex from '../utils/emoji-index/nimble-emoji-index'

import Skins from './skins'
import SkinsEmoji from './skins-emoji'
import Touchable from './common/touchable'

const arrowBackIconLight = require('../assets/arrow-back.png')
const arrowBackIconDark = require('../assets/arrow-back-dark.png')
const clearIconLight = require('../assets/clear-icon.png')
const clearIconDark = require('../assets/clear-icon-dark.png')

const styles = StyleSheet.create({
  searchContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    minHeight: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchContainerLight: {
    backgroundColor: '#fff',
    borderBottomColor: '#e0e0e0',
  },
  searchContainerDark: {
    backgroundColor: '#13100e',
    borderBottomColor: '#1f1f1f',
  },
  searchInput: {
    flex: 1,
  },
  searchInputLight: {
    color: '#414141',
  },
  searchInputDark: {
    color: '#bebebe',
  },
  closeButton: {
    borderRadius: 500,
    margin: 10,
    padding: 2,
  },
  closeButtonIcon: {
    marginTop: 2,
    marginLeft: 2,
    height: 24,
    width: 24,
  },
})

export default class Search extends React.PureComponent {
  static propTypes /* remove-proptypes */ = {
    onSearch: PropTypes.func,
    onPressClose: PropTypes.func,
    maxResults: PropTypes.number,
    emojisToShowFilter: PropTypes.func,
    autoFocus: PropTypes.bool,
    showSkinTones: PropTypes.bool,
    skinsProps: PropTypes.object.isRequired,
    emojiProps: PropTypes.object.isRequired,
    theme: PropTypes.oneOf(['light', 'dark']),
    fontSize: PropTypes.number,
  }

  static defaultProps = {
    onSearch: () => {},
    onPressClose: () => {},
    maxResults: 75,
    emojisToShowFilter: null,
    autoFocus: false,
    showSkinTones: true,
    theme: 'light',
    fontSize: 15,
  }

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }

    this.data = props.data
    this.emojiIndex = new NimbleEmojiIndex(this.data)
    this.setRef = this.setRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.pressCancel = this.pressCancel.bind(this)
  }

  handleChange(value) {
    this.setState({
      searchTerm: value,
    })

    this.props.onSearch(
      this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom,
      }),
    )
  }

  pressCancel() {
    this.props.onSearch(null)
    this.clear()
  }

  setRef(c) {
    this.input = c
  }

  clear() {
    this.setState({
      searchTerm: '',
    })
  }

  render() {
    const {
      i18n,
      autoFocus,
      onPressClose,
      skinsProps,
      showSkinTones,
      showCloseButton,
      emojiProps,
      theme,
      fontSize,
    } = this.props
    const iconSize = Math.round(fontSize * 1.6)
    const {searchTerm} = this.state

    let background

    if (Platform.OS === 'android') {
      if (Platform.Version >= 21) {
        background = TouchableNativeFeedback.SelectableBackgroundBorderless()
      } else {
        background = TouchableNativeFeedback.SelectableBackground()
      }
    }

    const searchContainerWithCloseButtonStyle = {
      paddingLeft: 5,
    }

    return (
      <Row
        backgroundColor="contrast"
        alignItems="center"
        height={50}
        paddingHorizontal="xl"
        style={
          (styles.searchContainer,
          theme === 'light'
            ? styles.searchContainerLight
            : styles.searchContainerDark,
          showCloseButton ? searchContainerWithCloseButtonStyle : null)
        }
      >
        <Icon name="search" size="s" paddingRight="m" />
        {showCloseButton ? (
          <Touchable
            onPress={onPressClose}
            background={Platform.OS === 'android' ? background : null}
            style={[styles.closeButton]}
          >
            <Image
              style={[
                styles.closeButtonIcon,
                {width: iconSize, height: iconSize},
              ]}
              source={
                theme === 'light' ? arrowBackIconLight : arrowBackIconDark
              }
            />
          </Touchable>
        ) : null}
        <TextInput
          style={[
            styles.searchInput,
            theme === 'light'
              ? styles.searchInputLight
              : styles.searchInputDark,
            {fontSize},
          ]}
          placeholderTextColor={theme === 'light' ? '#878787' : '#787878'}
          ref={this.setRef}
          value={searchTerm}
          onChangeText={this.handleChange}
          placeholder={i18n.search}
          autoFocus={autoFocus}
          underlineColorAndroid="transparent"
        />
        {searchTerm.length > 0 ? (
          <Touchable
            onPress={this.pressCancel}
            background={Platform.OS === 'android' ? background : null}
            style={[styles.closeButton]}
          >
            <Image
              style={[
                styles.closeButtonIcon,
                {width: iconSize, height: iconSize},
              ]}
              source={theme === 'light' ? clearIconLight : clearIconDark}
            />
          </Touchable>
        ) : null}
        {showSkinTones && (
          <View>
            {skinsProps.skinEmoji ? (
              <SkinsEmoji
                emojiProps={emojiProps}
                data={this.data}
                {...skinsProps}
              />
            ) : (
              <Skins theme={theme} iconSize={iconSize} {...skinsProps} />
            )}
          </View>
        )}
      </Row>
    )
  }
}
