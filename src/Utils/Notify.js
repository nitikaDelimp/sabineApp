import Toast from 'react-native-simple-toast';

export function showWithGravity(msg, position = null) {
  let align = Toast.CENTER;
  if (position) {
    switch (position) {
      case 'top':
        align = Toast.TOP;
        break;
      case 'bottom':
        align = Toast.BOTTOM;
        break;
      default:
      case 'center':
        align = Toast.CENTER;
        break;
    }
  }
  Toast.showWithGravity(msg?.length > 0 ? msg : '', Toast.SHORT, align);
}

export function show(msg) {
  Toast.show(msg?.length > 0 ? msg : '', Toast.SHORT);
}
