<template>
    <div class="income">
        <div class="income-wrap">
            <h4>Я заработал</h4>
            <span>{{ value }} ₽</span>
        </div>
        <Button>Добавить доход</Button>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                default: 0,
                type: Number
            }
        }
    }
</script>

<style lang="scss" scoped>
    .income {
        padding: 16px;

        .income-wrap {
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
