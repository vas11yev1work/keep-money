<template>
    <div class="consumption">
        <div class="consumption-wrap">
            <h4>Я потратил</h4>
            <SkeletonTheme>
                <div class="loading" v-if="loading">
                    <Skeleton height="19px" width="60px" :duration="1"/>
                </div>
                <span v-else>{{ value }} ₽</span>
            </SkeletonTheme>
        </div>
        <Button @button-click="redirect">Добавить расход</Button>
    </div>
</template>

<script>
    import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

    export default {
        components: {
            SkeletonTheme,
            Skeleton
        },
        props: {
            value: {
                default: 0,
                type: Number
            },
            loading: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            redirect() {
                this.$router.push({name: 'add-consumption'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .consumption {
        padding: 16px;

        .consumption-wrap {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            h4 {
                font-size: 18px;
                font-weight: 600;
            }

            span {
                color: $blue;
                font-size: 14px;
            }
        }
    }
</style>
