<template>
<form>
    <div v-if="alert?.success" class="alert alert-success">{{alert.success}}</div>
    <div v-if="alert?.error" class="alert alert-danger">{{alert.error}}</div>
    <div class="mb-3">
        <label htmlFor="title">标题</label>
        <input v-model="uResource.title" type="text" class="form-control" id="title" placeholder="标题...." />
    </div>
    <div class="mb-3">
        <label for="description">描述</label>
        <textarea v-model="uResource.description" class="form-control" id="description" placeholder="描述"></textarea>
    </div>
    <div class="mb-3">
        <label htmlFor="type">类型</label>
        <select id="type" class="form-control" v-model="uResource.type">
            <option v-for="type in types" :value="type" :key="type">{{type}}</option>
        </select>
    </div>
    <div class="mb-3">
        <label htmlFor="link">链接</label>
        <div class="input-group">
            <input v-model="uResource.link" type="text" class="form-control" id="link" placeholder="链接...." />
        </div>
    </div>
    <hr class="mb-4" />
    <button class="btn btn-primary btn-lg btn-block" type="button" @click="handleUpdate">提交</button>
</form>
</template>

<script>
import {
    ref,
    watch,
    reactive,
    toRefs,
    onBeforeUnmount
} from 'vue'
import {
    updateResource
} from "@/actions"
export default {
    props: {
        resource: {
            type: Object
        }
    },
    setup(props, context) {
        const uResource = ref(props.resource)
        const types = ["book", "video", "blog"]
        const data = reactive({
            alert: {
                success: null,
                error: null
            },
            timeOutId: null
        })

        watch(() => props.resource, (resource, prevResource) => {
            uResource.value = resource
            if (resource && (resource._id !== resource._id)) {
                clearAlertTimeout()
                data.alert = initAlert()
            }
        })

        const initAlert = () => {
            return {
                success: null,
                error: null
            }
        }

        onBeforeUnmount(() => {
            clearAlertTimeout()
        })

        const clearAlertTimeout = () => {
            data.timeOutId && clearTimeout(data.timeOutId)
        }

        const setAlert = (type, message) => {
            data.alert = initAlert()
            data.alert[type] = message

            data.timeOutId = setTimeout(() => {
                data.alert = initAlert()
            }, 3000);
        }

        const handleUpdate = async () => {
            try {
                const updatedResource = await updateResource(uResource.value._id, uResource.value)
                context.emit("onUpdateResource", updatedResource)
                setAlert("success", "Resource was updated")
            } catch (errorMessage) {
                setAlert("error", errorMessage)
            }
        }

        return {
            ...toRefs(data),
            uResource,
            types,
            handleUpdate
        }
    }
}
</script>

<style scoped>

</style>
