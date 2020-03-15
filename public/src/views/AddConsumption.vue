<template>
    <div class="page-wrap">
        <div class="description">
            <h4>Описание</h4>
            <label class="input-label" :class="{'error-input': $v.name.$error}">
                <Input
                    placeholder="Наименование *"
                    @change="$v.name.$touch()"
                    v-model="name"
                    :class="{'error': $v.name.$error}"
                />
                <span class="hint" v-if="!$v.name.required">Заполните поле</span>
            </label>
            <label class="input-label">
                <Input
                    placeholder="Описание"
                    v-model="description"
                />
            </label>
            <label class="input-label" :class="{'error-input': $v.price.$error}">
                <Input
                    placeholder="Сумма *"
                    type="number"
                    @change="$v.price.$touch()"
                    v-model="price"
                    :class="{'error': $v.price.$error}"
                />
                <span class="hint" v-if="!$v.price.required">Заполните поле</span>
            </label>
        </div>
        <SpacerComponent/>
        <div class="categories">
            <h4>Категория</h4>
            <SkeletonTheme color="#F2F3F5" highlight="#FAFAFA">
                <div class="no-wrapper" v-if="loading">
                    <div class="skeleton" v-for="s in 3">
                        <Skeleton height="22px" :duration="1"/>
                    </div>
                </div>
                <div class="wrapper" v-else>
                    <label v-for="category in categories.list">
                        <input :name="categories.name" :value="category.value" type="radio" v-model="selectedCategory">
                        <span>{{ category.name }}</span>
                    </label>
                </div>
            </SkeletonTheme>
        </div>
        <div class="button-wrap">
            <Button @button-click="create">Добавить расход</Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';
    import { required } from 'vuelidate/lib/validators';

    export default {
        components: {
            Skeleton,
            SkeletonTheme
        },
        data: () => ({
            name: '',
            description: '',
            price: '',
            selectedCategory: '',
            categories: {
                name: 'categories',
                list: null
            },
            loading: true
        }),
        validations: {
            name: {
                required
            },
            price: {
                required
            }
        },
        methods: {
            async create() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const {name, description, price, selectedCategory} = this;
                    await axios.post('/api/consumption/create', {
                        name,
                        description,
                        price,
                        category: selectedCategory
                    }, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.auth.token}`
                        }
                    });
                    await this.$router.push('/profile');
                }
            }
        },
        mounted() {
            setTimeout(async () => {
                const categories = await axios.get('/api/consumption/categories', {
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.auth.token}`
                    }
                });
                this.categories.list = categories.data;
                this.selectedCategory = this.categories.list[0].value;
                this.loading = false;
            }, 600)
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrap {
        .description {
            padding: 16px;

            h4 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 16px;
            }

            .input-label {
                margin-bottom: 10px;
                display: block;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        .categories {
            padding: 16px;

            h4 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 16px;
            }

            label {
                display: block;
                margin-bottom: 10px;

                &:last-child {
                    margin-bottom: 0;
                }

                input {
                    position: absolute;
                    z-index: -1;
                    opacity: 0;
                }

                span {
                    position: relative;
                    padding: 0 0 0 20px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: .2s;
                    color: $grey;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 16px;
                        height: 16px;
                        border: 1px solid $grey;
                        border-radius: 50%;
                        background: #FFF;
                        transition: .2s;
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: $blue;
                        opacity: 0;
                        transition: .2s;
                    }
                }

                input:checked + span:after {
                    opacity: 1;
                }

                input:checked + span {
                    color: $blue;
                }

                input:checked + span:before {
                    border-color: $blue;
                }
            }
        }

        .button-wrap {
            padding: 16px;
        }
    }
    .skeleton {
        margin-bottom: 4px;
    }
</style>
