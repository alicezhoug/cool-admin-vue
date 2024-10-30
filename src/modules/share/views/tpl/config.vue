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

<script lang="ts" name="share-tpl-config" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: "预设头像", prop: "avatar", required: true,span:12, component: { name: "cl-upload" } },
		{ label: "背景图",  required: true,prop: "imgUrl",span:12, component: { name: "cl-upload" } },
		{
			label: "提示信息",
			prop: "alertInfo",
			required: true,
			span:12,
			component: { name: "el-input", props: { clearable: true } }
		},

		{
			label: "URL地址",
			prop: "linkUrl",
			required: true,
			span:12,
			component: { name: "el-input", props: { clearable: true } }
		},
		{
			label: "标语",
			required: true,
			prop: "slogan",

			component: { name: "el-input", props: { type: "textarea", rows: 2  } }
		},
		{ label: "是否停用", prop: "stop", flex: false, component: { name: "cl-switch" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: "预设头像",
			prop: "avatar",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ label: "提示信息", prop: "alertInfo", minWidth: 140 },
		{
			label: "背景图",
			prop: "imgUrl",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ label: "URL地址", prop: "linkUrl", minWidth: 160 },
		{ label: "标语", prop: "slogan", minWidth: 140 },
		{ label: "是否停用", prop: "stop", minWidth: 100, component: { name: "cl-switch" } },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.share.tpl.config
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
