<template>
    <ul>
        <li v-for="item in consumptionsList">
            <h4>{{ item.name }}</h4>
            <span>{{ item.description }}</span>
            <span>{{ item.price }}</span>
        </li>
    </ul>
</template>

<script>
    import axios from 'axios';

    export default {
        data: () => ({
            consumptionsList: null
        }),
        async mounted() {
            const response = await axios.get('/api/consumption', {
                headers: {
                    'Authorization': `Bearer ${this.$store.state.auth.token}`
                }
            });
            this.consumptionsList = response.data;
        }
    }
</script>
