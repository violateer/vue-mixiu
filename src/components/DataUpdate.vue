<template>
<DataForm @onFormSubmit="handleUpdate" :resource="resource" :alert="alert" />
</template>

<script>
import DataForm from '@/components/DataForm.vue'
import {
    watch,
    reactive,
    toRefs,
    onBeforeUnmount
} from 'vue'
import {
    updateResource
} from "@/actions"
export default {
    components: {
        DataForm
    },
    props: {
        resource: {
            type: Object
        }
    },
    setup(props, context) {
        const data = reactive({
            alert: {
                success: null,
                error: null
            },
            timeOutId: null
        })

        watch(() => props.resource, (resource, prevResource) => {
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

        const handleUpdate = async (uResource) => {
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
            handleUpdate
        }
    }
}
</script>

<style scoped>

</style>
