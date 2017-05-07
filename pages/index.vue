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
    </section>
</template>

<script>
import axios from '~plugins/axios';

export default {
    async asyncData() {
        const { data } = await axios.get('/api/users');
        return {
            users: data,
        };
    },
    head() {
        return {
            title: 'Users',
        };
    },
};
</script>
