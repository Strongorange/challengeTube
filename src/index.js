const recordBtn = document.querySelector("#record");
const audio = document.querySelector("#preview");

let stream;
let recorder;
let audioFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = audioFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  recordBtn.innerHTML = "Download Recording";
  recordBtn.removeEventListener("click", handleStop);
  recordBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleRecord = async () => {
  recordBtn.innerHTML = "Stop Recording";
  recordBtn.removeEventListener("click", handleRecord);
  recordBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    audioFile = URL.createObjectURL(event.data);
    console.log(audioFile);
    audio.srcObject = null;
    audio.src = audioFile;
    audio.loop = true;
    audio.play();
  };
  recorder.start();
  setTimeout(() => {
    handleStop();
  }, 5000);
};

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    audio.srcObject = stream;
  } catch (error) {
    alert("Error");
  }
};

init();

recordBtn.addEventListener("click", handleRecord);
