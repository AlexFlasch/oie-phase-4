<style scoped lang="scss">
.title {
    margin-bottom: 30px;
}

.tiles-container {
    display: flex;

    width: 100vw;
    height: 100vh;

    z-index: 1;

    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
}
</style>

<template>
    <div class="container">
        <div class="title">OIE Phase 4</div>
        <section class="tiles-container">
            <Tile v-for="useCase in useCases"
                  :data="useCase"
                  :key="useCase.id">
            </Tile>
        </section>
    </div>
</template>

<script>
import axios from '~plugins/axios';

import Tile from '~components/tile';

export default {
    components: {
        Tile,
    },
    async asyncData() {
        const useCasePromises = axios.get('/api/usecases')
            .catch(err => ({
                err,
            }));

        const { data } = await useCasePromises;
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
