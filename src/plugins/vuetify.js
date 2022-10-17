import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'
// Translation provided by Vuetify (typescript)
import pl from 'vuetify/src/locale/pl.ts'
import colors from 'vuetify/lib/util/colors'
  
export default new Vuetify({
    theme: {
      themes: {
        //  这里除了dark的primary都是瞎写的
        dark: {
          primary: '#1A237E',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
        light: {
          primary: '#232f3d',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
    lang: {
      locales: { zhHans, pl, en },
      current: 'zhHans',
    },
  })
