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

<script lang="ts" name="pay-tran" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

import { useDict } from "/$/dict";
const { dict } = useDict();

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "交易用户",
			prop: "userId",
			hook: "number",
			span:12,
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "标题",
			prop: "title",
			span:12,
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "交易类型",
			prop: "tranType",
			span:12,
			component: { name: "el-select", options: dict.get('tranType'), props: {clearable: true } },
			required: true
		},

		{
			label: "交易金额",
			prop: "amount",
			span:12,
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "关联ID",
			prop: "objectId",
			hook: "number",
			component: { name: "el-input-number", props: { clearable: true }}
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "交易用户", prop: "userId", minWidth: 140 },
		{ label: "标题", prop: "title", minWidth: 140 },
		{ label: "交易类型", prop: "tranType", minWidth: 140 },
		{ label: "交易金额", prop: "amount", minWidth: 140 },
		{ label: "关联ID", prop: "objectId", minWidth: 140 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.tran
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
