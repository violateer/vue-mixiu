<template>
<form>
    <div class="mb-3">
        <label htmlFor="title">标题</label>
        <input v-model="updateResource.title" type="text" class="form-control" id="title" placeholder="标题...." />
    </div>
    <div class="mb-3">
        <label for="description">描述</label>
        <textarea v-model="updateResource.description" class="form-control" id="description" placeholder="描述"></textarea>
    </div>
    <div class="mb-3">
        <label htmlFor="type">类型</label>
        <select id="type" class="form-control" v-model="updateResource.type">
            <option v-for="type in types" :value="type" :key="type">{{type}}</option>
        </select>
    </div>
    <div class="mb-3">
        <label htmlFor="link">链接</label>
        <div class="input-group">
            <input v-model="updateResource.link" type="text" class="form-control" id="link" placeholder="链接...." />
        </div>
    </div>
    <hr class="mb-4" />
    <button class="btn btn-primary btn-lg btn-block" type="submit">提交</button>
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
        }
    },
    setup(props, context) {
        const updateResource = ref(props.resource)
        const types = ["book", "video", "blog"]
        watch(() => props.resource, (resource, prevResource) => {
            updateResource.value = resource
        })
        return {
            updateResource,
            types
        }
    }
}
</script>

<style scoped>

</style>
