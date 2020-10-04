<template>
<DataForm @onFormSubmit="handleCreate" :resource="resource" :alert="alert" />
</template>

<script>
import DataForm from '@/components/DataForm.vue'
import {
    useRouter
} from 'vue-router'
import {
    ref,
    reactive,
    toRefs,
    onBeforeUnmount
} from 'vue'
import {
    createResource
} from "@/actions"
export default {
    components: {
        DataForm
    },
    setup() {
        const router = useRouter()
        const data = reactive({
            resource: {
                title: "",
                description: "",
                type: "video",
                link: ""
            },
            alert: {
                success: null,
                error: null
            },
            timeOutId: null
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
                router.push("/")
            }, 2000);
        }

        const handleCreate = async (resource) => {
            await createResource(resource.value)
            setAlert("success", "Resource was created")
        }

        return {
            ...toRefs(data),
            handleCreate
        }
    }
}
</script>

<style scoped>

</style>
