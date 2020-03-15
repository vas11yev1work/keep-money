<template>
    <button :style="{width, color}" @click="clickEmit" class="default-button">
        <slot>Button</slot>
    </button>
</template>

<script>
    export default {
        props: {
            width: {
                default: '100%',
                type: String
            },
            color: {
                default: '#3F8AE0',
                type: String
            }
        },
        methods: {
            clickEmit() {
                this.$emit('button-click');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .default-button {
        background-color: $spacer;
        border: none;
        height: 40px;
        font-weight: 600;
        border-radius: 10px;
        span {
            &.red {
                color: $red;
            }
            color: $blue;
        }
    }
</style>
