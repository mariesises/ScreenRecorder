const $button = document.querySelector('button')


//EventListener for record all when you click the button
//For the momment just the video, I will add an audio with the video
$button.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } }
    })

    //Type of files to be save
    const mediaRecorder = new MediaRecorder(media, {
        mimeType: 'video/webm;codes=vp8,opus'
    })
    mediaRecorder.start();

    const [video] = media.getVideoTracks()
    video.addEventListener("ended", () => {
        mediaRecorder.stop();
    })

    //Once we have the data how we save it 
    mediaRecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a")
        link.href = URL.createObjectURL(e.data)
        link.download = "captura.webm"
        link.click()
    })
})