<template>
    <div class="page-wrap">
        <Modal
            @close="close"
            @button-click="close"
            :show="modal"
            :title="modalTitle"
            buttonText="Закрыть"
            buttonColor="#EE5B5B"
        >{{ modalText }}</Modal>
        <div class="login">
            <form>
                <label class="input-label" :class="{'error-input': $v.login.$error}">
                    <Input
                        placeholder="Логин *"
                        v-model="login"
                        @change="$v.login.$touch()"
                        :class="{'error': $v.login.$error}"
                    />
                    <span class="hint" v-if="!$v.login.required">Заполните поле</span>
                </label>
                <label class="input-label" :class="{'error-input': $v.password.$error}">
                    <Input
                        type="password"
                        placeholder="Пароль *"
                        v-model="password"
                        @change="$v.password.$touch()"
                        :class="{'error': $v.password.$error}"
                    />
                    <span class="hint" v-if="!$v.password.required">Заполните поле</span>
                </label>
            </form>
            <Button @button-click="loginHandler">
                <span>Войти</span>
            </Button>
            <div class="registration-link">
                <router-link to="/registration">или Зарегистрироваться</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators';

    export default {
        components: {
            Modal: () => import('../components/Modal')
        },
        data: () => ({
            login: '',
            password: '',
            modal: false,
            modalTitle: '',
            modalText: ''
        }),
        validations: {
            login: {
                required
            },
            password: {
                required
            }
        },
        methods: {
            async loginHandler() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const {login, password} = this;
                    const response = await this.$store.dispatch('loginRequest', {
                        login, password
                    });
                    if (typeof response !== 'undefined') {
                        this.modal = true;
                        this.modalTitle = response.title;
                        this.modalText = response.message;
                    }
                }
            },
            close() {
                this.modal = false;
                this.modalTitle = this.modalText = '';
            }
        },
        mounted() {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push('/profile');
            }
            const {regLogin} = this.$route.query;
            if (regLogin) {
                this.login = regLogin;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrap {
        .login {
            padding: 16px;
            .input-label {
                display: block;
                margin-bottom: 10px;

            }
            .registration-link {
                margin-top: 10px;
                text-align: center;
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 40px;
                    width: 100%;
                    font-size: 14px;
                    color: $blue;
                    text-decoration: none;
                }
            }
        }
    }
</style>
