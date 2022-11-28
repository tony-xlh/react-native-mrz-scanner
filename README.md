# react-native-mrz-scanner

React Native MRZ Scanner using Vision Camera and the [Dynamsoft Label Recognizer plugin](https://github.com/xulihang/vision-camera-dynamsoft-label-recognizer).


<video src="https://user-images.githubusercontent.com/5462205/204177715-b5644345-43b5-418a-afbc-a8277ef082c3.mp4" data-canonical-src="https://user-images.githubusercontent.com/5462205/204177715-b5644345-43b5-418a-afbc-a8277ef082c3.mp4" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px;">

  </video>

## How to run

1. `npm install`
2. cd `ios` and run `pod install`
3. `npx react-native run-android` or `run-ios`


## Dark mode

If your phone has dark mode on, it may fail to display some text correctly.

## Android Resolution Bug of React Native Vision Camera

The current version of React Native Vision Camera (2.14.0) has a bug of correctly setting the camera preview resolution. See [the pull request](https://github.com/mrousavy/react-native-vision-camera/pull/833) for details.

You can update `CameraPreview.kt` as the following.

Before:

```kotlin
// User has selected a custom format={}. Use that
val format = DeviceFormat(format!!)
Log.i(TAG, "Using custom format - photo: ${format.photoSize}, video: ${format.videoSize} @ $fps FPS")
if (video == true) {
  previewBuilder.setTargetResolution(format.videoSize)
} else {
  previewBuilder.setTargetResolution(format.photoSize)
}
imageCaptureBuilder.setTargetResolution(format.photoSize)
imageAnalysisBuilder.setTargetResolution(format.photoSize)
```

After:

```kotlin
// User has selected a custom format={}. Use that
val format = DeviceFormat(format!!)
Log.i(TAG, "Using custom format - photo: ${format.photoSize}, video: ${format.videoSize} @ $fps FPS")
val videoSize: Size
if (context.resources.configuration.orientation == Configuration.ORIENTATION_PORTRAIT) {
  videoSize = Size(format.videoSize.height, format.videoSize.width)
}else {
  videoSize = format.videoSize
}

previewBuilder.setTargetResolution(videoSize)
imageCaptureBuilder.setTargetResolution(format.photoSize)
imageAnalysisBuilder.setTargetResolution(videoSize)
```
