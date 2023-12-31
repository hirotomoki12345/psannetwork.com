let mediaRecorder;
const recordedBlobs = [];

const menuBarStyle = `
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    background-color: #333;
    color: white;
    z-index: 1000;
`;

const menuBar = document.createElement('div');
menuBar.style.cssText = menuBarStyle;
document.body.appendChild(menuBar);

const startButton = document.createElement('button');
startButton.textContent = 'Start Recording';
startButton.addEventListener('click', startRecording);
menuBar.appendChild(startButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop Recording';
stopButton.addEventListener('click', stopRecording);
menuBar.appendChild(stopButton);

async function startRecording() {
    recordedBlobs.length = 0;

    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const options = { mimeType: 'video/webm;codecs=vp9,opus' };
        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
            }
        };

        mediaRecorder.start();
        console.log('Recording started');
    } catch (err) {
        console.error('Error accessing screen', err);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        console.log('Recording stopped');
        mediaRecorder.onstop = () => {
            downloadRecording();
        };
    }
}

function downloadRecording() {
    const blob = new Blob(recordedBlobs, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
