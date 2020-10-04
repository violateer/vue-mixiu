<template>
<form class="card p-2">
    <div class="input-group">
        <input @keyup="$emit('onsearch', $event.target.value)" type="text" class="form-control" placeholder="写点啥..." />
    </div>
</form>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
