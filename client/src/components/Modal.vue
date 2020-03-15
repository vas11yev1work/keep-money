<template>
    <transition name="fade">
        <div class="modal" v-if="show">
            <div class="overlay" @click="close"></div>
            <div class="modal-block">
                <div class="description-block">
                    <h4>{{ title }}</h4>
                    <p><slot>Modal Text</slot></p>
                </div>
                <button @click="buttonClick" :style="{color: buttonColor}">{{ buttonText }}</button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Modal'
            },
            buttonText: {
                type: String,
                default: 'OK'
            },
            buttonColor: {
                type: String,
                default: '#3F8AE0'
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            buttonClick() {
                this.$emit('button-click');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .overlay {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
        }
        .modal-block {
            position: absolute;
            background-color: $white;
            top: 150px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            border-radius: 15px;
            .description-block {
                text-align: center;
                padding: 16px;
                h4 {
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 14px;
                    line-height: 20px;
                }
            }
            button {
                background-color: transparent;
                border: none;
                border-top: 1px solid $spacer;
                height: 40px;
                width: 100%;
                font-weight: 600;
            }
        }
    }
</style>
