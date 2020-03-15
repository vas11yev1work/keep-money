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
                <label class="input-label" :class="{'error-input': $v.name.$error}">
                    <Input
                            placeholder="Имя *"
                            v-model="name"
                            @change="$v.name.$touch()"
                            :class="{'error': $v.name.$error}"
                    />
                    <span class="hint" v-if="!$v.name.required">Заполните поле</span>
                </label>
                <label class="input-label" :class="{'error-input': $v.surname.$error}">
                    <Input
                            placeholder="Фамилия *"
                            v-model="surname"
                            @change="$v.surname.$touch()"
                            :class="{'error': $v.surname.$error}"
                    />
                    <span class="hint" v-if="!$v.surname.required">Заполните поле</span>
                </label>
                <label class="input-label" :class="{'error-input': $v.login.$error}">
                    <Input
                            placeholder="Логин *"
                            v-model="login"
                            @change="$v.login.$touch()"
                            :class="{'error': $v.login.$error}"
                    />
                    <span class="hint" v-if="!$v.login.required">Заполните поле</span>
                    <span class="hint" v-else-if="!$v.login.minLength">Минимальная длина 6 символов</span>
                    <span class="hint" v-else-if="!$v.login.loginRegex">Логин должен состоять только из цифр и английских символов</span>
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
                    <span class="hint" v-else-if="!$v.password.minLength">Минимальная длина 6 символов</span>
                </label>
                <label class="input-label" :class="{'error-input': $v.confirmPassword.$error}">
                    <Input
                            type="password"
                            placeholder="Подтвердить пароль *"
                            v-model="confirmPassword"
                            @change="$v.confirmPassword.$touch()"
                            :class="{'error': $v.confirmPassword.$error}"
                    />
                    <span class="hint" v-if="!$v.confirmPassword.required">Заполните поле</span>
                    <span class="hint" v-else-if="!$v.confirmPassword.sameAsPassword">Пароли не совпадают</span>
                </label>
            </form>
            <Button @button-click="registrationHandler">Зарегистрироваться</Button>
            <div class="login-link">
                <router-link to="/login">или Войти</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {helpers, required, sameAs, minLength} from 'vuelidate/lib/validators';
    const loginRegex = helpers.regex('loginRegex', /^[a-zA-Z0-9]*$/);

    export default {
        components: {
            Modal: () => import('../components/Modal')
        },
        data: () => ({
            name: '',
            surname: '',
            login: '',
            password: '',
            confirmPassword: '',
            modal: false,
            modalText: '',
            modalTitle: '',
        }),
        validations: {
            name: {
                required
            },
            surname: {
                required
            },
            login: {
                required,
                minLength: minLength(6),
                loginRegex
            },
            password: {
                required,
                minLength: minLength(6)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
            async registrationHandler() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const {name, surname, login, password} = this;
                    const response = await this.$store.dispatch('registrationRequest', {
                        name,
                        surname,
                        login,
                        password
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
            .login-link {
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
