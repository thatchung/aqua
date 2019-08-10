<template>
    <div class="container">
        <div class="notification" :data-count="notificationCount"
            :class="{
                'show-count': notificationCount > 0
            }">
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name: 'NotificationBell',
    props: ['notificationCount'],
    data () {
        return {

        }
    },
    watch: {
        notificationCount (newVal, oldVal) {
            if (newVal <= oldVal)
                return;

            let el = $(this.$el).find('.notification');
            
            el.removeClass('notify');
            setTimeout(() => {
                el.addClass('notify');
            }, 10);
        }
    }
}
</script>

<style scoped>
.container {
    width: 70px;
}

.notification {
    display: inline-block;
    position: relative;
    padding: 0.6em;
    background: transparent;
    border-radius: 0.2em;
    font-size: 1.3em;
}

/* .notification:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
} */

.notification::before, 
.notification::after {
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.notification::before {
    display: block;
    content: "\f0f3";
    font-family: "FontAwesome";
    transform-origin: top center;
}

.notification::after {
    font-family: Arial;
    font-size: 0.7em;
    font-weight: 700;
    position: absolute;
    top: 3px;
    right: -8px;
    padding: 3px 5px;
    line-height: 100%;
    border-radius: 60px;
    background: #fff;
    opacity: 0;
    content: attr(data-count);
    opacity: 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    transition: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    text-shadow: none;
    color: #dd4b39;
}

.notification.notify::before {
    -webkit-animation: ring 1.5s ease;
    animation: ring 1.5s ease;
}

.notification.show-count::after {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

@-webkit-keyframes ring {
    0% {
        -webkit-transform: rotate(35deg);
    }
    12.5% {
        -webkit-transform: rotate(-30deg);
    }
    25% {
        -webkit-transform: rotate(25deg);
    }
    37.5% {
        -webkit-transform: rotate(-20deg);
    }
    50% {
        -webkit-transform: rotate(15deg);
    }
    62.5% {
        -webkit-transform: rotate(-10deg);
    }
    75% {
        -webkit-transform: rotate(5deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
    }
}

@keyframes ring {
    0% {
        -webkit-transform: rotate(35deg);
        transform: rotate(35deg);
    }
    12.5% {
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
    }
    25% {
        -webkit-transform: rotate(25deg);
        transform: rotate(25deg);
    }
    37.5% {
        -webkit-transform: rotate(-20deg);
        transform: rotate(-20deg);
    }
    50% {
        -webkit-transform: rotate(15deg);
        transform: rotate(15deg);
    }
    62.5% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg);
    }
    75% {
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}
</style>
