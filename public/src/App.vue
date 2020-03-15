<template>
    <div class="main-wrap">
        <Header>{{ this.$route.meta.title }}</Header>
        <SpacerComponent/>
        <main>
            <router-view/>
        </main>
        <Menu v-if="!this.$route.meta.noMenu" :menu="menu"/>
    </div>
</template>

<script>
    export default {
        components: {
            Header: () => import('./components/Header'),
            Menu: () => import('./components/Menu')
        },
        data: () => ({
            menu: [
                {
                    url: '/consumptions',
                    alt: 'minus',
                    image: require('./assets/minus-money.svg'),
                    activeImage: require('./assets/minus-money-active.svg')
                },
                {
                    url: '/income',
                    alt: 'plus',
                    image: require('./assets/plus-money.svg'),
                    activeImage: require('./assets/plus-money-active.svg')
                },
                {
                    url: '/profile',
                    alt: 'profile',
                    image: require('./assets/user.svg'),
                    activeImage: require('./assets/user-active.svg')
                }
            ]
        })
    }
</script>

<style lang="scss">
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        color: $black;
    }

    body {
        padding-bottom: 48px;
    }

    button, input {
        outline: none;
    }

    button {
        cursor: pointer;
    }
    .hint {
        color: $red;
        font-weight: 600;
        display: none;
        font-size: 12px;
        padding-left: 10px;
        margin-top: 2px;
    }
    .error-input {
        .hint {
            display: block;
        }
    }
</style>
