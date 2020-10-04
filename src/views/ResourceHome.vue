<template>
<div class="row">
    <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">数据</span>
            <span class="badge badge-secondary badge-pill">{{getResourcesLength}}</span>
        </h4>
        <SearchBox />
        <DataList :resources="resources" @handleItemClick="selectResource" :activeId="activeResource?._id" />
        <!-- <button class="btn btn-sm btn-primary" @click="addResource">添加数据</button> -->
    </div>
    <div class="col-md-8 order-md-1">
        <h4 class="mb-3">数据 {{activeResource?._id}}
            <template v-if="getResourcesLength">
                <button @click="isDetailView = !isDetailView" :class="`btn btn-sm ${toggleBtnClass} mr-2`">{{!isDetailView ? "更新" : "详情"}}</button>
                <DataDelete @onResourceDelete="handleResourceDelete" :activeId="activeResource?._id" />
            </template>
        </h4>
        <DataUpdate @onUpdateResource="handleUpdateResource" :resource="activeResource" v-if="!isDetailView" />
        <DataDetail :resource="activeResource" v-else>
            <template #buttonLink>
                <router-link :to="{name: 'resourceDetailPage', params: {id: activeResource?._id}}" class="btn btn-outline-success">详情</router-link>
            </template>
        </DataDetail>
    </div>
</div>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue"
import DataList from "@/components/DataList.vue"
import DataUpdate from "@/components/DataUpdate.vue"
import DataDetail from "@/components/DataDetail.vue"
import DataDelete from "@/components/DataDelete.vue"
import {
    fetchResource
} from "@/actions"
import {
    onMounted
} from "vue"
import {
    toRefs,
    reactive,
    computed,
    ref
} from 'vue'
export default {
    name: "ResourceHome",
    components: {
        SearchBox,
        DataList,
        DataUpdate,
        DataDetail,
        DataDelete
    },
    setup() {
        const data = reactive({
            resources: [],
        })
        const isDetailView = ref(true)
        const selectedResource = ref(null)

        // 生命周期钩子
        onMounted(async () => {
            const res = await fetchResource()
            data.resources = res
        })

        // computed
        const getResourcesLength = computed(() => {
            return data.resources.length
        })

        const toggleBtnClass = computed(() => isDetailView.value ? "btn-primary" : "btn-warning")

        const activeResource = computed(() => {
            return selectedResource.value || (getResourcesLength > 0 && data.resources[0])
        })
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

        const handleUpdateResource = (newResource) => {
            const index = data.resources.findIndex(resource => resource._id === newResource._id)
            data.resources[index] = newResource

            selectResource(newResource)
        }

        const handleResourceDelete = (newResource) => {
            const index = data.resources.findIndex(resource => resource._id === newResource._id)
            data.resources.splice(index, 1)
            selectResource(data.resources[0] || null)
        }

        return {
            ...toRefs(data),
            getResourcesLength,
            isDetailView,
            addResource,
            toggleBtnClass,
            selectResource,
            activeResource,
            handleUpdateResource,
            handleResourceDelete
        }
    }
}
</script>

<style scoped>

</style>
