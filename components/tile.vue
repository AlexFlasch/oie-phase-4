<style scoped lang="scss">

.tile-container {
    position: relative;

    display: flex;

    backface-visibility: hidden;

    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 40vmax;
    height: 40vmax;

    cursor: pointer;

    box-sizing: border-box;

    padding: 1.25vmax;

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

        width: 40vmax;
        height: 40vmax;

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
        width: 42.5vmax;
        height: 42.5vmax;

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

.push-right {
    display: flex;

    justify-content: flex-end;

    width: 100%;
}

.close-button {
    font-size: 1.5rem;

    padding: 0.5rem;

    cursor: pointer;
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
            <div class="push-right">
                <div class="close-button" @click.stop="closeUseCase()">
                    x
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: { },
    props: [
        'data',
    ],
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        openUseCase() {
            this.isOpen = true;

            this.$el.style.zIndex = 99;
        },
        closeUseCase() {
            this.isOpen = false;

            this.$el.style.zIndex = 1;
        },
    },
};
</script>
