<template>
    <div>
        <div class="video-foreground">
            <iframe
                width="560"
                height="315"
                src="https://youtu.be/DJ7mrSVjFos"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>

        <span style="background-color:yellow;" class="scale-up-center text-black text-3xl"
            >Willkommen bei Nachhilfekleinanzeigen.</span
        >
        <br />
        <br />
        <span style="background-color:yellow;" class="descriptiontext text-black text-xl fade-in"
            >Auf dieser Webseite zeigen wir euch was Nachhilfekleinanzeigen ausmacht <br />
            und erklären euch wie Nachhilfekleinanzeigen funktioniert.</span
        >
        <div class="iframe-container flex justify-center p-16 xs:p-12">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DJ7mrSVjFos"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <div class="video-background">
            <div class="video-foreground">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/cEvXWCGyFXw?controls=0&autoplay=1&loop=1&muted=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    id="bgvideo"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<style>
.video-background {
    background: #000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -99;
}
.video-foreground,
.video-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
#vidtop-content {
    top: 0;
}

@media (min-aspect-ratio: 16/9) {
    .video-foreground {
        height: 300%;
        top: -100%;
    }
}
@media (max-aspect-ratio: 16/9) {
    .video-foreground {
        width: 300%;
        left: -100%;
    }
}

.scale-up-center {
    animation: scale-up-center 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes scale-up-center {
    0% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}

.fade-in {
    animation: fade-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 5s both;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.descriptiontext {
    margin-top: 2%;
    margin-bottom: 2%;
}
</style>
