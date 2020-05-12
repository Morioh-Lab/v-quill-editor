<template>

    <div>
        <div class="form-group">

            <h4>Theme: 'bubble'</h4>

            <editor v-model="value" @change="onChange" paste-as-text="true"></editor>

        </div>
        <div class="form-group">
            <button @click="val" class="btn btn-primary">Change</button>
        </div>


        <h4>Theme: 'snow'</h4>
        <div class="form-group">

            <editor theme="snow">
            </editor>

        </div>

        <h4>More with options</h4>
        <div class="form-group">

            <editor theme="snow" ref="e1f3e85" :options="options"></editor>

        </div>


    </div>

</template>


<script>

    export default {
        data() {
            return {
                value: 'This is default value',
                options: {
                    modules: {

                        'toolbar': [
                            [{ 'size': [] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'script': 'super' }, { 'script': 'sub' }],
                            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }, { 'align': [] }],
                            ['link', 'image', 'video', 'formula'],
                            ['clean']
                        ],
                    },
                }
            }
        },

        methods: {
            val() {
                this.value = "This's new value";
            },

            onChange(html, text) {
                console.log(html.length, text.length);
            },


        },

    }

</script>

<style>
    .ql-editor {
        min-height: 250px;
    }
</style>