// https://www.npmjs.com/package/@nuxtjs/device
//
// Example usage in Vue components:
//
// this.$device.isMobile
// this.$device.isMobileOrTablet
// this.$device.isIos

export default function ({ $device }) {
  // Adding more devices / browsers
  $device.isIE = /MSIE|Trident/.test($device.userAgent);
  $device.isOperaMini = /Opera Mini/.test($device.userAgent);
}
