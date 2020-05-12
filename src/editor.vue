<template>
    <div class="quill-editor-container">
        <slot name="toolbar"></slot>
        <div ref="editor" :style="css"></div>
    </div>
</template>



<script>



    import Quill from 'quill';

    export default {
        props: {

            // id: {
            //     type: String,
            //     default: () => {
            //         return 'v-editor-' + Math.random().toString(16).substr(2, 9);
            //     }
            // },            

            placeholder: {
                type: String,
                default: () => "Let's write an awesome story!"
            },

            theme: {
                type: String,
                default: () => 'bubble'
            },

            pasteAsText: {
                type: Boolean,
                default: () => false
            },

            value: {
                type: String,
                required: false
            },

            options: {
                type: Object,
                default: () => { }
            },
        },

        data() {
            return {
                editor: null,
            }
        },

        watch: {
            value(val) {
                if (val != this.editor.root.innerHTML) {
                    this.editor.pasteHTML(val);
                }
            }
        },

        methods: {
            // import(...args) {
            //     return Quill.import(...args);
            // },

            // register(...args) {
            //     Quill.register(...args);
            //     this.build();
            // },

            build() {

                var o = Object.assign({
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image', 'video']
                        ],

                    }
                }, this.options, { placeholder: this.placeholder, theme: this.theme });

                if (this.pasteAsText) {

                    o.modules.clipboard = {
                        matchers: [
                            [Node.ELEMENT_NODE, (node, delta) => {
                                let ops = [];
                                delta.ops.forEach(op => {
                                    if (op.insert && typeof op.insert === 'string') {
                                        ops.push({ insert: op.insert });
                                    }
                                });
                                delta.ops = ops;
                                return delta;
                            }]
                        ]
                    }

                }

                this.editor = new Quill(this.$refs.editor, o);

                if (this.value) {
                    this.editor.pasteHTML(this.value);
                }

                this.editor.on('selection-change', range => {
                    if (!range) {
                        this.$emit('blur', this.editor);
                    } else {
                        this.$emit('focus', this.editor);
                    }
                });

                this.editor.on('text-change', (delta, oldDelta, source) => {
                    var editor = this.editor;
                    let html = editor.root.innerHTML;
                    var text = editor.getText();
                    if (html === '<p><br></p>') html = '';
                    this.$emit('input', html);
                    this.$emit('change', html, text);
                });

            }
        },
        mounted() {
            this.build();
        },

        beforeDestroy() {
            this.editor = null;
        },

    }

</script>