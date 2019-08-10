<template>
    <div id="app">
        <v-dialog :click-to-close="false"></v-dialog>
        <modals-container></modals-container>

        <div class="backdrop" v-if="$store.state.loader">
            <div class="loader-wrapper">
                <div class="loader-inner loader-one"></div>
                <div class="loader-inner loader-two"></div>
                <div class="loader-inner loader-three"></div>
            </div>
        </div>

        <router-view v-if="$store.state.view"></router-view>

        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    export default {
        name: 'App',

        mounted: async function () {
            await this.$store.dispatch('loadSession');

            this.$store.commit('toggleLoader', false);
            this.$store.commit('toggleView', true);
        }
    }
</script>

<style lang="scss">
    body {
        background: #edf1f6;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .modal-dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: 0;
        transform: translate(-50%, -50%) !important;
    }

    .box-header {
        &[data-widget=collapse] {
            cursor: pointer;
        }
    }

    .form-control {
        height: 40px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .el-input, .el-select {
        display: block;

        &.el-date-editor {
            width: auto;
        }

        .el-tag {
            float: left;
            display: inline-block;
            position: relative;
            max-width: 200px;
            padding-right: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            & > .el-icon-close {
                position: absolute;
                right: 2px;
                top: 5px;
            }
        }
    }

    .el-table {
        .cell {
            word-break: normal;
        }
    }

    .el-pagination {
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 10px;
    }

    .el-switch.switch-block {
        display: block;
        height: 40px;
        padding: 9px 0;
    }

    .el-form-item {
        > label {
            line-height: 20px;
            padding-bottom: 0 !important;
        }

        .el-form-item__content {
            line-height: inherit;
        }
    }

    .el-date-editor {
        .el-input__inner {
            padding-right: 10px;
        }
    }

    .el-color-picker {
        display: block;

        .el-color-picker__trigger {
            width: 100%;
        }
    }
</style>

<style lang="scss" scoped>
    $loader-size: 300px;

    .backdrop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background: rgba(#000, 0.5);
        z-index: 2000;
    }

    .loader-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: $loader-size;
        height: $loader-size;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        perspective: 4700px;

        .loader-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;

            &.loader-one {
                left: 0;
                top: 0;
                animation: loader-rotate-one 1.15s linear infinite;
                -o-animation: loader-rotate-one 1.15s linear infinite;
                -webkit-animation: loader-rotate-one 1.15s linear infinite;
                -moz-animation: loader-rotate-one 1.15s linear infinite;
                border-bottom: 18px solid rgb(255, 0, 0);
            }

            &.loader-two {
                right: 0;
                top: 0;
                animation: loader-rotate-two 1.15s linear infinite;
                -o-animation: loader-rotate-two 1.15s linear infinite;
                -webkit-animation: loader-rotate-two 1.15s linear infinite;
                -moz-animation: loader-rotate-two 1.15s linear infinite;
                border-right: 18px solid rgb(0, 255, 0);
            }

            &.loader-three {
                right: 0;
                bottom: 0;
                animation: loader-rotate-three 1.15s linear infinite;
                -o-animation: loader-rotate-three 1.15s linear infinite;
                -webkit-animation: loader-rotate-three 1.15s linear infinite;
                -moz-animation: loader-rotate-three 1.15s linear infinite;
                border-top: 18px solid rgb(0, 0, 255);
            }

            @keyframes loader-rotate-one {
                0% {
                    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
                }
                100% {
                    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
                }
            }

            @-o-keyframes loader-rotate-one {
                0% {
                    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
                }
                100% {
                    -o-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
                }
            }

            @-webkit-keyframes loader-rotate-one {
                0% {
                    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
                }
                100% {
                    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
                }
            }

            @-moz-keyframes loader-rotate-one {
                0% {
                    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
                }
                100% {
                    -moz-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
                }
            }

            @keyframes loader-rotate-two {
                0% {
                    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
                }
                100% {
                    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
                }
            }

            @-o-keyframes loader-rotate-two {
                0% {
                    -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
                }
                100% {
                    -o-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
                }
            }

            @-webkit-keyframes loader-rotate-two {
                0% {
                    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
                }
                100% {
                    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
                }
            }

            @-moz-keyframes loader-rotate-two {
                0% {
                    -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
                }
                100% {
                    -moz-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
                }
            }

            @keyframes loader-rotate-three {
                0% {
                    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
                }
                100% {
                    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
                }
            }

            @-o-keyframes loader-rotate-three {
                0% {
                    -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
                }
                100% {
                    -o-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
                }
            }

            @-webkit-keyframes loader-rotate-three {
                0% {
                    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
                }
                100% {
                    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
                }
            }

            @-moz-keyframes loader-rotate-three {
                0% {
                    -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
                }
                100% {
                    -moz-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
                }
            }
        }
    }
</style>