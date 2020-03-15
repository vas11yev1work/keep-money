<template>
    <input
        :placeholder="placeholder"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="input"
        @change="$emit('change')"
        autocomplete="off"
    >
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            hint: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style lang="scss" scoped>
    .input {
        width: 100%;
        height: 40px;
        border: none;
        background-color: $spacer;
        border-radius: 10px;
        padding: 0 16px;
        font-weight: 500;
        &.error {
            color: $red;
            padding: 0 14px;
            &::placeholder {
                color: $red;
            }
            border: 2px solid $red;
        }
        &::placeholder {
            color: $grey;
        }
    }
</style>
