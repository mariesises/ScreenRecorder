const $button = document.querySelector('button')

$button.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } }
    })

    const mediaRecorder = new MediaRecorder(media, {
        mimeType: 'video/webm;codes=vp8,opus'
    })
    mediaRecorder.start();

    const [video] = media.getVideoTracks()
    video.addEventListener("ended", () => {
        mediaRecorder.stop();
    })

    mediaRecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a")
        link.href = URL.createObjectURL(e.data)
        link.download = "captura.webm"
        link.click()
    })
})