import PropTypes from 'prop-types'

const EmojiPropTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  fallback: PropTypes.func,
  emojiImageFn: PropTypes.func,
  native: PropTypes.bool,
  forceSize: PropTypes.bool,
  tooltip: PropTypes.bool,
  skin: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  set: PropTypes.oneOf([
    'apple',
    'google',
    'twitter',
    'emojione',
    'messenger',
    'facebook',
  ]),
  size: PropTypes.number.isRequired,
  emoji: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  useLocalImages: PropTypes.bool,
  margin: PropTypes.number,
  noMargin: PropTypes.bool,
}

const EmojiDefaultProps = {
  skin: 1,
  set: 'apple',
  native: false,
  forceSize: false,
  tooltip: false,
  emojiImageFn: (set, image, useLocalImages) => {
    if (useLocalImages) {
      return image
    }

    return {
      uri: `https://unpkg.com/emoji-datasource-${set}@${EMOJI_DATASOURCE_VERSION}/img/${set}/64/${image}`,
    }
  },
  onPress: () => {},
  onLongPress: () => {},
  useLocalImages: false,
  margin: 15,
  noMargin: false,
}

const PickerPropTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  onSelect: PropTypes.func,
  onSkinChange: PropTypes.func,
  perLine: PropTypes.number,
  emojiSize: PropTypes.number,
  anchorSize: PropTypes.number,
  i18n: PropTypes.object,
  style: PropTypes.object,
  title: PropTypes.string,
  emoji: PropTypes.string,
  color: PropTypes.string,
  set: EmojiPropTypes.set,
  skin: EmojiPropTypes.skin,
  native: PropTypes.bool,
  emojiImageFn: EmojiPropTypes.emojiImageFn,
  emojisToShowFilter: PropTypes.func,
  useLocalImages: EmojiPropTypes.useLocalImages,
  showPreview: PropTypes.bool,
  showSkinTones: PropTypes.bool,
  emojiTooltip: EmojiPropTypes.tooltip,
  include: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.arrayOf(PropTypes.string),
  recent: PropTypes.arrayOf(PropTypes.string),
  autoFocus: PropTypes.bool,
  modal: PropTypes.bool,
  custom: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      short_names: PropTypes.arrayOf(PropTypes.string).isRequired,
      emoticons: PropTypes.arrayOf(PropTypes.string),
      keywords: PropTypes.arrayOf(PropTypes.string),
      imageUrl: PropTypes.string.isRequired,
    }),
  ),
  categoryEmojis: PropTypes.shape({
    recent: PropTypes.string.isRequired,
    custom: PropTypes.string.isRequired,
    people: PropTypes.string.isRequired,
    nature: PropTypes.string.isRequired,
    foods: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    places: PropTypes.string.isRequired,
    objects: PropTypes.string.isRequired,
    symbols: PropTypes.string.isRequired,
    flags: PropTypes.string.isRequired,
  }),
}

const PickerDefaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  onSelect: () => {},
  onSkinChange: null,
  emojiSize: 30,
  anchorSize: 24,
  perLine: 7,
  i18n: {},
  style: {},
  title: 'Emoji Mart™ Native',
  emoji: 'department_store',
  color: '#ae65c5',
  set: EmojiDefaultProps.set,
  skin: EmojiDefaultProps.skin,
  defaultSkin: EmojiDefaultProps.skin,
  native: EmojiDefaultProps.native,
  emojiImageFn: EmojiDefaultProps.emojiImageFn,
  emojisToShowFilter: null,
  useLocalImages: EmojiDefaultProps.useLocalImages,
  showPreview: false,
  showSkinTones: false, // After porting <Skins /> component return value to true
  emojiTooltip: EmojiDefaultProps.tooltip,
  autoFocus: false,
  modal: false,
  custom: [],
  categoryEmojis: {
    recent: 'clock3',
    custom: 'triangular_ruler',
    people: 'smiley',
    nature: 'dog',
    foods: 'taco',
    activity: 'soccer',
    places: 'rocket',
    objects: 'bulb',
    symbols: 'symbols',
    flags: 'flag-wales',
  },
}

export {
  EmojiPropTypes,
  EmojiDefaultProps,
  PickerPropTypes,
  PickerDefaultProps,
}