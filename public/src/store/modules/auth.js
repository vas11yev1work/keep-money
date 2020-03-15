import axios from 'axios';
import router from '../../router';

const state = () => ({
    token: localStorage.getItem('token') || '',
    s: '1234'
});

const mutations = {
    setToken(state, token) {
        state.token = token;
    }
};

const actions = {
    async registrationRequest({commit}, user) {
        try {
            await axios.post('/api/auth/registration', {...user});
            await router.push(`/login?regLogin=${user.login}`);
        } catch (e) {
            const {message} = e.response.data;
            return {
                title: 'Ошибка при регистрации',
                message
            };
        }
    },
    async loginRequest({commit}, user) {
        try {
            await axios.post('/api/auth/login', {...user}).then(r => {
                localStorage.setItem('userData', JSON.stringify(r.data));
                localStorage.setItem('token', r.data.token);
                commit('setToken', r.data.token);
            });
            await router.push('/profile');
        } catch (e) {
            const {message} = e.response.data;
            return {
                title: 'Ошибка при авторизации',
                message
            };
        }
    },
    logout({commit}) {
        commit('setToken', '');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }
};

const getters = {
    isAuthenticated: state => !!state.token
};

export default {
    state,
    mutations,
    actions,
    getters,
}
