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

<script lang="ts" name="pay-merchant" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "商户名称",
			prop: "name",
			component: { name: "el-input", props: { clearable: true } },
			required: true,
			span:12
		},
		{
			label: "关联用户ID",
			prop: "refUserId",
			hook: "number",
			component: { name: "el-input-number" },
			required: true,
			span:12
		},
		{ label: "是否停用", prop: "stop", flex: false, component: { name: "cl-switch" } },
		{ label: "是否官方", prop: "official", flex: false, value:true, component: { name: "cl-switch" } },
		{
			prop: "modeIdList",
			label: "支付方式",
			value: [],
			required: true,
			component: {
				name: "el-select",
				options: [],
				props: {
					multiple: true
				}
			}
		},

	],
	async onOpen() {
		// 设置权限列表
		service.pay.mode.list().then((res) => {
			Upsert.value?.setOptions(
				"modeIdList",
				res.map((e) => {
					return {
						label: e.name || "",
						value: e.id
					};
				})
			);
		});

	},
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "商户名称", prop: "name", minWidth: 140 },
		{ label: "支付方式", prop: "modeName", minWidth: 140 },
		{ label: "是否停用", prop: "stop", minWidth: 100, component: { name: "cl-switch" } },
		{ label: "是否官方", prop: "official", minWidth: 100, component: { name: "cl-switch" } },
		{ label: "关联用户ID", prop: "refUserId", minWidth: 140 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.merchant
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
