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
			<cl-table ref="Table" >
				<template #slot-sellbtn="{ scope }">
					<el-button size="small"  type="danger" @click="openTran(scope.row)">交易明细</el-button>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑-->
		<cl-upsert ref="Upsert" />

	</cl-crud>
	<!-- 交易明细参数配置-->
	<tran :ref="setRefs('tran')" />

</template>

<script lang="ts" name="pay-wallet" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

import tran from "../components/tran.vue";


const { service ,refs, setRefs} = useCool();



// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "用户",
			prop: "userId",
			hook: "number",
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "可用本金",
			prop: "balance",
			hook: "number",
			span:12,
			component: { name: "el-input-number" }
		},
		{
			label: "总消费",
			prop: "consume",
			hook: "number",
			span:12,
			component: { name: "el-input-number" }
		},
		{
			label: "冻结金额",
			prop: "freeze",
			hook: "number",
			span:12,
			component: { name: "el-input-number" }
		},
		{ label: "赠送金额", prop: "gift",span:12, hook: "number", component: { name: "el-input-number" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "用户", prop: "userId", minWidth: 140 },
		{ label: "可用本金", prop: "balance", minWidth: 140 },
		{ label: "总消费", prop: "consume", minWidth: 140 },
		{ label: "冻结金额", prop: "freeze", minWidth: 140 },
		{ label: "赠送金额", prop: "gift", minWidth: 140 },
		{ type: "op",width:260,buttons: ["slot-sellbtn","edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.wallet
	},
	(app) => {
		app.refresh();
	}
);

// 交易明细
function openTran(item:any) {

	refs.tran.open(item);
}

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
