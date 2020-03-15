<template>
    <div class="user">
        <div class="icon">
            <img alt="profile" src="../../assets/profile.svg">
        </div>
        <div class="user-data">
            <SkeletonTheme color="#F2F3F5" highlight="#FAFAFA">
                <div class="loading" v-if="loading">
                    <Skeleton height="21px" :duration="1"/>
                </div>
                <div class="name-wrapper" v-else>
                    <h3>{{ name }}</h3>
                </div>
            </SkeletonTheme>
            <Button>Редактировать профиль</Button>
        </div>
    </div>
</template>

<script>
    import {SkeletonTheme, Skeleton} from 'vue-loading-skeleton';

    export default {
        components: {
            SkeletonTheme,
            Skeleton
        },
        props: {
            name: {
                default: 'Username',
                type: String
            },
            loading: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user {
        padding: 16px;
        display: flex;
        align-items: center;

        .icon {
            margin-right: 16px;

            img {
                height: 70px;
                width: 70px;
                display: flex;
            }
        }

        .user-data {
            width: 100%;
            .name-wrapper {
                margin-bottom: 8px;
                h3 {
                    font-size: 18px;
                    font-weight: 600;
                }
            }
            .loading {
                margin-bottom: 8px;
            }
        }
    }
</style>
