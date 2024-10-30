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

<script lang="ts" name="imchat-notice" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { reactive } from "vue";
import { useDict } from "/$/dict";
const { dict } = useDict();
const { service } = useCool();




// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "接收用户ID",
			prop: "toUserId",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "消息类型",
			prop: "noticeType",
			component: { name: "el-checkbox-group", options: dict.get('noticeType'), props: {} },
			value: "0=普通通知"
		},
		{
			label: "引用对象ID",
			prop: "refId",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{
			label: "通知内容",
			prop: "content",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		},
		{ label: "是否已读", prop: "read", flex: false, component: { name: "cl-switch" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "接收用户ID", prop: "toUserId", minWidth: 140 },
		{
			label: "消息类型",
			prop: "noticeType",
			dict:  dict.get('noticeType'),
			dictColor: true,
			minWidth: 120
		},
		{ label: "引用对象ID", prop: "refId", minWidth: 140 },
		{ label: "通知内容", prop: "content", showOverflowTooltip: true, minWidth: 200 },
		{ label: "是否已读", prop: "read", minWidth: 100, component: { name: "cl-switch" } },

	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.imchat.notice
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
