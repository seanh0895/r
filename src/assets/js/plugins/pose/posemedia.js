const getUserMediaFn = MediaDevices.prototype.getUserMedia;

MediaDevices.prototype.getUserMedia = async function () {
    if (arguments[0].video.deviceId == undefined || arguments[0].video.deviceId.ideal !== "avatar-video") {
        return await getUserMediaFn.call(navigator.mediaDevices, ...arguments);
    }

    var vs = document.getElementById('local');
    vs.poster = "https://media.giphy.com/media/wqzktGaaBDEF9TpCyK/giphy.gif"

    arguments[0].video.width = { max: 480 };
    const stream = await getUserMediaFn.call(navigator.mediaDevices, ...arguments);
    let camera = await import('./camera.js');
    await camera.bindPage(stream);

    const canvas = document.getElementById("illustration-canvas");
    var newStream = new MediaStream();
    newStream.addTrack(stream.getAudioTracks()[0]);
    newStream.addTrack(canvas.captureStream(24).getVideoTracks()[0]);

    return newStream;
}

