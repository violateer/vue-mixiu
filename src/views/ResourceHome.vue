<template>
<div class="container">
    <Header />
    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">数据</span>
                <span class="badge badge-secondary badge-pill">{{getResourcesLength}}</span>
            </h4>
            <SearchBox />
            <DataList :resources="resources" @handleItemClick="selectResource" />
            <!-- 添加按钮 -->
            <button class="btn btn-sm btn-primary" @click="addResource">添加数据</button>
        </div>
        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">数据 {{selectedResource?._id}} <button @click="isDetailView = !isDetailView" :class="`btn btn-sm ${toggleBtnClass}`">{{!isDetailView ? "更新" : "详情"}}</button></h4>
            <DataUpdate v-if="isDetailView" />
            <DataDetail :resource="selectedResource" v-else />
        </div>
    </div>
</div>
</template>

<script>
import Header from "@/components/Header.vue"
import SearchBox from "@/components/SearchBox.vue"
import DataList from "@/components/DataList.vue"
import DataUpdate from "@/components/DataUpdate.vue"
import DataDetail from "@/components/DataDetail.vue"
import {
    toRefs,
    reactive,
    computed,
    ref
} from 'vue'
export default {
    name: "ResourceHome",
    components: {
        Header,
        SearchBox,
        DataList,
        DataUpdate,
        DataDetail
    },
    setup() {
        const data = reactive({
            resources: [],
        })
        const isDetailView = ref(true)
        const selectedResource = ref(null)
        // computed
        const getResourcesLength = computed(() => {
            return data.resources.length
        })

        const toggleBtnClass = computed(() => !isDetailView.value ? "btn-primary" : "btn-warning")

        // method
        const selectResource = (resource) => {
            selectedResource.value = resource
        }

        const addResource = () => {
            const _id = "_" + Math.random().toString(36).slice(2)
            const type = ["book", "blog", "video"][Math.floor(Math.random() * 3)]
            const newResource = {
                _id,
                title: `${_id} title`,
                description: `${_id} description`,
                link: "",
                type
            }
            data.resources.unshift(newResource)
        }
        return {
            ...toRefs(data),
            getResourcesLength,
            isDetailView,
            addResource,
            toggleBtnClass,
            selectResource,
            selectedResource
        }
    }
}
</script>

<style scoped>

</style>
