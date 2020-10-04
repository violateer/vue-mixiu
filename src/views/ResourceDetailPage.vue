<template>
<DataDetail :resource="resource">
    <template #buttonLink>
        <button @click="$router.go(-1)" class="btn btn-outline-success">返回</button>
    </template>
</DataDetail>
</template>

<script>
import {
    useRoute
} from "vue-router"
import {
    fetchRes
} from "@/actions"
import {
    onMounted,
    reactive,
    toRefs
} from "vue"
import DataDetail from "@/components/DataDetail.vue"
export default {
    components: {
        DataDetail
    },
    setup() {
        const route = useRoute()
        const data = reactive({
            resource: null
        })

        onMounted(async () => {
            const {
                id
            } = route.params
            data.resource = await fetchRes(id)
        })

        return {
            ...toRefs(data)
        }
    }
}
</script>

<style scoped>

</style>
