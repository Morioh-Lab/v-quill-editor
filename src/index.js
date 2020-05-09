
import './css/core.css';
import './css/bubble.css';
import './css/snow.css';
import Editor from './editor.vue';


var __EditorPlugin = {
    install: function (Vue) {
        if (Vue.__quill_installed) {
            return;
        }

        Vue.__quill_installed = true;

        Vue.component('editor', Editor);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    Vue.use(__EditorPlugin);
}

export default __EditorPlugin;