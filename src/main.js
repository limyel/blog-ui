import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
import 'bulma/css/bulma.min.css'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(createLineNumbertPlugin());
VMdPreview.use(createCopyCodePlugin());

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VMdPreview);
app.use(VMdEditor);
app.mount("#app");
