import { imageExtention, videoExtention } from "@const/extentions";

export async function getFilePreview(file: File): Promise<string | null> {
    if (file.type.match(videoExtention.regex)) {
        return await getVideoPreview(file)
    }

    if (file.type.match(imageExtention.regex)) {
        return await getImagePreview(file)
    }

    return null
}


function getVideoPreview(file: File, seekTo = 0.0) {
    return new Promise<string>((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', () => {
            reject("error when loading video file");
        });

        videoPlayer.addEventListener('loadedmetadata', () => {
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);

            videoPlayer.addEventListener('seeked', () => {
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject("Can`t get canvas context")
                    return;
                }

                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                resolve(ctx.canvas.toDataURL());
            });
        });
    });
}

function getImagePreview(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result.toString())
            } else {
                reject('reader.readAsDataURL Error')
            }
        };

        reader.onerror = () => {
            reject('reader.readAsDataURL Error')
        }

    })
}