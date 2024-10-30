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
					<!--【很重要】搜索组件 -->
					<cl-search ref="Search" :reset-btn="true" />
			<!-- 关键字搜索
			<cl-search-key placeholder="搜索关键字" />
			-->
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

<script lang="ts" name="pay-coin" setup>
import { useCrud, useTable, useUpsert,useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";

import { useDict } from "/$/dict";

import { computed, reactive,onMounted } from "vue";


const { dict } = useDict();

const { service } = useCool();


// 初始化数据
const options = reactive({
	modeList: [] as any[],

	async init() {
		service.pay.mode.list().then((res) => {
			res.map((e) => {
				this.modeList.push({
						label: e.name || "",
						value: e.id
					});

			})
		});
	}
});

// cl-upsert
const Upsert = useUpsert({



	items: [
		{
			label: "支付方式",
			prop: "modeId",
			component: { name: "el-select", options: options.modeList, props: {} },

			required: true
		},
		{
			label: "金币数量",
			prop: "quantity",
			hook: "number",
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "金额",
			prop: "fee",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "货币符号",
			prop: "symbol",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{ label: "是否停用", prop: "stop", flex: false, component: { name: "cl-switch" } }
	],


});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "支付方式", prop: "modeName", minWidth: 120 },
		{ label: "金币数量", prop: "quantity", minWidth: 140 },
		{ label: "货币符号", prop: "symbol", minWidth: 50 },
		{ label: "金额", prop: "fee", minWidth: 140 },

		{ label: "是否停用", prop: "stop", minWidth: 100, component: { name: "cl-switch" } },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.pay.coin
	},
	(app) => {
		app.refresh();
	}
);
// cl-search 配置
//【很重要】该组件基于 cl-form 故很多示例都可复用
const Search = useSearch({
	// 配置如 cl-form 一样
	items: [
		{
			label: "支付方式",
			prop: "modeId",
			value: [],
			component: { name: "el-select", options:  options.modeList, props: {clearable: true} },
		}
	],
});
// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
onMounted(() => {
	options.init();
});
</script>
