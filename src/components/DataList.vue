<template>
<ul class="list-group resource-list mb-3">
    <li v-for="resource in resources" :key="resource._id" :class="`${activeItemClass(
        resource
      )} list-group-item d-flex justify-content-between lh-condensed resource-list-item`">
        <div>
            <h6 class="my-0">{{ resource.title }}</h6>
            <small class="text-muted">{{ resource.description }}</small>
        </div>
        <span class="text-muted">{{ resource.type }}</span>
    </li>
</ul>
</template>

<script>
import {
    computed
} from 'vue'
export default {
    props: {
        resources: {
            type: Array,
            default: () => [],
        }
    },
    setup(props, context) {
        const activeItemClass = computed(() => {
            return (resource) => (resource._id === props.activeId ? "is-active" : "");
        })
        return {
            activeItemClass
        }
    }
}
</script>

<style lang="scss" scoped>
.resource-list {
    max-height: 350px;
    overflow-y: auto;

    &-item {
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }
    }

    .is-active {
        background-color: #f3f3f3;
    }
}
</style>
