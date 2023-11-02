import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView} from 'react-native'

import {deviceWidth} from 'wv-framework'
import NimbleEmoji from './emoji/nimble-emoji'

const styles = StyleSheet.create({
  anchors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth - 30,
    marginHorizontal: 15,
    marginVertical: 2,
    borderRadius: 10,
    paddingHorizontal: 2,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
  anchorsLight: {
    borderTopColor: '#f6f7f8',
    backgroundColor: '#F9FAFB',
  },
  anchorsDark: {
    borderTopColor: '#090807',
    backgroundColor: '#1b1816',
  },
  anchor: {
    alignItems: 'center',
    flex: 1,
    opacity: 1,
    paddingTop: 10,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  anchorBar: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
  },
  anchorBarSelected: {},
  anchorSelected: {
    opacity: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
})

export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)

    let defaultCategory = props.categories.filter(
      (category) => category.first,
    )[0]

    this.data = props.data
    this.state = {
      selected: defaultCategory.name,
    }
    this.setScrollViewRef = this.setScrollViewRef.bind(this)
  }

  componentDidMount() {
    this.anchorsOffset = {}
    this.anchorsWidth = {}
  }

  onSelectAnchor(selected) {
    this.setState({selected})
  }

  handlePress(index) {
    var {categories, onAnchorPress} = this.props
    this.onSelectAnchor(categories[index]?.name)
    setTimeout(() => {
      onAnchorPress(categories[index], index)
    }, 0)
  }

  setScrollViewRef(c) {
    this.scrollView = c
  }

  onAnchorsScrollViewLayout = (event) => {
    this.clientWidth = event.nativeEvent.layout.width
  }

  onAnchorLayout = (index, event) => {
    var {categories} = this.props
    const {x: left, width} = event.nativeEvent.layout

    const category = categories[index]

    this.anchorsOffset[category.name] = left
    this.anchorsWidth[category.name] = width
  }

  render() {
    var {categories, color, i18n, emojiProps, categoryEmojis, theme} =
        this.props,
      {selected} = this.state

    return (
      <ScrollView
        ref={this.setScrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onLayout={this.onAnchorsScrollViewLayout}
      >
        <View
          style={[
            styles.anchors,
            theme === 'light' ? styles.anchorsLight : styles.anchorsDark,
          ]}
          variant="shadow"
        >
          {categories.map((category, i) => {
            var {id, name, anchor} = category,
              isSelected = name == selected

            if (anchor === false) {
              return null
            }

            const categoryEmojiId = id.startsWith('custom-') ? 'custom' : id

            return (
              <View
                key={id}
                style={[
                  styles.anchor,
                  isSelected ? styles.anchorSelected : null,
                ]}
              >
                <NimbleEmoji
                  emoji={categoryEmojis[categoryEmojiId]}
                  data={this.data}
                  {...emojiProps}
                  onPress={this.handlePress.bind(this, i)}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

Anchors.propTypes /* remove-proptypes */ = {
  categories: PropTypes.array,
  onAnchorPress: PropTypes.func,
  emojiProps: PropTypes.object.isRequired,
  categoryEmojis: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
}

Anchors.defaultProps = {
  categories: [],
  onAnchorPress: () => {},
  theme: 'light',
}
