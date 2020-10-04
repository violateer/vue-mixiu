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
    <button class="btn btn-primary btn-lg btn-block" type="button" @click="submitForm">提交</button>
</form>
</template>

<script>
import {
    ref,
    watch
} from 'vue'

export default {
    props: {
        resource: {
            type: Object
        },
        alert: {
            type: Object
        }
    },
    setup(props, context) {
        const uResource = ref(props.resource)
        const types = ["book", "video", "blog"]

        watch(() => props.resource, (resource, prevResource) => {
            uResource.value = resource
        })

        const submitForm = () => {
            context.emit("onFormSubmit", uResource)
        }

        return {
            uResource,
            types,
            submitForm
        }
    }
}
</script>

<style scoped>

</style>
