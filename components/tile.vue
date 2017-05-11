<style scoped lang="scss">

.tile-container {
    position: relative;

    display: flex;

    backface-visibility: hidden;

    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 35vmax;
    height: 35vmax;

    cursor: pointer;

    box-sizing: border-box;

    padding: 1.25vmax;
    margin-bottom: 1.25vmax;

    background-color: #fff;

    border-color: #000;
    border-width: 2px;
    border-style: solid;

    transform-origin: top;

    transition-duration: 0.25s;
    transition-property: all;
    transition-timing-function: ease-in-out;

    &:hover {
        background-color: #000;
        color: #fff;
    }

    &::before {
        content: '';

        position: absolute;

        box-sizing: border-box;

        width: 35vmax;
        height: 35vmax;

        padding: 1.25vmax;

        background-color: transparent;

        border-color: #000;
        border-width: 2px;
        border-style: solid;

        transition-duration: 0.25s;
        transition-property: width height;
        transition-timing-function: ease-in-out;
    }

    &:hover::before {
        width: 37.5vmax;
        height: 37.5vmax;

        box-sizing: border-box;
    }

    &.open {
        position: absolute;
        left: 0;

        width: 100vw;
        height: 100vh;

        cursor: default;

        background-color: #000;

        transition-duration: 0.666s;
        transition-property: all;
        transition-timing-function: ease-in-out;
    }

    &.open > div:not(:last-child) {
        display: none;
        opacity: 0;
    }

    &.open::before {
        border-width: 0;
    }
}

.tile-title {
    font-size: 1.5rem;
    font-weight: bold;

    margin-bottom: 2.5vmax;

    padding: 1.5vmax;

    border-left-width: 1px;
    border-left-style: solid;

    border-right-width: 1px;
    border-right-style: solid;
}

.title-desc {
    font-size: 1.25rem;
    font-weight: 300;
}

.tile-display {
    display: none;

    width: 100%;
    height: 100%;

    background-color: #000;
    color: #fff;

    opacity: 0;

    &.open {
        display: flex;
        flex-direction: column;

        opacity: 1;
    }
}

.display-title {
    display: flex;

    justify-content: space-between;
    align-items: center;

    width: 100%;
}

.usecase-title {
    font-size: 1.5rem;

    padding: 5px;

    border-bottom-color: #fff;
    border-bottom-width: 1px;
    border-bottom-style: solid;

    border-right-color: #fff;
    border-right-width: 1px;
    border-right-style: solid;
}

.close-button {
    font-size: 1.5rem;

    padding: 0.5rem;

    cursor: pointer;
}

.display-data {
    display: flex;

    justify-content: center;

    width: 100%;
    height: 100%;
}

</style>

<template>
    <div :class="[ 'tile-container', { open: isOpen }]" @click="openUseCase()">
        <div class="tile-title">
            {{ data.name }}
        </div>
        <div class="title-desc">
            {{ data.desc }}
        </div>
        <div :class="[ 'tile-display', { open: isOpen }]">
            <div class="display-title">
                <div class="usecase-title">
                    {{ data.name }}
                </div>
                <div class="close-button" @click.stop="closeUseCase()">
                    x
                </div>
            </div>
            <div class="display-data">
                <data-display :data="useCaseData">
                </data-display>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '~plugins/axios';

import dataDisplay from '~components/data-display';

export default {
    components: {
        dataDisplay,
    },
    props: [
        'data',
    ],
    data() {
        return {
            isOpen: false,
            useCaseData: [],
        };
    },
    methods: {
        async openUseCase() {
            this.isOpen = true;

            const useCasePromise = axios.get(`/api/usecases/${this.data.id}`)
                .catch(err => ({
                    err,
                }));

            const { data } = await useCasePromise;

            this.useCaseData = data;

            this.$el.style.zIndex = 99;
        },
        closeUseCase() {
            this.isOpen = false;

            this.$el.style.zIndex = 1;
        },
    },
};
</script>
