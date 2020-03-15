<template>
    <footer>
        <router-link :to="link.url" v-for="link in menu">
            <img :alt="link.alt" :src="link.image" class="not-active">
            <img :alt="link.alt" :src="link.activeImage" class="active">
        </router-link>
    </footer>
</template>

<script>
    export default {
        props: {
            menu: {
                default: () => [],
                type: Array
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        background-color: $white;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 48px;
        display: flex;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        a {
            width: 100%;
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;

            img {
                width: 22px;
                height: 22px;
                display: flex;

                &.active {
                    display: none;
                }
            }

            &.router-link-active {
                img {
                    &.active {
                        display: flex;
                    }

                    &.not-active {
                        display: none;
                    }
                }
            }
        }
    }
</style>
