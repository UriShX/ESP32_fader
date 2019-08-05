# Custom Range Slider W/BLE Write & Notify
## Scope
This web app uses [web-ble](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) to control a esp32 device over ble, while subscribing to its' updates, and includes 'autoranging'.
App is designed to work with esp32 ble controlled apps, see [breathing LED gist](https://gist.github.com/UriShX/2b1f1c7b461b466a4b4ae336d52653dd) and [Hobby servo gist](https://gist.github.com/UriShX/81266ab108876c4ef4252cc9fd3e1432).
App is deployed at https://urishx.github.io/ESP32_fader/.

## TODO
* There's currently no documentation and little to no code remarks in the web app.
    * However, The Arduino sketches in the attached Gists are commented pretty well.
* There are probably better ways to implement this web-ble web app. It was just a quick test for myself, and as such was not taken too seriously.
* On the UI side, I should probably define several portrait orientation widths, and move the slider accordingly. Right now it is not positioned correctly on all devices.
* On the UX side, I should probably ditch the slider alltogether, and replace it with something that will not cause accidental refreshes.
* I started making this app a PWA, but never quite figured it out completley. It can and should be done.