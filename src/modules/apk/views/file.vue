<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />

			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索关键字" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="apk-file" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { reactive } from "vue";



const { service } = useCool();


const options=reactive({
	platformList:[
		{
			label:"Android",
			value:'android',
			type: "success"
		},
		{
			label:"Ios",
			value:'ios',
			type:"danger"
		}
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
	{
			label: "APK文件",
			prop: "url",

			component: { name: "cl-upload",props:{text:"选择APK文件",type:"file",draggable:true}},
			required: true
		},
		{
			label: "appId",
			prop: "appId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true
		},

		{
			prop: "platform",
			label: "平台",
			required: true,
			span: 12,
			component: {
				name: "el-select",
				options: options.platformList,
				props: { clearable: true }
			}
		},
		{
			label: "版本号",
			prop: "versionCode",
			hook: "number",
			component: { name: "el-input" },
			span: 12,
			required: true
		},

		{
			label: "版本名称",
			prop: "version",
			component: { name: "el-input" },
			span: 12,
			required: true
		},

		{
			label: "强制下载",
			prop: "forceDownload",
			flex: false,
			span: 12,
			component: { name: "cl-switch" },
			required: true
		},
		{
			label: "是否上线",
			prop: "online",
			span: 12,
			flex: false,
			component: { name: "cl-switch" },
			required: true
		},
		{
			label: "功能说明",
			prop: "remark",
			component: { name: "el-input", props: { type: "textarea", rows: 5 } },
			required: true
		},
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "appId", prop: "appId", minWidth: 140 },
		{ label: "版本号", prop: "versionCode", minWidth: 140 },
		{ label: "版本名称", prop: "version", minWidth: 140 },
		{ label: "平台", prop: "platform", minWidth: 140 },
		{ label: "下载路径", prop: "url", minWidth: 340 },
		{
			label: "强制下载",
			prop: "forceDownload",
			minWidth: 100,
			component: { name: "cl-switch" }
		},
		{ label: "是否上线", prop: "online", minWidth: 100, component: { name: "cl-switch" } },
		{ label: "功能说明", prop: "remark", minWidth: 300 },

		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.apk.file
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
