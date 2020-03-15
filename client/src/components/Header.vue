<template>
    <header>
        <div class="header">
            <h2>
                <slot>Header</slot>
            </h2>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header {
        height: 62px;
        display: flex;
        align-items: center;
        background-color: $white;
        .header {
            padding: 0 16px;
            h2 {
                font-size: 24px;
                font-weight: 800;
            }
        }
    }
</style>
