# smart-app-banner

smart app download banner for ios(version &lt; 6) and android

## usage

```html
<meta name="apple-itunes-app" content="app-id=...">
<meta name="google-play-app" content="app-id=...">
<link rel="apple-touch-icon" href="apple-app-icon.png">
<link rel="android-touch-icon" href="android-app-icon.png">
<link rel="stylesheet" href="SmartAppBanner.css">
<script type="text/javascript" src="SmartAppBanner.js"></script>
<script type="text/javascript">
  new SmartAppBanner({
    displayAfterClose: 30,  // display after user click close button
    displayAfterView: 60,   // display after user click view button
    name:  {
      'zh-TW': '應用軟體',
      'zh-CN': '应用软件',
      'en-US': 'APP'
    },
    author: 'HEMiDEMi Inc.',
    price: {
      'zh-TW': '免費',
      'zh-CN': '免费',
      'en-US': 'Free'
    }
  })
</script>
```
