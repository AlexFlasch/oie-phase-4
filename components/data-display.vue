<style scoped lang="scss">

.data-display-container {
    width: 100%;
    height: 100%;

    overflow: scroll;
}

.data-display-container * {
    font-weight: 100;
}

.table-container {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;

    tr:nth-child(2n) {
        background-color: transparentize(#fff, 0.8);
    }

    & th {
        padding: 5px;

        font-size: 1.35rem;
    }

    & td {
        padding: 5px;

        font-size: 1.15rem;
    }
}

tr.header-row {
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #fff;
}

thead > tr {
    position: relative;
}

tbody {
    overflow: auto;
}

</style>

<template>
    <div class="data-display-container">
        <div class="table-container">
            <table>
                <thead>
                    <tr class="header-row">
                        <th v-for="key in dataKeys">
                            {{key}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in data">
                        <td v-for="cell in row">
                            {{cell}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'data',
    ],
    data() {
        return {
            dataKeys: [],
        };
    },
    watch: {
        data() {
            function typeOf(obj) {
                return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
            }

            const dataTypes = [];
            this.dataKeys = Object.keys(this.data[0]);

            this.dataKeys.map((key) => {
                dataTypes.push(typeOf(key));
            });

            this.dataTypes = dataTypes;
        },
    },
};
</script>
