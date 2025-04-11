import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([{ files: ['**/*.{js,mjs,cjs,ts,vue}'] }, { files: ['**/*.{js,mjs,cjs,ts,vue}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } }, { files: ['**/*.{js,mjs,cjs,ts,vue}'], plugins: { js }, extends: ['js/recommended'] }, tseslint.configs.recommended, pluginVue.configs['flat/essential'], { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } }])
