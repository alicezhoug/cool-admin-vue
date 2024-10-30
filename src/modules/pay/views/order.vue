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

<script lang="ts" name="pay-order" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

import { useDict } from "/$/dict";
const { dict } = useDict();

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "付款用户",
			prop: "userId",
			hook: "number",
			span:12,
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "收款商户",
			prop: "merchantId",
			span:12,
			required: true,
			component: { name: "el-select", options: [], props: {clearable: true } },
			value: [],
		},
		{
			label: "支付方式",
			prop: "modeId",
			span:12,
			component: { name: "el-select", options: [], props: {clearable: true } },
			required: true
		},
		{
			label: "支付金额",
			prop: "orderFee",
			span:12,
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "金币数量",
			prop: "coin",
			hook: "number",
			span:12,
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "支付状态",
			prop: "status",
			span:12,
			component: { name: "el-select" ,options: dict.get('payStatus'),props: { clearable: true }},
			required: true
		}

	],
	async onOpen() {
		// 设置权限列表
		service.pay.merchant.list().then((res) => {
			Upsert.value?.setOptions(
				"merchantId",
				res.map((e) => {
					return {
						label: e.name || "",
						value: e.id
					};
				})
			);
		});

		service.pay.mode.list().then((res) => {
			Upsert.value?.setOptions(
				"modeId",
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
		{ label: "商户", prop: "merchantId", minWidth: 140 },
		{ label: "支付方式", prop: "modeId", minWidth: 140 },
		{ label: "金币数量", prop: "coin", minWidth: 140 },
		{ label: "订单号码", prop: "orderNo", minWidth: 140 },
		{ label: "支付金额", prop: "orderFee", minWidth: 140 },
		{
			label: "支付状态",
			prop: "status",
			minWidth: 120,
			dict: dict.get('payStatus'),
		},
		{ label: "付款用户", prop: "userId", minWidth: 140 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.order
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
