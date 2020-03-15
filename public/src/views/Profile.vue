<template>
    <div class="page-wrap">
        <User :name="getName" :loading="loading"/>
        <SpacerComponent/>
        <Consumption :value="consumptionAmount" :loading="loading"/>
        <SpacerComponent/>
        <Income :value="17800"/>
        <SpacerComponent/>
        <div class="logout-wrap">
            <h4>Выход</h4>
            <Button @button-click="logout" color="#EE5B5B">Выйти из системы</Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        components: {
            User: () => import('../components/profile/User'),
            Consumption: () => import('../components/profile/Consumption'),
            Income: () => import('../components/profile/Income')
        },
        data: () => ({
            loading: true,
            name: '',
            surname: '',
            login: '',
            consumptionAmount: 0
        }),
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            }
        },
        computed: {
            getName() {
                return `${this.name} ${this.surname}`
            }
        },
        async mounted() {
            setTimeout(async () => {
                const response = await axios.get('/api/auth/currentUser', {
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.auth.token}`
                    }
                });
                this.loading = false;
                this.name = response.data.name;
                this.surname = response.data.surname;
                this.login = response.data.login;
                this.consumptionAmount = response.data.consumptionAmount;
            }, 600);
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrap {
        .logout-wrap {
            h4 {
                font-size: 18px;
                margin-bottom: 16px;
                font-weight: 600;
            }
            padding: 16px;
        }
    }
</style>
