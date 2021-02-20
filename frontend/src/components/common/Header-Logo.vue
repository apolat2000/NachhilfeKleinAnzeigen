<template>
    <img src="../../assets/logo.png" class="w-96 mx-auto bounce-in-from-front-to-back" />
</template>

<style>
.bounce-in-from-front-to-back {
    -webkit-animation: bounce-in-from-front-to-back 1.1s linear 0.5s both;
    animation: bounce-in-from-front-to-back 1.1s linear 0.5s both;
}

@-webkit-keyframes bounce-in-from-front-to-back {
    0% {
        -webkit-transform: scale(7);
        transform: scale(7);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: scale(1.24);
        transform: scale(1.24);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    89% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: scale(1.04);
        transform: scale(1.04);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}
@keyframes bounce-in-from-front-to-back {
    0% {
        -webkit-transform: scale(7);
        transform: scale(7);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    72% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    81% {
        -webkit-transform: scale(1.24);
        transform: scale(1.24);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    89% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
    95% {
        -webkit-transform: scale(1.04);
        transform: scale(1.04);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
    }
}
</style>
