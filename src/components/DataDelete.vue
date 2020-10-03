<template>
<div class="btn btn-sm btn-danger" @click="handleDeleteResource">删除</div>
</template>

<script>
import {
    deleteResource
} from "@/actions"
export default {
    props: {
        activeId: {
            type: String
        }
    },
    setup(props, context) {
        const handleDeleteResource = async () => {
            const deletedResource = await deleteResource(props.activeId)
            context.emit("onResourceDelete", deletedResource)
        }
        return {
            handleDeleteResource
        }
    }
}
</script>

<style scoped>

</style>
