<style scoped lang="scss">
.title {
    margin: 30px 0;
}
.users {
    list-style: none;
    margin: 0;
    padding: 0;
}
.user {
    margin: 10px 0;
}

.container {
    display: flex;

    justify-content: center;
    align-items: center;
}
</style>

<template>
    <section class="container">
        <Tile v-for="useCase in useCases"
              :data="useCase"
              :key="useCase.id">
        </Tile>
    </section>
</template>

<script>
import axios from '~plugins/axios';

import Tile from '~components/tile';

export default {
    components: {
        Tile,
    },
    async asyncData() {
        const { data } = await axios.get('/api/usecases');
        return {
            useCases: data,
        };
    },
    head() {
        return {
            title: 'Users',
        };
    },
};
</script>
