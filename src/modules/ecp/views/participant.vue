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

<script lang="ts" name="ecp-participant" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: "活动", prop: "ecpId", hook: "number", component: { name: "el-input-number" } },
		{
			label: "参与用户",
			prop: "userId",
			hook: "number",
			component: { name: "el-input-number" }
		},
		{ label: "是否中奖用户", prop: "luckyUser", flex: false, component: { name: "cl-switch" } },
		{
			label: "收款码",
			prop: "luckyPayQrCode",
			component: { name: "el-input", props: { clearable: true } }
		},
		{
			label: "付款金额",
			prop: "amount",
			component: { name: "el-input", props: { clearable: true } }
		},
		{ label: "付款凭证截图", prop: "payVoucherUrl", component: { name: "cl-upload" } },
		{
			label: "支付宝付款口令红包号",
			prop: "passRedPacketNo",
			component: { name: "el-input", props: { clearable: true } }
		},
		{
			label: "发起者审核到帐",
			prop: "auditArrive",
			flex: false,
			component: { name: "cl-switch" }
		},
		{
			label: "猜测幸运号",
			prop: "guessLuckyNum",
			hook: "number",
			component: { name: "el-input-number" }
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "活动", prop: "ecpId", minWidth: 140 },
		{ label: "参与用户", prop: "userId", minWidth: 140 },
		{
			label: "是否中奖用户",
			prop: "luckyUser",
			minWidth: 100,
			component: { name: "cl-switch" }
		},
		{ label: "收款码", prop: "luckyPayQrCode", minWidth: 140 },
		{ label: "付款金额", prop: "amount", minWidth: 140 },
		{
			label: "付款凭证截图",
			prop: "payVoucherUrl",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ label: "支付宝付款口令红包号", prop: "passRedPacketNo", minWidth: 140 },
		{
			label: "发起者审核到帐",
			prop: "auditArrive",
			minWidth: 100,
			component: { name: "cl-switch" }
		},
		{ label: "猜测幸运号", prop: "guessLuckyNum", minWidth: 140 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.ecp.participant
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
