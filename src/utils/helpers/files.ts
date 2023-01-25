import { imageExtention, videoExtention } from "@utils/const/extentions";

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
                canvas.width = videoPlayer.videoWidth / 2;
                canvas.height = videoPlayer.videoHeight / 2;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject("Can`t get canvas context")
                    return;
                }

                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                resolve(ctx.canvas.toDataURL());
                canvas.remove()
                videoPlayer.remove()
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

export function filterFiles(data: File[], fileMatchRegex?: RegExp[]): File[] {
    const arr: File[] = [];
    console.log(data, fileMatchRegex);

    data.map(item => {
        if (fileMatchRegex && fileMatchRegex.length > 0) {
            for (let i = 0; i < fileMatchRegex.length; i++) {
                const regExp = fileMatchRegex[i];

                if (item.type.match(regExp)) {
                    return item
                }
            }

            return null
        } else {
            return item
        }
    })
        .forEach((item) => {
            if (item !== null) {
                arr.push(item)
            }
        })

    return arr
};